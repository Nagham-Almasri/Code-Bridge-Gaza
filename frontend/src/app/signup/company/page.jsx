<<<<<<< HEAD

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiArrowLeft,
  FiBriefcase,
  FiMail,
  FiFileText,
  FiPhone,
  FiMapPin,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";

export default function CompanySignupPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    // سيتم ربط التسجيل بالـBackend لاحقاً.
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f4f3ff] via-white to-[#eeebff] px-5 py-14">

      <div className="mx-auto max-w-[990px]">

        {/* Change Account Type */}
        <button
          type="button"
          onClick={() => router.push("/signup")}
          className="mb-7 flex items-center gap-3 text-lg font-bold text-violet-600 transition hover:gap-4"
        >
          <FiArrowLeft className="text-xl" />
          Change account type
        </button>

        {/* Registration Card */}
        <section className="overflow-hidden rounded-[36px] bg-white shadow-[0_25px_80px_rgba(44,55,120,0.12)]">

          {/* Header */}
          <div className="bg-gradient-to-r from-[#294a98] to-[#6330a4] px-8 py-10 sm:px-12 sm:py-10">

            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/15 text-3xl text-white">
              <FiBriefcase />
            </div>

            <h1 className="text-3xl font-extrabold text-white sm:text-[38px]">
              Register Your Company
            </h1>

            <p className="mt-3 text-base font-medium text-blue-100 sm:text-lg">
              Join CodeBridge Gaza to connect with talented developers.
            </p>

          </div>

          {/* Form */}
          <div className="p-7 sm:p-12">

            <form onSubmit={handleSubmit} className="space-y-7">

              <div className="grid grid-cols-1 gap-x-7 gap-y-6 md:grid-cols-2">

                {/* Company Name */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiBriefcase className="text-xl text-violet-600" />
                    Company Name
                  </label>

                  <input
                    name="companyName"
                    type="text"
                    placeholder="Enter company name"
                    required
                    className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 text-base font-medium outline-none transition focus:border-violet-500"
                  />
                </div>

                {/* Company Email */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiMail className="text-xl text-violet-600" />
                    Company Email
                  </label>

                  <input
                    name="email"
                    type="email"
                    placeholder="company@example.com"
                    required
                    className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 text-base font-medium outline-none transition focus:border-violet-500"
                  />
                </div>

                {/* Company Description */}
                <div className="md:col-span-2">
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiFileText className="text-xl text-violet-600" />
                    Company Description
                  </label>

                  <textarea
                    name="description"
                    placeholder="Tell us about your company"
                    rows={4}
                    required
                    className="w-full resize-none rounded-[20px] border-2 border-slate-200 bg-white p-5 text-base font-medium outline-none transition focus:border-violet-500"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiPhone className="text-xl text-violet-600" />
                    Phone Number
                  </label>

                  <input
                    name="phone"
                    type="tel"
                    placeholder="Enter company phone number"
                    required
                    className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 text-base font-medium outline-none transition focus:border-violet-500"
                  />
                </div>

                {/* Company Location */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiMapPin className="text-xl text-violet-600" />
                    Company Location
                  </label>

                  <input
                    name="location"
                    type="text"
                    placeholder="City, Country"
                    required
                    className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 text-base font-medium outline-none transition focus:border-violet-500"
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiLock className="text-xl text-violet-600" />
                    Password
                  </label>

                  <div className="relative">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="At least 8 characters"
                      minLength={8}
                      required
                      className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 pr-14 text-base font-medium outline-none transition focus:border-violet-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-400"
                    >
                      {showPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="mb-3 flex items-center gap-2 text-base font-bold text-slate-900">
                    <FiLock className="text-xl text-violet-600" />
                    Confirm Password
                  </label>

                  <div className="relative">
                    <input
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Confirm your password"
                      minLength={8}
                      required
                      className="h-[62px] w-full rounded-[20px] border-2 border-slate-200 bg-white px-5 pr-14 text-base font-medium outline-none transition focus:border-violet-500"
                    />

                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-xl text-slate-400"
                    >
                      {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                    </button>
                  </div>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex flex-col gap-4 pt-2 sm:flex-row">

                <button
                  type="button"
                  onClick={() => router.push("/signup")}
                  className="h-[72px] rounded-[20px] border-2 border-violet-600 px-8 text-lg font-bold text-violet-600 transition hover:bg-violet-50"
                >
                  Back
                </button>

                <button
                  type="submit"
                  className="h-[72px] flex-1 rounded-[20px] bg-gradient-to-r from-blue-500 to-violet-600 text-lg font-extrabold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.01]"
                >
                  Create Company Account
                </button>

              </div>

              {/* Login */}
              <p className="pt-1 text-center text-base text-slate-500">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-extrabold text-violet-600 hover:underline"
                >
                  Log In
                </Link>
              </p>

            </form>

          </div>
        </section>
      </div>
    </main>
  );
=======
import React from 'react'

export default function page() {
  return (
    <div>page</div>
  )
>>>>>>> origin/main
}
