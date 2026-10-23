"use client";

import { usePathname } from "next/navigation";
import Logo from "@/app/_Components/Logo/Logo";
import SignUpSteps from "@/app/_Components/SignUpSteps/SignUpSteps";
import AuthSide from "../AuthSide/AuthSide";

const pagesData = {
  "/signup/personal": {
    activeStep: 1,
    title: "Create Your Account",
    subtitle: "Start your journey with CodeBridge Gaza",
  },

  "/signup/career": {
    activeStep: 2,
    title: "Tell Us About Your Career",
    subtitle: "Help us personalise your experience",
  },

  "/signup/skills": {
    activeStep: 3,
    title: "Add Your Skills",
    subtitle: "Showcase what you know to employers",
  },
};

export default function SignUpShell({ children }) {
  const pathname = usePathname();

  const currentPage = pagesData[pathname] || pagesData["/signup/personal"];

  return (
    <main className="min-h-screen bg-[#f4f2ff]">
      <div className="grid min-h-screen lg:grid-cols-2">
        <section className="flex min-h-screen flex-col sm:px-6 py-8 sm:px-10 lg:px-20">
          <Logo />

          <div className="flex flex-1 items-center justify-center py-8">
            <div className="w-full min-w-[340px] rounded-[28px] bg-white px-9 py-9 shadow-xl shadow-blue-100/70">
              <p className="mb-5 text-sm font-medium text-slate-500">
                Already have an account?{" "}
                <a href="/login" className="font-bold text-violet-600">
                  Log In
                </a>
              </p>

              <h1 className="text-lg sm:text-2xl font-extrabold leading-tight text-slate-950">
                {currentPage.title}
              </h1>

              <p className="mt-2 text-sm font-medium text-slate-400">
                {currentPage.subtitle}
              </p>

              <SignUpSteps activeStep={currentPage.activeStep} />

              <div className="mt-8">{children}</div>
            </div>
          </div>
        </section>

   <AuthSide/>
      </div>
    </main>
  );
}