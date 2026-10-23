import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

const applications = [
  {
    id: 1,
    title: "Frontend Developer",
    company: "Google",
    status: "Pending",
  },
  {
    id: 2,
    title: "UI/UX Designer",
    company: "Microsoft",
    status: "Accepted",
  },
  {
    id: 3,
    title: "Backend Developer",
    company: "Amazon",
    status: "Rejected",
  },
];

const statusStyles = {
  Pending: "border-amber-300 bg-amber-50 text-amber-600",
  Accepted: "border-emerald-300 bg-emerald-50 text-emerald-600",
  Rejected: "border-red-300 bg-red-50 text-red-600",
};

export default function RecentApplications() {
  return (
    <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white">
      
      {/* Header */}
      <div className="sm:flex items-center justify-between border-b border-slate-100 px-7 py-7">
        <h2 className="font-extrabold text-slate-950">
          Recent Applications
        </h2>

        <Link
          href="/dashboard/jobs"
          className="mt-3 sm:mt-0 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-violet-600"
        >
          View All
          <FiArrowRight className="text-lg" />
        </Link>
      </div>

      {/* Applications */}
      <div className="px-8 py-6">
        {applications.map((application, index) => (
          <div
            key={application.id}
            className={`flex items-center gap-5 py-5 ${
              index !== applications.length - 1
                ? "border-b border-slate-100"
                : ""
            }`}
          >
            
            {/* Application Info */}
            <div className="min-w-0 flex-1">
              <h3 className="text-[15px] font-bold text-slate-950">
                {application.title}
              </h3>

              <p className="mt-1 text-[12px] font-medium text-slate-500">
                {application.company}
              </p>
            </div>

            {/* Status */}
            <span
              className={`shrink-0 rounded-full border px-3 py-1.5 text-[11px] font-semibold ${
                statusStyles[application.status]
              }`}
            >
              {application.status}
            </span>

            {/* View */}
            <Link
              href={`/dashboard/jobs/${application.id}`}
              className="shrink-0 text-[13px] font-semibold text-blue-600 transition hover:text-violet-600"
            >
              View
            </Link>

          </div>
        ))}
      </div>
    </section>
  );
}