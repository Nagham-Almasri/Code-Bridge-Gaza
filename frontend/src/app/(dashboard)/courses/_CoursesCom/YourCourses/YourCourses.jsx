import CourseCard from "../CourseCard/CourseCard";

const yourCourses = [
  {
    image: "/images/courses1.png",
    title: "React Fundamentals",
    level: "Intermediate",
    category: "Frontend Development",
    description:
      "Master the core concepts of React including components, hooks, and state management.",
  },
  {
    image: "/images/courses2.png",
    title: "UI/UX Design Fundamentals",
    level: "Beginner",
    category: "UI/UX Design",
    description:
      "Learn the principles of user-centered design, wireframing, and prototyping with Figma.",
  },
  {
    image: "/images/courses3.png",
    title: "Python Basics",
    level: "Beginner",
    category: "Programming",
    description:
      "Get started with Python programming — variables, loops, functions, and data structures.",
  },
];

export default function YourCourses() {
  return (
    <section>
      <div className="mb-7">
        <h2 className="text-[23px] font-extrabold text-slate-950">
          Your Courses
        </h2>

        <p className="mt-1 text-[13px] font-medium text-slate-500">
          Courses you have already added or enrolled in.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {yourCourses.map((course) => (
          <CourseCard
            key={course.title}
            {...course}
            showEnroll={false}
          />
        ))}
      </div>
    </section>
  );
}