
import React from 'react'

export default function AuthSide() {
  return (
     <div className="relative hidden min-h-screen flex-1 items-center justify-center overflow-hidden bg-[#eef2ff] lg:flex">
      <div className="absolute left-20 top-28 h-8 w-8 rounded-full bg-blue-400 shadow-xl shadow-blue-300/60" />

      <div className="absolute right-28 top-20 h-16 w-16 rotate-12 rounded-2xl border-[10px] border-blue-500 shadow-xl shadow-blue-300/60" />

      <div className="absolute bottom-44 left-28 h-14 w-14 rotate-[-12deg] rounded-2xl border-[10px] border-violet-500 shadow-xl shadow-violet-300/60" />

      <div className="absolute right-20 top-[330px] h-24 w-24 rounded-full border-[9px] border-blue-400" />

      <div className="absolute right-1/2 translate-x-1/2 top-60 h-72 w-72 rounded-full bg-gradient-to-br from-blue-500 to-violet-700 shadow-2xl shadow-violet-400/50">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-28 w-28 items-center justify-center rounded-full border-[10px] border-white">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-[8px] border-white">
              <div className="h-7 w-7 rounded-full bg-white" />
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-30 text-center">
        <h2 className="text-3xl font-extrabold text-slate-900">
          Welcome Back!
        </h2>

        <p className="mt-4 text-lg font-medium text-slate-500">
          Continue your career development journey
        </p>
      </div>
    </div>
  );
  
}
