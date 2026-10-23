import React from 'react'

import SignUpShell from '../_Components/SignUpShell/SignUpShell';


export default function layout({children}) {
  return (
 <>
   <SignUpShell>{children}</SignUpShell></>
  )
}

// function StepItem({ number, label, active = false }) {
//   return (
// <>
//     <div className="flex flex-col items-center">
//       <div
//         className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-extrabold shadow-sm ${
//           active
//             ? "bg-gradient-to-br from-blue-500 to-violet-600 text-white"
//             : "bg-slate-100 text-slate-400"
//         }`}
//       >
//         {number}
//       </div>

//       <span
//         className={`mt-2 text-xs font-semibold ${
//           active ? "text-violet-600" : "text-slate-400"
//         }`}
//       >
//         {label}
//       </span>
//     </div>
// </>
//   );
// }

// function StepLine() {
//   return <div className="mt-4 h-px flex-1 bg-slate-200" />;
// }