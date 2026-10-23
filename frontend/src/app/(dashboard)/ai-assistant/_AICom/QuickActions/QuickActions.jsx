import {
  FiTarget,
  FiFileText,
  FiBriefcase,
  FiBookOpen,
  FiTrendingUp,
} from "react-icons/fi";
import { HiOutlineAcademicCap } from "react-icons/hi";

const actions = [
  {
    title: "Analyze My Skills",
    icon: FiTarget,
    gradient: "from-blue-500 to-violet-600",
  },
  {
    title: "Generate CV",
    icon: FiFileText,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Find Jobs",
    icon: FiBriefcase,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Recommend Courses",
    icon: HiOutlineAcademicCap,
    gradient: "from-violet-500 to-purple-600",
  },
  {
    title: "Career Advice",
    icon: FiTrendingUp,
    gradient: "from-blue-500 to-indigo-600",
  },
  {
    title: "Improve Resume",
    icon: FiFileText,
    gradient: "from-violet-400 to-purple-600",
  },
];

export default function QuickActions() {
  return (
    <section className="mx-auto w-full max-w-[1160px]">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">

        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              className="group flex min-h-[90px] items-center gap-4 rounded-[22px] border border-slate-100 bg-white px-6 py-4 text-left shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
            >

              {/* Icon */}
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] bg-gradient-to-br ${action.gradient} text-white shadow-lg shadow-violet-200`}
              >
                <Icon className="text-[15px]" />
              </div>

              {/* Title */}
              <h3 className="text-[16px] font-bold text-slate-900">
                {action.title}
              </h3>

            </button>
          );
        })}

      </div>
    </section>
  );
}