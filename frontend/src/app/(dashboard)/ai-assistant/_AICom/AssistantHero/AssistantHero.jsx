import {
  FiMessageCircle,
  FiTarget,
  FiBriefcase,
} from "react-icons/fi";

export default function AssistantHero() {
  return (
    <section className="flex flex-col items-center pt-3 text-center">

      <div className="relative size-50">

        <div className="h-full w-full rounded-[28px] bg-gradient-to-br from-[#356DF3] via-[#514FEF] to-[#7838F2] shadow-[0_25px_60px_rgba(109,74,255,0.28)]">
          <div className="flex h-full items-center justify-center">
            <FiMessageCircle
              className="text-[112px] text-white"
              strokeWidth={2.2}
            />
          </div>
        </div>

        <div className="absolute -right-5 -top-5 flex size-18 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_35px_rgba(71,85,105,0.16)]">
          <FiTarget className="text-[34px] text-blue-600" />
        </div>

        <div className="absolute -bottom-5 -left-5 flex size-18 items-center justify-center rounded-[20px] bg-white shadow-[0_15px_35px_rgba(71,85,105,0.16)]">
          <FiBriefcase className="text-[33px] text-violet-600" />
        </div>

      </div>

      <h1 className="mt-12 bg-gradient-to-r from-[#3574F4] to-[#8B4BF5] bg-clip-text text-3xl font-extrabold leading-tight text-transparent">
        Hello, Ahmed!
      </h1>

      <p className="mt-3 text-md font-medium text-[#59657A]">
        How can I help you today?
      </p>

    </section>
  );
}