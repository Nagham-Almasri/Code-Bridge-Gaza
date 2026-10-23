import { FiUser } from "react-icons/fi";

export default function PersonalInformation() {
  return (
    <section className="rounded-[24px] border border-slate-200 bg-white p-8 shadow-sm">

      {/* Section Title */}
      <div className="mb-8 flex items-center gap-3">
        <FiUser className="text-[22px] text-blue-600" />

        <h2 className="text-[20px] font-extrabold text-slate-950">
          Personal Information
        </h2>
      </div>

      {/* Fields */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Ahmed Hassan"
            className="h-13 w-full rounded-2xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Professional Title */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Professional Title
          </label>

          <input
            type="text"
            defaultValue="Frontend Developer"
            className="h-13 w-full rounded-2xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Email
          </label>

          <input
            type="email"
            defaultValue="ahmed@example.com"
            className="h-13 w-full rounded-2xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Phone
          </label>

          <input
            type="text"
            defaultValue="+970 123 456 789"
            className="h-13 w-full rounded-2xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Location
          </label>

          <input
            type="text"
            defaultValue="Gaza City, Palestine"
            className="h-13 w-full rounded-2xl border border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Professional Summary */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-[14px] font-semibold text-slate-900">
            Professional Summary
          </label>

          <textarea
            defaultValue="Passionate frontend developer with 3+ years of experience building modern web applications using React and TypeScript."
            rows={5}
            className="w-full resize-none rounded-2xl border border-slate-200 px-5 py-4 text-[14px] leading-7 text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

      </div>
    </section>
  );
}