'use client'
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../CourseCard/CourseCard";
import { PulseLoader } from "react-spinners";
import { FiSearch } from "react-icons/fi";

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


export default function YourCourses() {
  // get user courses
  const {data , isPending}=  useQuery({
  queryKey:['enrollments courses'],
  queryFn: async () => {
    const data = await fetch(`/api/userCourses`)
    const response =await data.json()
     if(!data?.ok){
     throw new Error (response.message || 'must login first')
    }
    else {
      console.log(data , 'courses data');
     return response
 }
  }
})
// get recommended courses
    const {data:recommendCourse , isPending:coursesPending}=  useQuery({
  queryKey:['recommend courses'],
  queryFn: async () => {
    const data = await fetch(`/api/recommendedCourses`)
    const response =await data.json()
     if(!data?.ok){
     throw new Error (response.message || 'must login first')
    }
    else {
      console.log(data , 'courses data');
     return response
 }
  }
})
// categories
    const {data:courseCateg}=  useQuery({
  queryKey:['courseCategories'],
  queryFn: async () => {
    const data = await fetch(`/api/courseCategories`)
    const response =await data.json()
     if(!data?.ok){
     throw new Error (response.message || 'must login first')
    }
    else {
      console.log(courseCateg , 'categories data');
     return response
 }
  }
})
if(isPending){
  return <PulseLoader color="#000" className="flex items-center justify-center" />
}

  return (
   <>
   {/* user courses */}
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
    {/* filter */}
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
    {/* recommended courses */}
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
   </>
  );
}