'use client'
import { useQuery } from "@tanstack/react-query";
import CourseCard from "../CourseCard/CourseCard";
import { PulseLoader } from "react-spinners";


export default function RecommendedCourses() {

    const {data , isPending}=  useQuery({
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
if(isPending){
  return <PulseLoader color="#000" className="flex items-center justify-center" />
}
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