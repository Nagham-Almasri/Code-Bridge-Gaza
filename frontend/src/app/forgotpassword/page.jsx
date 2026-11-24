"use client";

import Link from "next/link";
import { FiArrowLeft, FiMail, FiKey } from "react-icons/fi";

export default function ForgotPasswordPage() {


  
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] px-5 py-12">

      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">

        {/* Forgot Password Card */}
        <div className="w-full rounded-[28px] bg-white px-8 py-10 shadow-xl shadow-blue-100/60 sm:px-10">

          {/* Icon */}
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-200">
            <FiKey className="text-[27px]" />
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950">
            Forgot Your Password?
          </h1>

          {/* Description */}
          <p className="mt-3 text-sm font-medium leading-6 text-slate-500">
            Enter your registered email address and we'll send you a link to
            reset your password.
          </p>

          {/* Form */}
          <form   onSubmit={(e) => {
    e.preventDefault();
    window.location.href = "/forgotpassword/check-email";
  }}
  className="mt-8 space-y-5">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-bold text-slate-900">
                Email Address
              </label>

              <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">

                <FiMail className="shrink-0 text-xl text-slate-400" />

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />

              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/60 transition hover:scale-[1.01] hover:shadow-xl"
            >
              Send Reset Link
            </button>

          </form>

          {/* Back To Login */}
          <div className="mt-7 flex justify-center">
            <Link
              href="/login"
              className="group flex items-center gap-2 text-sm font-bold text-violet-600 transition hover:text-violet-700"
            >
              <FiArrowLeft className="text-base transition-transform group-hover:-translate-x-1" />
              Back to Login
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}