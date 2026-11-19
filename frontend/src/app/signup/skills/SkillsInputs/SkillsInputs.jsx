"use client";

import { useRouter } from "next/navigation";
import { FiChevronLeft } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { useSignup } from "../../_context/SignupContext";
import { handleSignup } from "../../action/signup.action";
import { toast } from "react-toastify";
import { useState } from "react";



export default function SkillsInputs() {
const router = useRouter()
const { signupData, updateSkills } = useSignup();
const [isLoading, setIsLoading] = useState(false);

const skillsList = [
  "HTML",
  "CSS",
  "JavaScript",
  "React",
  "Next.js",
  "Node.js",
  "Python",
  "UI/UX",
  "Figma",
  "SQL",
  "PostgreSQL",
  "Git",
];


const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm({
  defaultValues: {
    skills: [],
    acceptTerms: false,
  },
});

async function handleSkillsData(data){
  setIsLoading(true)

updateSkills(data);

  const formData = {
    ...signupData,
    skills: {
      ...signupData.skills,
      ...data,
    },
  };

     const sentData = {
      fullName: formData.personal.fullName,
      email: formData.personal.email,
      password: formData.personal.password,
      confirmPassword: formData.personal.confirmPassword,
      major: formData.career.major,
      experienceLevel: formData.career.experienceLevel,
      skills: formData.skills.skills ,
      acceptTerms: formData.skills.acceptTerms,
    };
  if(Object.values(sentData).includes(undefined)){
    router.push('/signup/personal');
  }

  
  const result = await handleSignup(sentData);
  if (!!result) {
  setTimeout(()=>{
     toast.success('Account created successfully' , {position:'top-right'})
     router.push('/login')
  },500)
  setIsLoading(false)
  }
  else{
      setTimeout(()=>{
     toast.error('This user already have an account', {position:'top-right'})
  },500)
   setIsLoading(false)
   
  }

};




  return (
 
<form onSubmit={handleSubmit(handleSkillsData)}>

{/* skills */}
  <div className="space-y-3">
    <label className="font-bold text-slate-900">
      Your Skills *
    </label>

    <div className="grid grid-cols-2 gap-3">
      {skillsList.map((skill) => (
        <label
          key={skill}
          className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 cursor-pointer hover:border-violet-400"
        >
          <input
            type="checkbox"
            value={skill}
            {...register("skills", {
              required: "Select at least one skill",
            })}
            className="h-4 w-4 accent-violet-600"
          />

          <span className="text-sm font-medium text-slate-600">
            {skill}
          </span>
        </label>
      ))}
    </div>

    {errors.skills && (
      <p className="text-sm text-red-500">
        {errors.skills.message}
      </p>
    )}
  </div>
 

 {/* terms checkbox */}
<div>
  <label className="flex cursor-pointer items-start gap-3 text-sm font-medium text-slate-500 mt-5">

    <input
      type="checkbox"
      {...register("acceptTerms", {
        required: "You must agree to the terms and conditions",
      })}
      className="mt-0.5 h-5 w-5 rounded border-slate-300 accent-violet-600"
    />

    <span>
      I agree to the{" "}
      <a href="#" className="font-bold text-violet-600">
        Terms & Conditions
      </a>
      {" "}and{" "}
      <a href="#" className="font-bold text-violet-600">
        Privacy Policy
      </a>.
    </span>

  </label>

  {errors.acceptTerms && (
    <p className="text-sm text-red-500 mt-2">
      {errors.acceptTerms.message}
    </p>
  )}
</div>


{isLoading ? <>
    <button
          type="submit"
          disabled
          className="my-5 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition cursor-not-allowed opacity-50"
        >
          Create Account
        </button></> :<>
    <button
          type="submit"
          className="my-5 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.01]"
        >
          Create Account
        </button></>}


</form>

  );
}