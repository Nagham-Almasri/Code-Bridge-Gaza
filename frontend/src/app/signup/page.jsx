"use client";

import Link from "next/link";
import { FiCode, FiBriefcase, FiArrowRight, FiArrowLeft } from "react-icons/fi";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#eef3ff] via-white to-[#f3efff] px-6 py-12">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="text-center">


          {/* Logo */}
          <div className="mx-auto flex h-18 w-18 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-200">
            <span className="text-3xl font-bold">◎</span>
          </div>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.25em] text-violet-600">
            Join CodeBridge Gaza
          </p>

          <h1 className="mt-4 text-5xl font-extrabold tracking-tight text-slate-950">
            Create Your Account
          </h1>

          <p className="mt-5 text-xl font-medium text-slate-500">
            Choose how you want to use CodeBridge Gaza.
          </p>
        </div>

        {/* Account Types */}
        <div className="mt-16 grid gap-8 lg:grid-cols-2">

          {/* Developer */}
          <div className="group relative overflow-hidden rounded-[30px] border-2 border-slate-200 bg-white p-12 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-2xl">

            {/* Decorative circle */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-100/80" />

            {/* Icon */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
              <FiCode className="text-5xl" />
            </div>

            <div className="relative mt-12">

              <h2 className="text-4xl font-extrabold text-slate-950">
                I'm a Developer
              </h2>

              <p className="mt-6 max-w-xl text-lg font-medium leading-9 text-slate-500">
                Create your profile, explore job opportunities, apply for
                jobs, and discover learning courses.
              </p>

              <Link
                href="/signup/personal"
                className="mt-10 flex h-20 w-full items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-xl font-extrabold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <span>Continue as Developer</span>

                <FiArrowRight className="text-3xl transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Company */}
          <div className="group relative overflow-hidden rounded-[30px] border-2 border-slate-200 bg-white p-12 shadow-xl shadow-slate-200/40 transition-all duration-300 hover:-translate-y-1 hover:border-violet-200 hover:shadow-2xl">

            {/* Decorative circle */}
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-100/80" />

            {/* Icon */}
            <div className="relative flex h-24 w-24 items-center justify-center rounded-3xl bg-violet-50 text-violet-600">
              <FiBriefcase className="text-5xl" />
            </div>

            <div className="relative mt-12">

              <h2 className="text-4xl font-extrabold text-slate-950">
                I'm a Company
              </h2>

              <p className="mt-6 max-w-xl text-lg font-medium leading-9 text-slate-500">
                Register your company, publish job opportunities, and manage
                applications from developers.
              </p>

              <Link
                href="/signup/company"
                className="mt-10 flex h-20 w-full items-center justify-between rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 px-8 text-xl font-extrabold text-white shadow-lg shadow-violet-200 transition-all duration-300 hover:scale-[1.01] hover:shadow-xl"
              >
                <span>Continue as Company</span>

                <FiArrowRight className="text-3xl transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

        {/* Login */}
        <div className="mt-12 text-center text-lg font-medium text-slate-500">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-violet-600 transition hover:text-violet-700 hover:underline"
          >
            Log In
          </Link>
        </div>

      </div>
    </main>
  );
}