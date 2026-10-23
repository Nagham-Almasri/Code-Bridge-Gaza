"use client";

import { useRouter } from "next/navigation";
import { FiChevronRight, FiEye, FiLock, FiMail, FiUser } from "react-icons/fi";

export default function PersonalInputs() {
  const router = useRouter();

  const handleNext = (e) => {
    e.preventDefault();
    router.push("/signup/career");
  };

  return (
    <form onSubmit={handleNext} className="space-y-5">
      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Full Name
        </label>

        <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
          <FiUser className="text-xl text-slate-400" />

          <input
            type="text"
            placeholder="Enter your full name"
            className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Email
        </label>

        <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
          <FiMail className="text-xl text-slate-400" />

          <input
            type="email"
            placeholder="Enter your email"
            className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Password
        </label>

        <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
          <FiLock className="text-xl text-slate-400" />

          <input
            type="password"
            placeholder="Create a password (min. 8 chars)"
            className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />

          <FiEye className="text-xl text-slate-400" />
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Confirm Password
        </label>

        <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
          <FiLock className="text-xl text-slate-400" />

          <input
            type="password"
            placeholder="Confirm your password"
            className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
          />

          <FiEye className="text-xl text-slate-400" />
        </div>
      </div>

      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70"
      >
        Next
        <FiChevronRight className="text-xl" />
      </button>
    </form>
  );
}