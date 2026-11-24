'use client'
import { verifyEmailFn } from '@/app/apis/verifyMail/verifyemail.action'
import { useMutation } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { FiMail } from 'react-icons/fi'


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
