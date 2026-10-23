import { FiPlay } from "react-icons/fi";

const lessons = [
  {
    id: 1,
    title: "Render Props Pattern",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Compound Components",
    duration: "50 min",
  },
  {
    id: 3,
    title: "Custom Hooks Deep Dive",
    duration: "55 min",
  },
  {
    id: 4,
    title: "Context API Mastery",
    duration: "48 min",
  },
  {
    id: 5,
    title: "Performance & Memoization",
    duration: "52 min",
  },
  {
    id: 6,
    title: "Code Splitting",
    duration: "35 min",
  },
  {
    id: 7,
    title: "Testing React Apps",
    duration: "60 min",
  },
];

export default function CourseCurriculum() {
  return (
    <section className="mt-10">

      <h2 className="mb-6 text-[22px] font-extrabold text-slate-950">
        Course Curriculum
      </h2>


      <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-white">

        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="flex h-[78px]  hover:bg-gray-100 transition items-center justify-between border-b border-slate-100 px-8 last:border-none"
          >

            <div className="flex items-center gap-5">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-600 text-[14px] font-bold text-white">
                {lesson.id}
              </div>


              <h3 className="text-[15px] font-semibold text-slate-900">
                {lesson.title}
              </h3>

            </div>


            <div className="flex items-center gap-8">

              <span className="text-[14px] font-medium text-slate-400">
                {lesson.duration}
              </span>

              <FiPlay className="text-[18px] text-violet-600" />

            </div>

          </div>
        ))}

      </div>

    </section>
  );
}