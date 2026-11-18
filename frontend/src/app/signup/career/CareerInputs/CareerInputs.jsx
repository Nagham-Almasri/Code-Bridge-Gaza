"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  FiBriefcase,
  FiChevronLeft,
  FiChevronRight,
  FiTarget,
} from "react-icons/fi";
import { careerSchema } from "../schema/career.schema";
import ErrorMessage from "@/app/_Components/ErrorMessage/ErrorMessage";
import { useSignup } from "../../_context/SignupContext";

export default function CareerInputs() {
  const router = useRouter();
  const { signupData, updateCareer } = useSignup();

  const {register , handleSubmit , formState : {errors}} = useForm({
    resolver: zodResolver(careerSchema) , 
    defaultValues : {
      major : '',
      experienceLevel :''
    }
  })



  function handleCareer(data){
      updateCareer(data);
      router.push('/signup/skills')
      
  }

  return (
    <form onSubmit={handleSubmit(handleCareer)} className="space-y-6">
      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Major / Job Title
        </label>

        {errors?.major?.message ? <> 
         <div className="relative">
          <select
          {...register('major')}
            className="h-14 w-full appearance-none rounded-2xl border border-red-500 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your field
            </option>
            <option value="frontend">Front-End Developer</option>
            <option value="backend">Back-End Developer</option>
            <option value="fullstack">Full-Stack Developer</option>
            <option value="uiux">UI/UX Designer</option>
            <option value="mobileapp">Mobile App Developer</option>
            <option value="dataanalyst">Data Analyst</option>
            <option value="aiml">AI/Machine Learning Engineer</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="softwareengineer">Software Engineer</option>
            <option value="other">Other</option>

          </select>

          <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div>
        {errors?.major?.message && <ErrorMessage msg={errors?.major?.message} />}
        </> :<>  <div className="relative">
          <select
            {...register('major')}
            className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your field
            </option>
            <option value="frontend">Front-End Developer</option>
            <option value="backend">Back-End Developer</option>
            <option value="fullstack">Full-Stack Developer</option>
            <option value="uiux">UI/UX Designer</option>
            <option value="mobileapp">Mobile App Developer</option>
            <option value="dataanalyst">Data Analyst</option>
            <option value="aiml">AI/Machine Learning Engineer</option>
            <option value="cybersecurity">Cybersecurity</option>
            <option value="softwareengineer">Software Engineer</option>
            <option value="other">Other</option>

          </select>

          <FiBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div></>}

      
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Experience Level
        </label>

        {errors?.experienceLevel?.message ? <>
        <div className="relative">
          <select
            {...register('experienceLevel')}
            className="h-14 w-full appearance-none rounded-2xl border border-red-500 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your level
            </option>
            <option value="student">Student</option>
            <option value="freshgraduate">Fresh Graduate</option>
            <option value="junior">Junior</option>
            <option value="midlevel">Mid Level</option>
          </select>

          <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div>
          {errors?.experienceLevel?.message && <ErrorMessage msg={errors?.experienceLevel?.message} />}
        </>:<>
        <div className="relative">
          <select
                {...register('experienceLevel')}
            className="h-14 w-full appearance-none rounded-2xl border border-slate-200 bg-white px-12 text-sm font-semibold text-slate-700 outline-none"
          >
            <option value="" disabled>
              Select your level
            </option>
            <option value="student">Student</option>
            <option value="freshgraduate">Fresh Graduate</option>
            <option value="junior">Junior</option>
            <option value="midlevel">Mid Level</option>
          </select>

          <FiTarget className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        </div></>}

      </div>

      

        <button
          type="submit"
          className="flex w-full h-14 flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70"
        >
          Next
          <FiChevronRight />
        </button>
  
    </form>
  );
}