"use client";

import Link from "next/link";
import { FiMail } from "react-icons/fi";

export default function CheckEmailPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f5f7ff] via-white to-[#f3efff] px-5 py-12">
      
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-md items-center justify-center">

        {/* Card */}
        <div className="w-full rounded-[28px] bg-white px-8 py-10 shadow-xl shadow-blue-100/60 sm:px-10">

          {/* Icon */}
          <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-200">
            <FiMail className="text-[28px]" />
          </div>

          {/* Title */}
          <h1 className="text-3xl font-extrabold leading-tight text-slate-950">
            Check Your Email
          </h1>

          {/* Description */}
          <p className="mt-4 text-[15px] font-medium leading-7 text-slate-500">
            If an account exists with this email address, a password reset
            link will be sent to it.
          </p>

          {/* Prototype Notice */}
          <div className="mt-8 rounded-2xl border border-amber-300 bg-amber-50 px-5 py-5">
            <p className="text-sm font-medium leading-6 text-amber-800">
              Email delivery is not configured in this prototype. No delivery
              has been simulated. Connect the production authentication
              provider to send expiring, single-use links.
            </p>
          </div>

          {/* Back to Login */}
          <Link
            href="/login"
            className="mt-9 flex h-14 w-full items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/60 transition hover:scale-[1.01] hover:shadow-xl"
          >
            Back to Login
          </Link>

        </div>
      </div>

    </main>
  );
}