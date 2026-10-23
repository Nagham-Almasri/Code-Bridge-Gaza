import {
  FiMic,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";

export default function ChatInput() {
  return (
    <section className="mx-auto w-full max-w-[990px]">

      <div className="flex items-center gap-3 rounded-[22px] border border-slate-100 bg-white px-5 py-4 shadow-lg shadow-slate-200/60">

        {/* Input */}
        <input
          type="text"
          placeholder="Ask anything about your career..."
          className="min-w-0 flex-1 bg-transparent px-2 text-[15px] text-slate-900 outline-none placeholder:text-slate-400"
        />

        {/* Microphone */}
        <button
          type="button"
          className="flex size-9 md:size-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-violet-600"
          aria-label="Voice message"
        >
          <FiMic className="text-md md:text-[20px]" />
        </button>

        {/* Attachment */}
        <button
          type="button"
          className="flex size-9 md:size-14 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition hover:bg-slate-100 hover:text-violet-600"
          aria-label="Attach file"
        >
          <FiPaperclip className="text-md md:text-[20px]" />
        </button>

        {/* Send */}
        <button
          type="button"
          className="flex size-9 md:size-14 shrink-0 items-center justify-center rounded-[16px] bg-gradient-to-br from-blue-500 to-violet-600 text-white shadow-lg shadow-violet-200 transition hover:scale-105"
          aria-label="Send message"
        >
          <FiSend className="text-md md:text-[20px]" />
        </button>

      </div>

    </section>
  );
}