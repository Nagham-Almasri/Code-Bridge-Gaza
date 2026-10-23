import {
  FiBriefcase,
  FiBookOpen,
} from "react-icons/fi";

export default function ExperienceEducation() {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2">
      
      {/* Experience */}
      <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">

          <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <FiBriefcase className="text-2xl" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950">
              Experience
            </h3>

            <p className="mt-1 text-md lg:text-sm font-medium text-slate-500">
              5+ Years
            </p>
          </div>
        </div>

        <p className="mt-6 text-[16px] font-medium leading-7 text-slate-500">
          Building modern web applications with expertise in full-stack
          development.
        </p>
      </div>

      {/* Education */}
      <div className="rounded-[28px] border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-start gap-4">

          <div className="flex size-13 shrink-0 items-center justify-center rounded-2xl bg-violet-50 text-violet-600">
            <FiBookOpen className="text-2xl" />
          </div>

          <div>
            <h3 className="text-xl font-bold text-slate-950">
              Education
            </h3>

            <p className="mt-1 text-md lg:text-sm font-medium text-slate-500">
              BSc Computer Science
            </p>
          </div>
        </div>

        <p className="mt-6 text-[16px] font-medium leading-7 text-slate-500">
          Islamic University of Gaza, graduated with honors in 2019.
        </p>
      </div>

    </section>
  );
}