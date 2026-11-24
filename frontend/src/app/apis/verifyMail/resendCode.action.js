'use server'



export async function resendCodeFn(formData){
 try {
 
    
 
  const data = await fetch(`${process?.env?.API}auth/resend-otp`, {
    method:'POST', 
    body: JSON.stringify(formData), 
    headers: {
          "Content-type": "application/json",
        }
  })
  const payload = await data.json()
  console.log('payload', payload);
  

// if(payload?.success === true){
//         return true
//     }
//     else if (payload?.statusCode == 409){
//         return false;
//     }

  } catch (error) {
  console.log(error?.message)
  }
}


