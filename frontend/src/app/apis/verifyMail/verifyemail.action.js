'use server'


export async function verifyEmailFn(formData){
 try {
    console.log('form data', formData);
    
 
  const data = await fetch(`${process?.env?.API}auth/verify-email`, {
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
  throw new Error(error?.message)
  }
}


