"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiArrowUp,
  FiFacebook,
  FiInstagram,
  FiLinkedin,
  FiGithub,
  FiMessageCircle,
} from "react-icons/fi";
import Logo from "../Logo/Logo";

export default function Footer() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const pagesLinks = [
    { label: "Home", href: "/" },
    { label: "Features", href: "#features" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Jobs", href: "/jobs" },
    { label: "Courses", href: "/courses" },
  ];

  const resourcesLinks = [
    { label: "Career Assistant", href: "/ai-assistant" },
    { label: "CV Generator", href: "/cv-generator" },
    { label: "Career Tips", href: "/career-tips" },
    { label: "Learning Paths", href: "/learning-paths" },
    { label: "Support", href: "/support" },
  ];

  const companyLinks = [
    { label: "About Us", href: "#about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms" },
  ];

  return (
    <footer className="relative overflow-hidden bg-[#111c31] text-white">


      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-16">
        <div className="grid gap-14 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          <div>
            <Logo/>

            <p className="mt-8 max-w-[390px] text-sm font-medium text-white/90">
              Professional platform helping developers analyze skills, generate
              CVs, and discover career opportunities in Gaza.
            </p>

            <div className="mt-9 flex items-center gap-4">
              <SocialIcon href="#" icon={<FiFacebook />} />
              <SocialIcon href="#" icon={<FiInstagram />} />
              <SocialIcon href="#" icon={<FiLinkedin />} />
              <SocialIcon href="#" icon={<FiGithub />} />
              <SocialIcon href="#" icon={<FiMessageCircle />} />
            </div>
          </div>

          <FooterColumn title="Pages" links={pagesLinks} />
          <FooterColumn title="Resources" links={resourcesLinks} />
          <FooterColumn title="Company" links={companyLinks} />
        </div>

        <div className="mt-20 border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 text-sm text-white/90 md:flex-row md:items-center md:justify-between">
            <p>© 2026 CodeBridge Gaza — All rights reserved.</p>

            <div className="flex flex-wrap items-center gap-8 *:text-sm">
              <Link href="/privacy-policy" className="hover:text-violet-300">
                Privacy Policy
              </Link>

              <Link href="/terms" className="hover:text-violet-300">
                Terms & Conditions
              </Link>

              <Link href="/support" className="hover:text-violet-300">
                Help & Support
              </Link>
            </div>
          </div>
        </div>
      </div>

      {showScrollTop && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 flex size-13 animate-bounce-slow items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-2xl shadow-violet-500/50 transition-all duration-300 hover:scale-110"
        >
          <FiArrowUp className="text-2xl" />
        </button>
      )}
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>

      <ul className="mt-8 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className="text-sm font-medium text-white/90 transition hover:text-violet-300"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <Link
      href={href}
      className="flex h-13 w-13 items-center justify-center rounded-full border border-white/10 bg-white/10 text-2xl text-white/80 transition hover:border-violet-400 hover:bg-violet-500/30 hover:text-white"
    >
      {icon}
    </Link>
  );
}