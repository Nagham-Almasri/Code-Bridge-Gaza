
import Link from 'next/link'
import React from 'react'
import { FiEye, FiLock, FiMail } from 'react-icons/fi'
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from '../../../../validation/loginSchema/login.schema'
import { useForm } from 'react-hook-form';
import ErrorMessage from '@/app/_Components/ErrorMessage/ErrorMessage';

export default function LoginForm() {

let {register , handleSubmit ,  formState:{errors , isSubmitting}} = useForm({
        mode: "onChange",
        resolver: zodResolver(loginSchema),
        defaultValues:{
            email :"",
            password:"",
        }
    })


function handleLogin(data){
    console.log('data', data)
}


  return (
    <div className="w-2/3 mx-auto rounded-[28px] bg-white mt-7 px-9 py-10 shadow-xl shadow-blue-100/70">
      <p className="mb-5 text-sm font-medium text-slate-500">
        Don't have an account?{" "}
        <Link href="signup/personal" className="font-bold text-violet-600">
          Sign Up
        </Link>
      </p>

      <h1 className="text-3xl font-extrabold leading-tight text-slate-950">
        Welcome Back to
        <br />
        CodeBridge Gaza
      </h1>

      <p className="mt-3 text-sm font-medium text-slate-400">
        Continue your career development journey
      </p>

      <form 
      onSubmit={handleSubmit(handleLogin)}
      className="mt-9 space-y-6" >
        <div>
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Email Address
          </label>

          <div className={`flex h-14 items-center gap-3 rounded-2xl border  border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white`}>
            <FiMail className="text-xl text-slate-400" />

            <input
            {...register("email")}
              type="email"
              placeholder="Enter your email"
              className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />
          </div>
        </div>
        {errors.email && <ErrorMessage msg={errors?.email?.message}/>}

        <div>
          <label className="mb-3 block text-sm font-bold text-slate-900">
            Password
          </label>

          <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">
            <FiLock className="text-xl text-slate-400" />

            <input
            {...register("password")}
              type="password"
              placeholder="Enter your password"
              className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
            />

            <button type="button" className="text-slate-400">
              <FiEye className="text-xl" />
            </button>
          </div>
        </div>
        {errors.password && <ErrorMessage msg={errors?.password?.message}/>}

        <div className=" text-sm">
   

          <Link href="/forgotpassword" className="font-bold text-violet-600 hover:underline cursor-pointer transition-all duration-200">
            Forgot Password?
          </Link>
        </div>

        <button
          type="submit"
          className="h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.01]"
        >
          Log In
        </button>
      </form>
    </div>
  )
}
