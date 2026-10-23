import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
const levelStyles = {
  Beginner: "border-emerald-200 bg-emerald-50 text-emerald-600",
  Intermediate: "border-blue-200 bg-blue-50 text-blue-600",
  Advanced: "border-violet-200 bg-violet-50 text-violet-600",
};

export default function CourseCard({
  image,
  title,
  level,
  category,
  description,
  showEnroll = false,
}) {
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md">

      {/* Course Image */}
      <div className="relative h-[225px] w-full overflow-hidden">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-5 py-5">

        {/* Title + Level */}
        <div className="flex items-start justify-between ">
          <h3 className="text-[13px] font-extrabold mt-1 text-slate-950">
            {title}
          </h3>

          <span
            className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-semibold ${
              levelStyles[level] || levelStyles.Intermediate
            }`}
          >
            {level}
          </span>
        </div>

        {/* Category */}
        <p className="mt-3 text-[14px] font-medium text-slate-500">
          {category}
        </p>

        {/* Description */}
        <p className="mt-2 flex-1 text-[12px] font-medium leading-5 text-slate-500">
          {description}
        </p>

        {/* Actions */}
        <div className="mt-3 space-y-3">

          <Link
            href="/courses/courseDetails"
            className={`flex h-11 w-full items-center justify-center gap-3 rounded-xl text-[13px] font-bold transition cursor-pointer ${
              showEnroll
                ? "bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:shadow-md"
                : "border border-violet-600 bg-white text-violet-600 hover:bg-violet-50"
            }`}
          >
            View Course
            <FiArrowRight className="text-[18px]" />
          </Link>

          {showEnroll && (
            <button
              type="button"
              className="h-11 w-full rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-[13px] font-bold text-white transition hover:shadow-md"
            >
              Enroll
            </button>
          )}

        </div>
      </div>

    </article>
  );
}