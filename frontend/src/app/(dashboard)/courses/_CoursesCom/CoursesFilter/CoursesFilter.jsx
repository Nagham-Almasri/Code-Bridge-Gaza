import { FiSearch } from "react-icons/fi";

export default function CoursesFilter() {
  return (
    <section className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">

        {/* Search */}
        <div className="relative lg:col-span-6">
          <FiSearch className="absolute left-5 top-5.5 -translate-y-1/2 text-[16px] text-slate-400" />

          <input
            type="text"
            placeholder="Search courses..."
            className="h-11 w-full rounded-2xl border border-slate-200 bg-[#FAFBFD] pl-14 pr-5 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-violet-300"
          />
        </div>

        {/* Category */}
        <select
          defaultValue=""
          className="h-11 cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-900 outline-none lg:col-span-2"
        >
          <option value="">All</option>
          <option value="frontend">Frontend Development</option>
          <option value="backend">Backend Development</option>
          <option value="programming">Programming</option>
          <option value="design">UI/UX Design</option>
          <option value="data-science">Data Science</option>
          <option value="mobile">Mobile Development</option>
        </select>

        {/* Level */}
        <select
          defaultValue=""
          className="h-11 cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-900 outline-none lg:col-span-2"
        >
          <option value="">All</option>
          <option value="beginner">Beginner</option>
          <option value="intermediate">Intermediate</option>
          <option value="advanced">Advanced</option>
        </select>

        {/* Status */}
        <select
          defaultValue=""
          className="h-11 cursor-pointer rounded-2xl border border-slate-200 bg-white px-5 text-[13px] font-medium text-slate-900 outline-none lg:col-span-2"
        >
          <option value="">All</option>
          <option value="available">Available</option>
          <option value="enrolled">Enrolled</option>
          <option value="completed">Completed</option>
        </select>

      </div>
    </section>
  );
}