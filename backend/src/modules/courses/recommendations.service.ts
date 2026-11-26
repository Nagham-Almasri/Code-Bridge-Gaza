import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Course, CourseDocument } from '../../DB/models/course.model.js';
import { Enrollment, EnrollmentDocument } from '../../DB/models/enrollment.model.js';
import { CourseLevel, CourseStatus, ExperienceLevel } from '../../common/enums/index.js';
import { RecommendCoursesDto } from './dto/recommend-courses.dto.js';

// The profile fields recommendations are built from.
export interface RecommendationProfile {
  _id: Types.ObjectId;
  skills?: string[];
  careerInterests?: string[];
  major?: string;
  experienceLevel?: ExperienceLevel;
}

const LEVELS_FOR_EXPERIENCE: Record<ExperienceLevel, CourseLevel[]> = {
  [ExperienceLevel.STUDENT]: [CourseLevel.BEGINNER],
  [ExperienceLevel.FRESHGRADUATE]: [CourseLevel.BEGINNER, CourseLevel.INTERMEDIATE],
  [ExperienceLevel.JUNIOR]: [CourseLevel.INTERMEDIATE],
  [ExperienceLevel.MIDLEVEL]: [CourseLevel.INTERMEDIATE, CourseLevel.ADVANCED],
};

// How much each kind of match adds to a course's score.
const WEIGHTS = { interest: 3, major: 2, skill: 1, level: 2 };
const MAX_CANDIDATES = 200;

const escapeRegex = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const normalize = (values: (string | undefined)[] = []) => [
  ...new Set(values.map((v) => v?.trim().toLowerCase()).filter((v): v is string => !!v)),
];

@Injectable()
export class RecommendationsService {
  constructor(
    @InjectModel(Course.name) private readonly _courseModel: Model<CourseDocument>,
    @InjectModel(Enrollment.name) private readonly _enrollmentModel: Model<EnrollmentDocument>,
  ) {}

  async recommend(user: RecommendationProfile, query: RecommendCoursesDto) {
    const limit = query.limit ?? 10;
    const interests = normalize(user.careerInterests);
    const skills = normalize(user.skills);
    const major = normalize([user.major]);
    const preferredLevels = user.experienceLevel
      ? (LEVELS_FOR_EXPERIENCE[user.experienceLevel] ?? [])
      : [];

    // Courses the user already enrolled in (including dropped ones) are not suggested again.
    const enrolledIds = await this._enrollmentModel.distinct('course', { user: user._id });
    const baseFilter = { status: CourseStatus.ACTIVE, _id: { $nin: enrolledIds } };

    const terms = [...new Set([...interests, ...skills, ...major])];
    const matchers = terms.map((t) => new RegExp(`^${escapeRegex(t)}$`, 'i'));

    const candidates = matchers.length
      ? await this._courseModel
          .find({
            ...baseFilter,
            $or: [{ technology: { $in: matchers } }, { category: { $in: matchers } }],
          })
          .sort({ createdAt: -1 })
          .limit(MAX_CANDIDATES)
          .select('-imagePublicId')
      : [];

    const scored = candidates
      .map((course) => {
        const technology = course.technology.toLowerCase();
        const category = course.category.toLowerCase();
        const reasons: string[] = [];
        let score = 0;

        const interest = interests.find((t) => t === technology || t === category);
        if (interest) {
          score += WEIGHTS.interest;
          reasons.push(`Matches your career interest: ${interest}`);
        }
        const majorMatch = major.find((t) => t === technology || t === category);
        if (majorMatch) {
          score += WEIGHTS.major;
          reasons.push(`Related to your major: ${majorMatch}`);
        }
        const skill = skills.find((t) => t === technology || t === category);
        if (skill) {
          score += WEIGHTS.skill;
          reasons.push(`Builds on your skill: ${skill}`);
        }
        if (preferredLevels.includes(course.level)) {
          score += WEIGHTS.level;
          reasons.push(`Fits your experience level (${course.level})`);
        }
        return { course, score, reasons };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, limit);

    // Not enough matches: fill up with the newest courses at the user's level.
    if (scored.length < limit) {
      const picked = scored.map((r) => r.course._id);
      const fillers = await this._courseModel
        .find({
          ...baseFilter,
          _id: { $nin: [...enrolledIds, ...picked] },
          ...(preferredLevels.length ? { level: { $in: preferredLevels } } : {}),
        })
        .sort({ createdAt: -1 })
        .limit(limit - scored.length)
        .select('-imagePublicId');
      for (const course of fillers) {
        scored.push({ course, score: 0, reasons: ['Newly added course'] });
      }
    }

    return {
      success: true,
      results: scored.map(({ course, score, reasons }) => ({
        course,
        score,
        reasons,
      })),
      profileComplete: terms.length > 0,
    };
  }
}
