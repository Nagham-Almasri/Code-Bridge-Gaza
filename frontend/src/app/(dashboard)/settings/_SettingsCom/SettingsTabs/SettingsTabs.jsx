"use client";

import {
  FiUser,
  FiShield,
} from "react-icons/fi";

const tabs = [
  {
    name: "Profile",
    icon: FiUser,
  },
  {
    name: "Account",
    icon: FiShield,
  }
];

export default function SettingsTabs({
  activeTab,
  onTabChange,
}) {
  return (
    <div className="flex flex-wrap  items-center gap-2 md:gap-4 border-b border-slate-200 p-3">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const active = activeTab === tab.name;

        return (
          <button
            key={tab.name}
            type="button"
            onClick={() => onTabChange(tab.name)}
            className={`flex items-center gap-1 md:gap-3 cursor-pointer rounded-2xl px-3 md:px-5 py-3 text-[14px] font-semibold transition-all duration-200 ${
              active
                ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 hover:text-violet-600"
            }`}
          >
            <Icon className="text-[18px]" />
            {tab.name}
          </button>
        );
      })}
    </div>
  );
}