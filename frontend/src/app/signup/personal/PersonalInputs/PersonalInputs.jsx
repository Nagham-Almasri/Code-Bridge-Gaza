"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { FiChevronRight, FiEye, FiLock, FiMail, FiUser } from "react-icons/fi";
import { personalSchema } from "../schema/personal.schema";
import ErrorMessage from "@/app/_Components/ErrorMessage/ErrorMessage";
import { useSignup } from "../../_context/SignupContext";

export default function PersonalInputs() {
  const router = useRouter();
  const { signupData, updatePersonal } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(personalSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function handlePersonal(data){
     updatePersonal(data);
     router.push('/signup/career')
  }
  return (
    <form onSubmit={handleSubmit(handlePersonal)} className="space-y-5">
      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Full Name
        </label>

        {errors?.fullName?.message ? (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-white px-4">
              <FiUser className="text-xl text-slate-400" />

              <input
              {...register('fullName')}
                type="text"
                placeholder="Enter your full name"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
            {errors?.fullName?.message && (
              <ErrorMessage msg={errors?.fullName?.message}></ErrorMessage>
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
              <FiUser className="text-xl text-slate-400" />

              <input
              {...register('fullName')}
                type="text"
                placeholder="Enter your full name"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Email
        </label>

        {errors?.email?.message ? (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-white px-4">
              <FiMail className="text-xl text-slate-400" />

              <input
              {...register('email')}
                type="email"
                placeholder="Enter your email"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
            {errors?.email?.message && (
              <ErrorMessage msg={errors?.email?.message} />
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
              <FiMail className="text-xl text-slate-400" />

              <input
                type="email"
                {...register('email')}
                placeholder="Enter your email"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />
            </div>
          </>
        )}
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Password
        </label>

        {errors?.password?.message ? (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-white px-4">
              <FiLock className="text-xl text-slate-400" />

              <input
              {...register('password')}
                type="password"
                placeholder="Create a password (min. 8 chars)"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />

            </div>
            {errors?.password?.message && (
              <ErrorMessage msg={errors?.password?.message} />
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
              <FiLock className="text-xl text-slate-400" />

              <input
               {...register('password')}
                type="password"
                placeholder="Create a password (min. 8 chars)"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />

            </div>
          </>
        )}
      </div>

      <div>
        <label className="mb-3 block text-sm font-bold text-slate-900">
          Confirm Password
        </label>
        {errors?.confirmPassword?.message ? (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-white px-4">
              <FiLock className="text-xl text-slate-400" />

              <input
               {...register('confirmPassword')}
                type="password"
                placeholder="Confirm your password"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />

            </div>
            {errors?.confirmPassword?.message && (
              <ErrorMessage msg={errors?.confirmPassword?.message} />
            )}
          </>
        ) : (
          <>
            {" "}
            <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4">
              <FiLock className="text-xl text-slate-400" />

              <input
                {...register('confirmPassword')}
                type="password"
                placeholder="Confirm your password"
                className="h-full flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-slate-400"
              />

            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        className="flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70"
      >
        Next
        <FiChevronRight className="text-xl" />
      </button>
    </form>
  );
}
