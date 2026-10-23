import CoursesHero from "./_CoursesCom/CoursesHero/CoursesHero";
import YourCourses from "./_CoursesCom/YourCourses/YourCourses";
import CoursesFilter from "./_CoursesCom/CoursesFilter/CoursesFilter";
import RecommendedCourses from "./_CoursesCom/RecommendedCourses/RecommendedCourses";

export default function CoursesPage() {
  return (
    <div className="p-6">
      <div className="space-y-10">

        <CoursesHero />

        <YourCourses />

        <CoursesFilter />

        <RecommendedCourses />

      </div>
    </div>
  );
}