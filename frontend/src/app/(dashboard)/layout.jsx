import Sidebar from "./_FixedCom/Sidebar/Sidebar";
import Topbar from "./_FixedCom/Topbar/Topbar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#F7F8FC]">

      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Right Side */}
    <div className="flex min-w-0 flex-1 flex-col">

        {/* Fixed Topbar */}
        <Topbar />

        {/* Scrollable Page Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          {children}
        </main>

    </div>
    </div>
  );
}