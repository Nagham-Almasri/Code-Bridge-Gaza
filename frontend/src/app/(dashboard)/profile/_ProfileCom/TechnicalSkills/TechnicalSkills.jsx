const skills = [
  "React",
  "Node.js",
  "TypeScript",
  "UI/UX Design",
  "PostgreSQL",
  "MongoDB",
  "Tailwind CSS",
  "Git",
];

export default function TechnicalSkills() {
  return (
    <section className="rounded-[30px] border border-slate-100 bg-white p-8 shadow-sm">
      
      <h2 className="text-2xl font-bold text-slate-950">
        Technical Skills
      </h2>

      <div className="mt-4 flex flex-wrap gap-4">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-[14px] border border-violet-200 bg-[#F8F7FF] px-4 py-2 text-[16px] font-semibold text-violet-600 transition hover:border-violet-300 hover:bg-violet-50"
          >
            {skill}
          </span>
        ))}
      </div>

    </section>
  );
}