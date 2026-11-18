import React from 'react'

<<<<<<< HEAD:frontend/src/app/signup/(developer)/layout.jsx
import SignUpShell from '../../_Components/SignUpShell/SignUpShell';
=======
import SignUpShell from '../_Components/SignUpShell/SignUpShell';
import { SignupProvider } from './_context/SignupContext';
>>>>>>> 8b00b306361db77fc8104e4626a7bccb09be7c6d:frontend/src/app/signup/layout.jsx


export default function layout({children}) {
  return (
 <>
 <SignupProvider>
   <SignUpShell>{children}</SignUpShell>
   </SignupProvider></>
  )
}
