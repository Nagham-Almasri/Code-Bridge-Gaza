import Link from "next/link";

export default function Logo({
  className = "",
  variant = "default",
}) {
  const isSidebar = variant === "sidebar";

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-3 ${className}`}
    >
      {/* Logo Icon */}
      <div
        className={`flex items-center justify-center rounded-xl ${
          isSidebar
            ? "h-10 w-10 bg-white/15"
            : "h-11 w-11 bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-violet-300/50"
        }`}
      >
        <div className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-white">
          <div className="flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white">
            <div className="h-1.5 w-1.5 rounded-full bg-white" />
          </div>
        </div>
      </div>

      {/* Logo Text */}
      {isSidebar ? (
        <span className={`  tracking-tight ${
          isSidebar
          ? "text-[16px] font-bold"
          :"text-[20px] font-extrabold"
        }`}>
          <span className="text-white">CodeBridge </span>

          <span className="text-[#B8A7FF]">
            Gaza
          </span>
        </span>
      ) : (
        <span className="text-2xl font-extrabold tracking-tight text-blue-600">
          CodeBridge Gaza
        </span>
      )}
    </Link>
  );
}