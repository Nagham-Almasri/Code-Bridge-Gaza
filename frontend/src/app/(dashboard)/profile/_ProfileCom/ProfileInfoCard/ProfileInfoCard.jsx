import {
  FiUser,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";

export default function ProfileInfoCard() {
  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm">

      {/* Avatar */}
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="flex size-40 items-center justify-center rounded-full border-[6px] border-violet-200 bg-gradient-to-br from-blue-500 to-violet-600 shadow-xl shadow-violet-200/70">
            <FiUser className="text-3xl text-white" />
          </div>

          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
            Active
          </span>
        </div>

        {/* Name */}
        <h2 className="mt-9 text-center text-2xl font-bold text-slate-950">
          Ahmed Hassan
        </h2>

        <p className="mt-2 text-center text-md font-semibold text-slate-500">
          Senior Full Stack Developer
        </p>
      </div>

      <div className="my-8 h-px bg-slate-200" />

      {/* Contact Information */}
      <div className="space-y-4">

        <div className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiPhone className="text-lg" />
          </div>

          <div className="">
            <p className="text-sm font-semibold text-slate-500">
              Phone
            </p>

            <p className="mt-1 text-md text-slate-900">
              +970 123 456 789
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            <FiMail className="text-lg" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-500">
              Email
            </p>

            <p className="mt-1 text-md text-slate-900 break-all">
              ahmed.hassan@example.com
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <FiMapPin className="text-lg" />
          </div>

          <div>
            <p className="text-sm font-semibold text-slate-500">
              Location
            </p>

            <p className="mt-1 text-md text-slate-900">
              Gaza City, Palestine
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-[20px] border border-violet-100 bg-[#F7F7FF] p-3 text-center">
          <p className="text-3xl font-bold text-violet-600">
            12
          </p>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Jobs Applied
          </p>
        </div>

        <div className="rounded-[20px] border border-violet-100 bg-[#F7F7FF] p-3 text-center">
          <p className="text-3xl font-bold text-violet-600">
            8
          </p>

          <p className="mt-1 text-sm font-medium text-slate-500">
            Courses Done
          </p>
        </div>
      </div>

      {/* CV Status */}
      <div className="mt-7 rounded-[20px] border border-violet-200 bg-[#FAFAFF] px-5 py-5">

        <div className="flex items-center justify-between">
          <p className="font-semibold text-slate-900">
            CV Status
          </p>

          <span className="rounded-full bg-gradient-to-r from-blue-500 to-violet-600 px-2 py-1.5 text-xs font-bold text-white">
            Completed
          </span>
        </div>

        <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-200">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-blue-500 to-violet-600" />
        </div>

      </div>
    </section>
  );
}
