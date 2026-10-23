import { FiSave } from "react-icons/fi";

export default function ProfileSettings() {
  return (
    <div className="px-8 py-10">

      {/* Profile Header */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-200 pb-10">

        <div className="flex items-center gap-3 sm:gap-7">

          {/* Avatar */}
          <div className="flex size-18 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[23px] font-bold text-white shadow-lg shadow-violet-200">
            AH
          </div>

          {/* User Info */}
          <div>
            <h2 className="text-lg font-extrabold text-slate-950">
              Ahmed Hassan
            </h2>

            <p className="mt-1 text-[13px] font-medium text-slate-500">
              ahmed@example.com
            </p>
          </div>

        </div>

        {/* Change Photo */}
        <button
          type="button"
          className="h-12 rounded-lg bg-gradient-to-r from-blue-500 to-violet-600 px-6 text-[14px] font-bold text-white shadow-md transition hover:shadow-lg"
        >
          Change Photo
        </button>

      </div>

      {/* Form */}
      <div className="mt-10 grid grid-cols-1 gap-7 md:grid-cols-2">

        {/* Full Name */}
        <div>
          <label className="mb-2 block text-[15px] font-semibold text-slate-950">
            Full Name
          </label>

          <input
            type="text"
            defaultValue="Ahmed Hassan"
            className="h-12 w-full rounded-xl border-2 border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-[15px] font-semibold text-slate-950">
            Email
          </label>

          <input
            type="email"
            defaultValue="ahmed@example.com"
            className="h-12 w-full rounded-xl border-2 border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-[15px] font-semibold text-slate-950">
            Phone
          </label>

          <input
            type="text"
            defaultValue="+970 123 456 789"
            className="h-12 w-full rounded-xl border-2 border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="mb-2 block text-[15px] font-semibold text-slate-950">
            Location
          </label>

          <input
            type="text"
            defaultValue="Gaza City, Palestine"
            className="h-12 w-full rounded-xl border-2 border-slate-200 px-5 text-[14px] text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

        {/* Bio */}
        <div className="md:col-span-2">
          <label className="mb-2 block text-[15px] font-semibold text-slate-950">
            Bio
          </label>

          <textarea
            defaultValue="Passionate frontend developer with 3+ years of experience"
            rows={3}
            className="w-full resize-none rounded-xl border-2 border-slate-200 px-5 py-4 text-[15px] leading-5 text-slate-900 outline-none transition focus:border-violet-400"
          />
        </div>

      </div>

      {/* Save */}
      <div className="mt-10 border-t border-slate-200 pt-10">
        <button
          type="button"
          className="flex h-14 items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-[16px] font-bold text-white shadow-md transition hover:shadow-lg"
        >
          <FiSave className="text-[21px]" />
          Save Changes
        </button>
      </div>

    </div>
  );
}