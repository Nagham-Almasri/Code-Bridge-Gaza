"use client";

import { useState } from "react";

import SettingsTabs from "./_SettingsCom/SettingsTabs/SettingsTabs";
import ProfileSettings from "./_SettingsCom/ProfileSettings/ProfileSettings";
import AccountSettings from "./_SettingsCom/AccountSettings/AccountSettings";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("Profile");

  return (
    <div className="p-6">
      <div className="space-y-8">

        {/* Page Heading */}
        <div>
          <h1 className="text-[28px] font-extrabold tracking-tight text-slate-950">
            Settings
          </h1>

          <p className="mt-2 text-[15px] font-medium text-slate-500">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Settings Card */}
        <section className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm">

          <SettingsTabs
            activeTab={activeTab}
            onTabChange={setActiveTab}
          />

          {activeTab === "Profile" && (
            <ProfileSettings />
          )}

          {activeTab === "Account" && (
            <AccountSettings />
          )}

      

        </section>

      </div>
    </div>
  );
}