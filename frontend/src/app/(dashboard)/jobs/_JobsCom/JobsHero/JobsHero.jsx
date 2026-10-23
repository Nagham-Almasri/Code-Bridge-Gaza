import { FiSearch } from "react-icons/fi";

export default function JobsHero() {
  return (
    <section className="relative overflow-hidden rounded-[22px] bg-gradient-to-r from-[#294CA5] via-[#4146B4] to-[#6732B6] px-9 py-6 text-white">

      {/* Decorative circles */}
      <div className="absolute -right-12 -top-14 h-40 w-40 rounded-full bg-white/10" />

      <div className="absolute -bottom-16 right-24 h-28 w-28 rounded-full bg-white/5" />

      <div className="relative z-10">

        {/* Welcome */}
        <h1 className="text-[28px] font-extrabold leading-tight">
          Welcome back, Ahmed <span>👋</span>
        </h1>

        <p className="mt-2 text-[15px] font-medium text-white/90">
          Discover job opportunities that match your skills and career goals.
        </p>

        {/* Search + Filters */}
        <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-12">

          {/* Search */}
          <div className="relative lg:col-span-8">

            <FiSearch className="absolute left-5 top-5.5 -translate-y-1/2 text-[22px] text-slate-400" />

            <input
              type="text"
              placeholder="Search by job title, company, or skill..."
              className="h-11 w-full rounded-xl bg-white pl-14 pr-5 text-[14px] text-slate-900 outline-none placeholder:text-slate-400"
            />

          </div>


          {/* Job Type */}
            <select
            defaultValue=""
            className="h-11 cursor-pointer rounded-xl border-none bg-white px-2 text-[14px] font-medium text-slate-950 outline-none lg:col-span-2"
            >
            <option value="" disabled>Job Type</option>
            <option value="full-time">Full-time</option>
            <option value="part-time">Part-time</option>
            <option value="remote">Remote</option>
            <option value="freelance">Freelance</option>
            <option value="contract">Contract</option>
            </select>

          {/* Location */}

            <select
            defaultValue=""
            className="h-11 cursor-pointer rounded-xl border-none bg-white px-2 text-[14px] font-medium text-slate-950 outline-none lg:col-span-2"
            >
            <option value="" disabled>Location</option>
            <option value="gaza-city">Gaza City</option>
            <option value="khan-younis">Khan Younis</option>
            <option value="rafah">Rafah</option>
            <option value="remote">Remote</option>
            </select>
        </div>
      </div>

    </section>
  );
}