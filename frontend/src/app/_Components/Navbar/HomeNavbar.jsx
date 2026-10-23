"use client";

import { useState } from "react";
import NextLink from "next/link";
import { FiLogIn, FiMenu, FiX } from "react-icons/fi";

export default function HomeNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Jobs", href: "/jobs" },
    { label: "Courses", href: "/courses" },
    { label: "AI Assistant", href: "/ai-assistant" },
    { label: "Add Job", href: "/add-job" },
  ];

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white">
      <nav className="mx-auto flex h-[88px] w-full items-center justify-between px-6  md:px-10">
        <NextLink href="/" onClick={closeMenu} className="flex items-center gap-4">
          <div className="flex size-10 items-center justify-center rounded-[12px] bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-300/60">
            <div className="flex size-7 items-center justify-center rounded-full border-[2.5px] border-white">
              <div className="flex size-4 items-center justify-center rounded-full border-[2.5px] border-white">
                <div className="h-[5px] w-[5px] rounded-full bg-white" />
              </div>
            </div>
          </div>

          <h1 className="text-lg font-bold tracking-[-0.04em] text-slate-950">
            CodeBridge <span className="text-[#4f46e5]">Gaza</span>
          </h1>
        </NextLink>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.label}>
              <NextLink
                href={link.href}
                className={`text-sm  lg:text-md font-semibold transition-all duration-300 hover:text-[#4f46e5] hover:scale-105 ${
                  link.label === "Home" ? "text-[#4f46e5]" : "text-slate-500"
                }`}
              >
                {link.label}
              </NextLink>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3 *:cursor-pointer *:font-semibold *:text-sm">
          <NextLink
            href="/login"
            className="p-2 border rounded-full border-slate-200 px-6 flex items-center gap-1  text-[#4f46e5] sm:flex hover:shadow-md hover:shadow-gray-200"
          >
            <FiLogIn className="" />
            Login
          </NextLink>

          <NextLink
            href="/signup/personal"
            className="p-2 bg-gradient-to-r from-blue-500 to-violet-600 px-6   text-white rounded-full hover:shadow-md hover:shadow-violet-300/70"
          >
            Sign Up
          </NextLink>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
      
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
            className="flex size-10 items-center justify-center rounded-2xl border border-slate-200 bg-white text-xl text-slate-700 transition-all duration-200 hover:border-[#4f46e5] hover:text-[#4f46e5]"
          >
            {isOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-5 pb-10 pt-8 lg:hidden">
          <ul className="space-y-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <NextLink
                  href={link.href}
                  onClick={closeMenu}className={`block text-md  p-4 rounded-sm font-semibold transition-all duration-300 hover:text-[#4f46e5] hover:scale-102 ${
                    link.label === "Features"
                      ? "bg-violet-50 text-blue-600"
                      : link.label === "Home"
                      ? "text-blue-600"
                      : "text-slate-700 hover:bg-violet-50 hover:text-blue-600"
                  }`}
                >
                  {link.label}
                </NextLink>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-slate-100 pt-5">
            <NextLink
              href="/login"
              onClick={closeMenu}
              className="flex p-4 items-center justify-center gap-3 rounded-2xl border border-slate-300 bg-white text-md font-semibold text-[#4f46e5] hover:shadow-md hover:shadow-gray-200" 
            >
              <FiLogIn className="text-md" />
              Login
            </NextLink>

            <NextLink
              href="/signup/personal"
              onClick={closeMenu}
              className="mt-4 flex p-4 items-center justify-center rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-md font-semibold text-white hover:shadow-md hover:shadow-violet-300/70"
            >
              Sign Up
            </NextLink>
          </div>
        </div>
      )}
    </header>
  );
}