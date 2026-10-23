import {
  FiMapPin,
  FiBriefcase,
  FiDollarSign,
} from "react-icons/fi";

export default function JobCard({
  logoLetter,
  title,
  company,
  location,
  type,
  salary,
  skills = [],
  postedAt,
  onViewDetails,
}) {
  return (
    <article className="rounded-[22px] border border-slate-200 bg-white p-3 md:p-6 shadow-sm transition-all duration-200 hover:border-violet-200 hover:shadow-md">

      {/* Top Content */}
      <div className="flex items-start justify-between  md:gap-5">

        <div className="flex min-w-0 gap-2 md:gap-5">

          {/* Company Logo */}
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600 text-[17px] font-bold text-white">
            {logoLetter}
          </div>

          <div className="min-w-0">

            {/* Job Title */}
            <h3 className="text-lg font-bold md:font-extrabold text-slate-950">
              {title}
            </h3>

            {/* Company */}
            <p className="mt-1 text-[14px]  text-slate-500">
              {company}
            </p>

            {/* Job Info */}
            <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[15px] font-medium text-slate-500">

              <div className="flex items-center gap-2">
                <FiMapPin className="text-[12px]" />
                <span className="text-[12px]">{location}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiBriefcase className="text-[12px]" />
                <span className="text-[12px]">{type}</span>
              </div>

              <div className="flex items-center gap-2">
                <FiDollarSign className="text-[12px]" />
                <span className="text-[12px]">{salary}</span>
              </div>

            </div>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-violet-200 bg-violet-50 px-3 py-1 text-[10px] font-semibold text-violet-600"
                >
                  {skill}
                </span>
              ))}
            </div>

          </div>
        </div>

        {/* Posted Time */}
        <span className="shrink-0 text-[12px] font-medium text-slate-400">
          {postedAt}
        </span>
      </div>

      {/* Divider */}
      <div className="my-5 h-px bg-slate-100" />

      {/* Actions */}
      <div className="flex flex-wrap gap-3">

        <button
          type="button"
          onClick={onViewDetails}
          className="h-9 rounded-xl border border-violet-600 bg-white px-4 text-[12px] font-bold text-violet-600 transition hover:bg-violet-50"
        >
          View Details
        </button>

        <button
          type="button"
          className="h-9 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 text-[12px] font-bold text-white shadow-sm transition hover:shadow-md"
        >
          Apply Now
        </button>

      </div>

    </article>
  );
}