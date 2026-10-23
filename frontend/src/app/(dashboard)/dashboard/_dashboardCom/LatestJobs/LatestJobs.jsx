import Link from "next/link";
import { FiBriefcase } from "react-icons/fi";

const latestJobs = [
  {
    id: 1,
    title: "Senior React Developer",
    company: "TechPalestine",
  },
  {
    id: 2,
    title: "Product Designer",
    company: "DesignHub",
  },
  {
    id: 3,
    title: "Full Stack Engineer",
    company: "Innovation Labs",
  },
];

export default function LatestJobs() {
  return (
    <section className="rounded-[28px] border border-slate-200 bg-white px-5 py-5">
      
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-sm font-extrabold text-slate-950">
          Latest Jobs
        </h2>

        <Link
          href="/dashboard/jobs"
          className="text-[12px] font-bold text-blue-600 transition hover:text-violet-600"
        >
          View All
        </Link>
      </div>

      {/* Jobs */}
      <div>
        {latestJobs.map((job, index) => (
          <div
            key={job.id}
            className={`flex items-center gap-3 py-4 ${
              index !== latestJobs.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            {/* Icon */}
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ">
              <FiBriefcase className="text-[15px]" />
            </div>

            {/* Job Info */}
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-[13px] font-bold text-slate-950 hover:text-blue-600 transition-all cursor-pointer ">
                {job.title}
              </h3>

              <p className="mt-1 truncate text-[10px] font-medium text-slate-500">
                {job.company}
              </p>
            </div>

            {/* View */}
            <Link
              href={`/dashboard/jobs/${job.id}`}
              className="shrink-0 rounded-xl bg-blue-50 px-3 py-1.5 text-[12px] font-bold text-blue-600 transition hover:bg-blue-100"
            >
              View
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}