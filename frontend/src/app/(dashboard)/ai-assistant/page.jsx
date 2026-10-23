import AssistantHero from "./_AICom/AssistantHero/AssistantHero";
import QuickActions from "./_AICom/QuickActions/QuickActions";
import ChatInput from "./_AICom/ChatInput/ChatInput";

export default function AIAssistantPage() {
  return (
   <div className="relative min-h-full overflow-hidden bg-[#EEF2FF] px-6 py-8">

  {/* Background glow */}
  <div className="pointer-events-none absolute left-[8%] top-[28%] h-40 w-40 rounded-full bg-violet-300/20 blur-3xl" />

  <div className="pointer-events-none absolute right-[12%] top-[18%] h-44 w-44 rounded-full bg-blue-300/20 blur-3xl" />

  <div className="pointer-events-none absolute bottom-[8%] left-[38%] h-48 w-48 rounded-full bg-indigo-300/20 blur-3xl" />

  <div className="relative z-10 mx-auto max-w-[1250px] space-y-10">
    <AssistantHero />
    <QuickActions />
    <ChatInput />
  </div>

</div>
  );
}