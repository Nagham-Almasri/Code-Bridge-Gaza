import CourseCard from "../CourseCard/CourseCard";

const recommendedCourses = [
  {
    image: "/images/courses4.png",
    title: "Advanced React Patterns",
    level: "Advanced",
    category: "Frontend Development",
    description:
      "Explore advanced React patterns like render props, compound components, and custom hooks.",
  },
  {
    image: "/images/courses5.png",
    title: "Node.js Backend Development",
    level: "Intermediate",
    category: "Backend Development",
    description:
      "Build robust server-side applications and RESTful APIs using Node.js and Express.",
  },
  {
    image: "/images/courses6.png",
    title: "JavaScript ES6+",
    level: "Intermediate",
    category: "Programming",
    description:
      "Deep-dive into modern JavaScript — arrow functions, destructuring, async/await, and modules.",
  },
  {
    image: "/images/courses7.png",
    title: "Python for Data Science",
    level: "Intermediate",
    category: "Data Science",
    description:
      "Use Python, Pandas, and visualization libraries to analyze and present data effectively.",
  },
  {
    image: "/images/courses8.png",
    title: "Mobile App Development",
    level: "Intermediate",
    category: "Mobile",
    description:
      "Build cross-platform mobile applications using React Native and Expo.",
  },
  {
    image: "/images/courses9.png",
    title: "UI/UX Design Principles",
    level: "Beginner",
    category: "UI/UX Design",
    description:
      "Master design systems, typography, color theory, and component design for digital products.",
  },
];

export default function RecommendedCourses() {
  return (
    <section>
      {/* Header */}
      <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-[20px] font-extrabold text-slate-950">
            Recommended Courses
          </h2>

          <p className="mt-1 text-[13px] font-medium text-slate-500">
            Explore other courses that can help you develop new skills.
          </p>
        </div>

        <span className="rounded-full bg-slate-100 px-4 py-2 text-[14px] font-semibold text-slate-500">
          6 courses found
        </span>
      </div>

      {/* Courses */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {recommendedCourses.map((course) => (
          <CourseCard
            key={course.title}
            {...course}
            showEnroll={true}
          />
        ))}
      </div>
    </section>
  );
}