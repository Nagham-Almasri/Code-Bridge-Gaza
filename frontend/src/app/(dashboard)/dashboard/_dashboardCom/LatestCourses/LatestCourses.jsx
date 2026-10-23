import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

const latestCourses = [
  {
    id: 1,
    title: "Next.js 14 Masterclass",
    category: "Frontend",
  },
  {
    id: 2,
    title: "Python for Data Science",
    category: "Data Science",
  },
  {
    id: 3,
    title: "Figma Advanced UI/UX",
    category: "Design",
  },
];

export default function LatestCourses() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-5 py-5">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-slate-950">
          Latest Courses
        </h2>

        <Link
          href="/dashboard/courses"
          className="text-[12px] font-bold text-blue-600 transition hover:text-violet-600"
        >
          View All
        </Link>
      </div>

      {/* Courses */}
      <div>
        {latestCourses.map((course, index) => (
          <div
            key={course.id}
            className={`flex items-center gap-3 py-4 ${
              index !== latestCourses.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
              <FiBookOpen className="text-[15px]" />
            </div>

            {/* Course Info */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[13px] font-bold text-slate-950  hover:text-blue-600 transition-all cursor-pointer ">
                {course.title}
              </h3>

              <p className="mt-1 truncate text-[10px] font-medium text-slate-500">
                {course.category}
              </p>
            </div>

            {/* View */}
            <Link
              href={`/dashboard/courses/${course.id}`}
              className="shrink-0 rounded-xl bg-violet-50 px-3 py-1.5 text-[12px] font-bold text-violet-600 transition hover:bg-violet-100"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}