import { FiFileText } from "react-icons/fi";

export default function CVHero() {
  return (
    <section className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#294CA5] via-[#4545B5] to-[#6732B6] px-8 py-8 text-white">

      {/* Decorative Circles */}
      <div className="absolute -right-16 -top-20 h-52 w-52 rounded-full bg-white/5" />

      <div className="relative z-10 flex items-center gap-5">
        
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center">
          <FiFileText className="text-[35px] text-white" />
        </div>

        {/* Text */}
        <div>
          <h1 className="text-[30px] font-extrabold leading-tight">
            CV Generator
          </h1>

          <p className="mt-1 text-[14px] font-medium text-white/90">
            Create a professional CV with smart templates
          </p>
        </div>

      </div>
    </section>
  );
}