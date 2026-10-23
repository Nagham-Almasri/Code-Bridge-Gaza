import Image from "next/image";
import Link from "next/link";

import {
  FiArrowLeft,
  FiUser,
  FiClock,
  FiBookOpen,
  FiChevronRight,
  FiPlay,
} from "react-icons/fi";

export default function CourseDetailsHero() {
  return (
    <section>

      {/* Back */}
      <Link
        href="/courses"
        className="mb-8 inline-flex items-center gap-3 text-[14px] font-medium text-slate-500 transition hover:text-violet-600"
      >
        <FiArrowLeft className="text-[17px]" />
        Back to Courses
      </Link>

      {/* Course Card */}
      <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

        {/* Course Image */}
        <div className="relative h-[410px] w-full overflow-hidden">

          <Image
            src="/images/courses1.png"
            alt="Advanced React Patterns"
            fill
            priority
            className="object-cover"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

          {/* Course Title */}
          <div className="absolute bottom-8 left-8">

            <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-[12px] font-bold text-violet-600">
              Advanced
            </span>

            <h1 className="mt-4 text-[36px] font-extrabold text-white">
              Advanced React Patterns
            </h1>

          </div>
        </div>

        {/* Details */}
        <div className="px-8 py-8">

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-[14px] font-medium text-slate-500">

            <div className="flex items-center gap-2">
              <FiUser className="text-[18px] text-blue-600" />
              <span>David Chen</span>
            </div>

            <div className="flex items-center gap-2">
              <FiClock className="text-[18px] text-violet-600" />
              <span>12 hours</span>
            </div>

            <div className="flex items-center gap-2">
              <FiBookOpen className="text-[18px] text-blue-600" />
              <span>7 lessons</span>
            </div>

            <div className="flex items-center gap-2 text-violet-600">
              <FiChevronRight className="text-[18px]" />
              <span>Frontend Development</span>
            </div>

          </div>

          {/* Description */}
          <p className="mt-7 text-[15px] font-medium leading-7 text-slate-500">
            Explore advanced React patterns like render props, compound
            components, and custom hooks.
          </p>

          {/* Start Learning */}
          <button
            type="button"
            className="mt-7 inline-flex h-12 items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-7 text-[14px] font-bold text-white shadow-md transition hover:shadow-lg"
          >
            <FiPlay className="text-[17px]" />
            Start Learning
          </button>

        </div>

      </div>
    </section>
  );
}