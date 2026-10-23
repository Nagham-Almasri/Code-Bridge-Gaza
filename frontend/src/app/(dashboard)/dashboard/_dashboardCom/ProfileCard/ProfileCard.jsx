import Link from "next/link";
import {
  FiArrowRight,
  FiMail,
  FiCheckCircle,
} from "react-icons/fi";

export default function ProfileCard() {
  const skills = ["React", "TypeScript", "Node.js", "UI/UX"];

  return (
    <div className="rounded-[28px] bg-gradient-to-r from-[#304FAD] to-[#6436B5] px-5 py-5 text-white shadow-lg shadow-violet-200/40">
      
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">

        {/* User Info */}
        <div className="flex items-start gap-5">

          {/* Avatar */}
          <div className="flex md:size-16 size-12 shrink-0 items-center justify-center rounded-[18px] bg-white/20 text-md md:text-xl font-extrabold">
            AH
          </div>

          {/* Details */}
          <div>
            <p className="text-[13px] font-medium text-white/80">
              Welcome back
            </p>

            <h2 className="mt-1 text-xl font-extrabold">
              Ahmed Hassan
            </h2>

            <p className="mt-1 text-sm font-medium text-white/90">
              Frontend Developer
            </p>

            {/* Contact */}
            <div className="mt-2 flex flex-wrap items-center gap-5 text-sm font-medium">

              <div className="flex items-center gap-2 text-white/75">
                <FiMail className="text-md" />
                <span>ahmed@example.com</span>
              </div>

              <div className="flex items-center gap-2 text-emerald-300">
                <FiCheckCircle className="text-md" />
                <span className="font-bold">Active</span>
              </div>

            </div>

            {/* Skills */}
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/25 bg-white/15 px-4 py-1 text-[11px] font-semibold text-white"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* View Profile */}
        <Link
          href="/dashboard/profile"
          className="inline-flex px-5 py-3 shrink-0 items-center justify-center gap-3 rounded-2xl bg-white  text-sm font-bold text-violet-600 transition hover:scale-[1.02]"
        >
          <FiArrowRight className="text-lg" />
          View Profile
        </Link>

      </div>
    </div>
  );
}