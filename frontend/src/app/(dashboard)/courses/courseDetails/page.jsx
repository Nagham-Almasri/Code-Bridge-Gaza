import CourseCurriculum from "./CourseDetailsCom/CourseCurriculum/CourseCurriculum";
import CourseDetailsHero from "./CourseDetailsCom/CourseDetailsHero/CourseDetailsHero";
export default function CourseDetailsPage() {
  return (
    <div className="p-6">
      <CourseDetailsHero />
      <CourseCurriculum/>
    </div>
  );
}