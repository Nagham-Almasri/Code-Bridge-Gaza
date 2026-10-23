import Link from "next/link";
import {
  FiBriefcase,
  FiBookOpen,
  FiFileText,
  FiMessageSquare,
} from "react-icons/fi";

const actions = [
  {
    title: "Browse Jobs",
    description: "Discover available...",
    buttonText: "Browse Jobs",
    href: "/dashboard/jobs",
    icon: FiBriefcase,
  },
  {
    title: "Explore Courses",
    description: "Find courses to...",
    buttonText: "View Courses",
    href: "/dashboard/courses",
    icon: FiBookOpen,
  },
  {
    title: "Generate CV",
    description: "Create a professional...",
    buttonText: "Generate CV",
    href: "/dashboard/cv-generator",
    icon: FiFileText,
  },
  {
    title: "AI Career Assistant",
    description: "Get career guidance...",
    buttonText: "Open Assistant",
    href: "/dashboard/ai-assistant",
    icon: FiMessageSquare,
  },
];

export default function QuickActions() {
  return (
    <section>
      <h2 className="mb-5 text-xl font-extrabold text-slate-950">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <div
              key={action.title}
              className="flex items-center gap-5 rounded-xl border border-slate-200 bg-white px-4 py-3.5 hover:shadow transition-all duration-300 hover:scale-105"
            >
              {/* Icon */}
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-200">
                <Icon className="text-[18px]" />
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <h3 className="text-[13px] font-extrabold text-slate-950">
                  {action.title}
                </h3>

                <p className="mt-1 truncate hidden sm:block text-[10px] font-medium text-slate-500">
                  {action.description}
                </p>
              </div>

              {/* Button */}
              <Link
                href={action.href}
                className="shrink-0 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 px-4 py-1.5 text-[12px] font-medium text-white shadow-md shadow-violet-200 transition hover:scale-[1.03]"
              >
                {action.buttonText}
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}