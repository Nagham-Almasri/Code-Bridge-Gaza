import Link from "next/link";
import React, { useState } from "react";
import { FiEye, FiLock, FiMail } from "react-icons/fi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ErrorMessage from "@/app/_Components/ErrorMessage/ErrorMessage";
import { loginSchema } from "../schema/login.schema";
import { signIn } from "next-auth/react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isLoading , setLoading] = useState(false)
  const router = useRouter();

  async function handleLogin(data) {
     setLoading(true)
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (result?.ok) {
      setTimeout(() => {
        toast.success("login successfuly", { position: "top-right" });
      }, 500);
      router.push("/dashboard");
      setLoading(false)
    } else {
      setTimeout(() => {
        toast.error("invalid email or password", { position: "top-right" });
      }, 500);
      setLoading(false)
    }
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

      <form onSubmit={handleSubmit(handleLogin)} className="mt-9 space-y-3">
        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-900">
            Email Address
          </label>

          {errors?.email?.message ? (
            <>
              <div
                className={`flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-slate-50 px-4 transition  focus-within:bg-white`}
              >
                <FiMail className="text-xl text-slate-400" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              {errors.email && <ErrorMessage msg={errors?.email?.message} />}
            </>
          ) : (
            <>
              <div
                className={`flex h-14 items-center gap-3 rounded-2xl border  border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white`}
              >
                <FiMail className="text-xl text-slate-400" />

                <input
                  {...register("email")}
                  type="email"
                  placeholder="Enter your email"
                  className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </>
          )}
        </div>

        <div>
          <label className="mb-3 block text-sm font-semibold text-slate-900">
            Password
          </label>

          {errors?.password?.message ? (
            <>
              {" "}
              <div className="flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-slate-50 px-4 transition  focus-within:bg-white">
                <FiLock className="text-xl text-slate-400" />

                <input
                  {...register("password")}
                  type="passwo rd"
                  placeholder="Enter your password"
                  className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
              {errors.password && (
                <ErrorMessage msg={errors?.password?.message} />
              )}
            </>
          ) : (
            <>
              {" "}
              <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white">
                <FiLock className="text-xl text-slate-400" />

                <input
                  {...register("password")}
                  type="password"
                  placeholder="Enter your password"
                  className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                />
              </div>
            </>
          )}
        </div>

        <div className="text-sm mt-5">
          <Link
            href="/forgotpassword"
            className="font-semibold text-violet-600 hover:underline cursor-pointer transition-all duration-200"
          >
            Forgot Password?
          </Link>
        </div>
        {isLoading ? <>
    <button
          type="submit"
          disabled
          className="my-5 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition cursor-not-allowed opacity-50"
        >
         Login
        </button></> :<>
    <button
          type="submit"
          className="my-5 h-14 w-full rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70 transition hover:scale-[1.01]"
        >
         Login
        </button></>}

      
      </form>
    </div>
  );
}
