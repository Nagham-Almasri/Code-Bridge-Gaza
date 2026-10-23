import { FiBriefcase, FiPlus } from "react-icons/fi";

export default function WorkExperience() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Header */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">

        <div className="flex items-center gap-3">
          <FiBriefcase className="text-[22px] text-violet-600" />

          <h2 className="text-[20px] font-extrabold text-slate-950">
            Work Experience
          </h2>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-[14px] font-semibold text-violet-600 transition hover:text-violet-700"
        >
          <FiPlus className="text-[16px]" />
          Add Experience
        </button>

      </div>

      {/* Experience Card */}
      <div className="rounded-[18px] border border-slate-200 p-5">

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Job Title */}
          <input
            type="text"
            defaultValue="Frontend Developer"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* Company */}
          <input
            type="text"
            defaultValue="TechPalestine"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* Date */}
          <input
            type="text"
            defaultValue="2021 - Present"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* Location */}
          <input
            type="text"
            defaultValue="Gaza City"
            className="h-13 w-full rounded-xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />

          {/* Description */}
          <textarea
            defaultValue="Built responsive web applications using React and TypeScript. Collaborated with designers and backend developers to deliver high-quality products."
            rows={4}
            className="md:col-span-2 w-full resize-none rounded-xl border border-slate-200 px-5 py-4 text-[14px] leading-7 text-slate-900 outline-none transition focus:border-violet-400"
          />

        </div>
      </div>

    </section>
  );
}