import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const availableCourses = [
  {
    id: 1,
    title: "Advanced React Patterns",
    category: "Frontend",
    level: "Advanced",
    image: "/images/Availablecourse1.png",
  },
  {
    id: 2,
    title: "TypeScript Masterclass",
    category: "Programming",
    level: "Intermediate",
    image: "/images/Availablecourse2.png",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    category: "Design",
    level: "Beginner",
    image: "/images/Availablecourse3.png",
  },
];

export default function AvailableCourses() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">

      {/* Header */}
      <div className="sm:flex items-center justify-between border-b border-slate-100 px-7 py-7">
        <h2 className=" font-extrabold text-slate-950">
          Available Courses
        </h2>

        <Link
          href="/dashboard/courses"
          className="mt-3 sm:mt-0 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-violet-600"
        >
          View All Courses
          <FiArrowRight className="text-lg" />
        </Link>
      </div>

      {/* Courses */}
      <div className="px-8 py-7">
        <div className="space-y-7">
          {availableCourses.map((course) => (
            <div
              key={course.id}
              className="md:flex items-center gap-5  rounded-[22px] border border-transparent px-5 py-4 transition-all duration-200 hover:border-[#D4E1FF] hover:bg-[#F7FAFF]"
            >

            <div className="flex items-center gap-5">
                {/* Course Image */}
              <div className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-[18px]">
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Course Info */}
              <div className="min-w-0 flex-1">
                <h3 className="sm:text-[15px] text-[13px] font-extrabold text-slate-950 transition-colors duration-200 group-hover:text-blue-600">
                  {course.title}
                </h3>

                <div className="mt-1 flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-violet-50 px-3 py-1 text-[12px] font-semibold text-violet-600">
                    {course.category}
                  </span>

                  <span className="text-[12px] font-medium text-slate-500">
                    {course.level}
                  </span>
                </div>
              </div>

              {/* View Course */}
            </div>
              <Link
                href={`/dashboard/courses/${course.id}`}
                className="mt-3 md:mt-0 flex shrink-0 items-center gap-2 text-[12px] font-semibold text-blue-600 transition hover:text-violet-600  duration-200 group-hover:translate-x-1"
              >
                View Course
                <FiArrowRight className="text-lg" />
              </Link>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}