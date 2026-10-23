import {
  FiBookOpen,
  FiCode,
  FiLayers,
  FiArrowRight,
} from "react-icons/fi";
import { MdOutlinePalette } from "react-icons/md";

export default function CoursesHero() {
  return (
    <section>
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-[28px] font-extrabold tracking-tight text-slate-950">
          Learning Courses
        </h1>

        <p className="mt-1 text-[14px] font-medium text-slate-500">
          Personalized recommendations to boost your skills
        </p>
      </div>

      {/* Hero */}
      <div className="relative overflow-hidden rounded-[23px] bg-gradient-to-r from-[#294CA5] via-[#4545B7] to-[#6732B6] px-8 py-8 text-white">

        {/* Background Decorations */}
        <div className="absolute -right-14 -top-16 h-52 w-52 rounded-full bg-white/10" />

        <div className="absolute right-[24%] top-5 h-20 w-20 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 right-[12%] h-40 w-40 rounded-full bg-white/5" />

        <div className="relative z-10 flex items-center justify-between gap-10">

          {/* Left Content */}
          <div className="max-w-[650px]">

            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/15">
                <FiBookOpen className="text-[15px]" />
              </div>

              <span className="text-[14px] font-semibold text-white/90">
                CodeBridge Gaza Learning
              </span>
            </div>

            <h2 className="mt-5 text-[28px] font-extrabold leading-tight">
              Keep Building Your Skills
            </h2>

            <p className="mt-4 max-w-[430px] text-[13px] font-medium leading-6 text-white/90">
              Explore technical courses that can help you strengthen your
              knowledge and prepare for better career opportunities.
            </p>

            <button
              type="button"
              className="mt-7 inline-flex h-11 items-center gap-3 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-6 text-[13px] font-bold text-white shadow-lg transition hover:scale-[1.02]"
            >
              Explore Courses
              <FiArrowRight className="text-[19px]" />
            </button>

          </div>

          {/* Right Icons */}
          <div className="hidden grid-cols-2 gap-4 lg:grid">

            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-white/15">
              <FiCode className="text-[24px]" />
            </div>

            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-white/15">
              <FiLayers className="text-[24px]" />
            </div>

            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-white/15">
              <FiBookOpen className="text-[23px]" />
            </div>

            <div className="flex h-[60px] w-[60px] items-center justify-center rounded-[18px] bg-white/15">
              <MdOutlinePalette className="text-[24px]" />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}