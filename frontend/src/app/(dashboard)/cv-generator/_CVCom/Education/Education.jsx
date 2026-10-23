import { FiBookOpen, FiPlus } from "react-icons/fi";

export default function Education() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <FiBookOpen className="text-[22px] text-blue-600" />

          <h2 className="text-[20px] font-extrabold text-slate-950">
            Education
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-[14px] font-semibold text-violet-600 transition hover:text-violet-700"
        >
          <FiPlus className="text-[16px]" />
          Add Education
        </button>

      </div>

      {/* Education Card */}
      <div className="rounded-[18px] border border-slate-200 p-5">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Degree */}
          <input
            type="text"
            defaultValue="Bachelor of Computer Science"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* University */}
          <input
            type="text"
            defaultValue="Islamic University of Gaza"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* Years */}
          <input
            type="text"
            defaultValue="2017 - 2021"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* GPA */}
          <input
            type="text"
            defaultValue="3.8/4.0"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

        </div>
      </div>

    </section>
  );
}