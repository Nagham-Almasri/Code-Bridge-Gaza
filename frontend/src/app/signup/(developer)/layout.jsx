import React from 'react'


import SignUpShell from '../../_Components/SignUpShell/SignUpShell';

import { SignupProvider } from '../_context/SignupContext';




export default function layout({children}) {
  return (
 <>
 <SignupProvider>
     
   <SignUpShell>{children}</SignUpShell>
   </SignupProvider></>
  )
}
