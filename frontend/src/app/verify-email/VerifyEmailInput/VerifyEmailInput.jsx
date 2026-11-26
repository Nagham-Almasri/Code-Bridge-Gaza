'use client'
import { verifyEmailFn } from '@/app/apis/verifyMail/verifyemail.action'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiMail,
  FiChevronLeft,
  FiCheckCircle,
} from "react-icons/fi";
export default function VerifyEmailInput() {
    const {register , handleSubmit , formState:{errors}} = useForm({
        defaultValues :{otp :''}
    })
    
    
 const [email, setEmail] = useState("");

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("verificationEmail");

    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);


async function handleVerifiedMail(data){
    if (!email) return;
    
await verifyEmailFn({
  email: email,
  otp: data.otp,
});
}

const {data, mutate} = useMutation({
  mutationFn: async ()=>{
     if (!email) return;
  await resendCodeFn(email)
  }
})
 function handleResendCode(){
    mutate()

}
  return (
    // <>
    //  <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0efff] via-white to-[#eeecff] px-5 py-12">
    //       {/* Logo */}
    //   <Link href="/" className="mb-9 flex items-center gap-4">
    //     <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 text-3xl text-white shadow-lg shadow-violet-200">
    //       ◎
    //     </div>

    //     <span className="text-2xl font-extrabold text-slate-900">
    //       CodeBridge Gaza
    //     </span>
    //   </Link>
    //         {/* Verification Card */}
    //   <section className="w-full max-w-[660px] rounded-[32px] bg-white px-7 py-10 shadow-[0_25px_80px_rgba(44,55,120,0.10)] sm:px-12 sm:py-12">

    //     {/* Icon */}
    //     <div className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-[24px] bg-violet-50 text-[42px] text-indigo-600">
    //       {/* {success ? <FiCheckCircle /> : <FiMail />} */}
    //     </div>

    //     {/* Heading */}
    //     <h1 className="mt-7 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[44px]">
    //       {/* {success ? "Email Verified!" : "Verify Your Email"} */}
    //     </h1>

    //     <p className="mx-auto mt-4 max-w-[480px] text-center text-base font-medium leading-8 text-slate-500 sm:text-xl">
    //       {success
    //         ? "Your email address has been verified successfully."
    //         : "Enter the 6-digit verification code sent to your email address."}
    //     </p>

    //     {!success && (
    //       <>
    //         {/* Email */}
    //         <div className="mt-5 flex justify-center">
    //           <div className="rounded-full bg-[#eef2ff] px-5 py-3 text-center text-base font-bold text-[#304b9e] break-all">
    //             {email}
    //           </div>
    //         </div>

    //         {/* Demo Code */}
    //         <p className="mt-4 text-center text-base font-semibold text-indigo-600">
    //           Demo OTP: 123456 — no email is sent.
    //         </p>

    //         {/* OTP Inputs */}
    //         <form onSubmit={handleSubmit(handleVerifiedMail)}>
    //           <div className="mt-10 flex justify-center gap-2 sm:gap-4">
    //             {otp.map((digit, index) => (
    //               <input
    //                 key={index}
    //                 ref={(el) => (inputsRef.current[index] = el)}
    //                 type="text"
    //                 inputMode="numeric"
    //                 autoComplete={index === 0 ? "one-time-code" : "off"}
    //                 maxLength={1}
    //                 value={digit}
    //                 onChange={(e) =>
    //                   handleChange(index, e.target.value)
    //                 }
    //                 onKeyDown={(e) =>
    //                   handleKeyDown(index, e)
    //                 }
    //                 onPaste={index === 0 ? handlePaste : undefined}
    //                 className="h-[66px] w-[48px] rounded-[18px] border-2 border-slate-200 text-center text-2xl font-extrabold text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:h-[82px] sm:w-[78px]"
    //               />
    //             ))}
    //           </div>

    //           {/* Error */}
    //           {error && (
    //             <p className="mt-4 text-center text-sm font-semibold text-red-500">
    //               {error}
    //             </p>
    //           )}

    //           {/* Verify Button */}
    //           <button
    //             type="submit"
    //             className="mt-9 h-[68px] w-full rounded-[20px] bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-extrabold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.01] hover:shadow-xl"
    //           >
    //             Verify Email
    //           </button>
    //         </form>

    //         {/* Resend */}
    //         <div className="mt-8 text-center text-base font-medium text-slate-500">
    //           Didn't receive the code?{" "}
    //           <button
    //             type="button"
    //             onClick={handleResend}
    //             className="font-extrabold text-indigo-600 hover:underline"
    //           >
    //             Resend OTP
    //           </button>
    //         </div>

    //         {resent && (
    //           <p className="mt-3 text-center text-sm text-green-600">
    //             Demo code is still 123456.
    //           </p>
    //         )}

    //         {/* Back */}
    //         <div className="mt-8 flex justify-center">
    //           <Link
    //             href="/signup"
    //             className="flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3"
    //           >
    //             <FiChevronLeft className="text-xl" />
    //             Back to Sign Up
    //           </Link>
    //         </div>
    //       </>
    //     )}

    //     {success && (
    //       <button
    //         onClick={() => router.push("/")}
    //         className="mt-9 h-[68px] w-full rounded-[20px] bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-extrabold text-white shadow-lg"
    //       >
    //         Continue
    //       </button>
    //     )}
    //   </section>

    //   {/* Footer */}
    //   <p className="mt-7 text-center text-sm font-medium text-slate-400">
    //     CodeBridge Gaza — Secure Account Verification
    //   </p>

    //   </main>

    // </>
    <form onSubmit={handleSubmit(handleVerifiedMail)} className='w-2/3 mx-auto my-15 border-slate-700 p-10 rounded-xl'>
        <label className="mb-7 block text-sm font-semibold text-slate-900">
            Email Address
          </label>
          {errors?.otp?.message ? <>         <div
                          className={`flex h-14 items-center gap-3 rounded-2xl border border-red-500 bg-slate-50 px-4 transition  focus-within:bg-white`}
                        >
                          < FiMail className="text-xl text-slate-400" />
          
                          <input
                           {...register('otp')}
                            type="text"
                            placeholder="Enter the OTP"
                            className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                          />
                        </div>
                        <ErrorMessage msg='This field is requiered'></ErrorMessage>
                        </> : <>         <div
                          className={`flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition  focus-within:bg-white`}
                        >
                          <FiMail className="text-xl text-slate-400" />
          
                          <input
                           {...register('otp')}
                            type="text"
                            placeholder="Enter the OTP"
                            className="h-full flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400"
                          />
                        </div></>}
                              <div className="text-sm mt-2">
          <button
          onClick={handleResendCode}
            
            className=" text-violet-600 hover:underline cursor-pointer transition-all duration-200"
          >
            resend code
          </button>
        </div>
                              <button
                                type="submit"
                                className=" h-14 w-full mt-7 rounded-2xl bg-gradient-to-r from-blue-500 to-violet-600 text-base font-extrabold text-white shadow-lg shadow-violet-300/70"
                              >
                                send
                               
                              </button>
             
   
    </form>
  )
}


    // <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#f0efff] via-white to-[#eeecff] px-5 py-12">

    

    //   {/* Verification Card */}
    //   <section className="w-full max-w-[660px] rounded-[32px] bg-white px-7 py-10 shadow-[0_25px_80px_rgba(44,55,120,0.10)] sm:px-12 sm:py-12">

    //     {/* Icon */}
    //     <div className="mx-auto flex h-[86px] w-[86px] items-center justify-center rounded-[24px] bg-violet-50 text-[42px] text-indigo-600">
    //       {success ? <FiCheckCircle /> : <FiMail />}
    //     </div>

    //     {/* Heading */}
    //     <h1 className="mt-7 text-center text-3xl font-extrabold tracking-tight text-slate-900 sm:text-[44px]">
    //       {success ? "Email Verified!" : "Verify Your Email"}
    //     </h1>

    //     <p className="mx-auto mt-4 max-w-[480px] text-center text-base font-medium leading-8 text-slate-500 sm:text-xl">
    //       {success
    //         ? "Your email address has been verified successfully."
    //         : "Enter the 6-digit verification code sent to your email address."}
    //     </p>

    //     {!success && (
    //       <>
    //         {/* Email */}
    //         <div className="mt-5 flex justify-center">
    //           <div className="rounded-full bg-[#eef2ff] px-5 py-3 text-center text-base font-bold text-[#304b9e] break-all">
    //             {email}
    //           </div>
    //         </div>

    //         {/* Demo Code */}
    //         <p className="mt-4 text-center text-base font-semibold text-indigo-600">
    //           Demo OTP: 123456 — no email is sent.
    //         </p>

    //         {/* OTP Inputs */}
    //         <form onSubmit={handleVerify}>
    //           <div className="mt-10 flex justify-center gap-2 sm:gap-4">
    //             {otp.map((digit, index) => (
    //               <input
    //                 key={index}
    //                 ref={(el) => (inputsRef.current[index] = el)}
    //                 type="text"
    //                 inputMode="numeric"
    //                 autoComplete={index === 0 ? "one-time-code" : "off"}
    //                 maxLength={1}
    //                 value={digit}
    //                 onChange={(e) =>
    //                   handleChange(index, e.target.value)
    //                 }
    //                 onKeyDown={(e) =>
    //                   handleKeyDown(index, e)
    //                 }
    //                 onPaste={index === 0 ? handlePaste : undefined}
    //                 className="h-[66px] w-[48px] rounded-[18px] border-2 border-slate-200 text-center text-2xl font-extrabold text-slate-900 shadow-sm outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 sm:h-[82px] sm:w-[78px]"
    //               />
    //             ))}
    //           </div>

    //           {/* Error */}
    //           {error && (
    //             <p className="mt-4 text-center text-sm font-semibold text-red-500">
    //               {error}
    //             </p>
    //           )}

    //           {/* Verify Button */}
    //           <button
    //             type="submit"
    //             className="mt-9 h-[68px] w-full rounded-[20px] bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-extrabold text-white shadow-lg shadow-violet-200 transition hover:scale-[1.01] hover:shadow-xl"
    //           >
    //             Verify Email
    //           </button>
    //         </form>

    //         {/* Resend */}
    //         <div className="mt-8 text-center text-base font-medium text-slate-500">
    //           Didn't receive the code?{" "}
    //           <button
    //             type="button"
    //             onClick={handleResend}
    //             className="font-extrabold text-indigo-600 hover:underline"
    //           >
    //             Resend OTP
    //           </button>
    //         </div>

    //         {resent && (
    //           <p className="mt-3 text-center text-sm text-green-600">
    //             Demo code is still 123456.
    //           </p>
    //         )}

    //         {/* Back */}
    //         <div className="mt-8 flex justify-center">
    //           <Link
    //             href="/signup"
    //             className="flex items-center gap-2 font-bold text-indigo-600 transition hover:gap-3"
    //           >
    //             <FiChevronLeft className="text-xl" />
    //             Back to Sign Up
    //           </Link>
    //         </div>
    //       </>
    //     )}

    //     {success && (
    //       <button
    //         onClick={() => router.push("/")}
    //         className="mt-9 h-[68px] w-full rounded-[20px] bg-gradient-to-r from-blue-600 to-violet-600 text-lg font-extrabold text-white shadow-lg"
    //       >
    //         Continue
    //       </button>
    //     )}
    //   </section>

    //   {/* Footer */}
    //   <p className="mt-7 text-center text-sm font-medium text-slate-400">
    //     CodeBridge Gaza — Secure Account Verification
    //   </p>

    // </main>