import {
  FiLock,
  FiShield,
  FiArrowRight,
  FiSave,
} from "react-icons/fi";

export default function AccountSettings() {
  return (
    <div className="px-8 py-10">

      {/* Title */}
      <h2 className="text-[22px] font-extrabold text-slate-950">
        Security Settings
      </h2>

      {/* Security Options */}
      <div className="mt-8 space-y-6">

        {/* Change Password */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-[20px] bg-[#F7F9FC] px-4 py-3 md:px-6 md:py-5 text-left transition hover:bg-[#F2F5FB]"
        >
          <div className="flex items-center gap-5">

            <div className="flex size-10 md:size-13 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiLock className="text-sm md:text-[20px]" />
            </div>

            <div>
              <h3 className="text-sm md:text-md font-bold text-slate-950">
                Change Password
              </h3>

              <p className="mt-1 text-sm font-medium text-slate-500">
                Update your password
              </p>
            </div>

          </div>

          <FiArrowRight className="text-[21px] text-blue-600" />
        </button>

        {/* Two Factor Authentication */}
        <button
          type="button"
          className="flex w-full items-center justify-between rounded-[20px] bg-[#F7F9FC] px-6 py-5 text-left transition hover:bg-[#F2F5FB]"
        >
          <div className="flex items-center gap-5">

            <div className="flex size-10 md:size-13 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <FiShield className="text-sm md:text-[20px]" />
            </div>

            <div>
              <h3 className="text-sm md:text-md font-bold text-slate-950">
                Two-Factor Authentication
              </h3>

              <p className="mt-1 text-sm md:text-[14px] font-medium text-slate-500">
                Add extra security
              </p>
            </div>

          </div>

          <FiArrowRight className="text-[21px] text-blue-600" />
        </button>

      </div>

      {/* Divider */}
      <div className="my-8 h-px bg-slate-200" />

      {/* Logout */}
      <button
        type="button"
        className="h-14 w-full rounded-xl cursor-pointer bg-red-50 text-[16px] font-bold text-red-600 transition hover:bg-red-100"
      >
        Log Out
      </button>

      {/* Divider */}
      <div className="my-8 h-px bg-slate-200" />

      {/* Save */}
      <button
        type="button"
        className="flex h-14 items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-[16px] font-bold text-white shadow-md transition hover:shadow-lg"
      >
        <FiSave className="text-[21px]" />

        Save Changes
      </button>

    </div>
  );
}