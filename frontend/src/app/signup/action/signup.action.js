"use server";



export async function handleSignup(formData) {
  try {

  const data = await fetch(`http://127.0.0.1:3000/auth/register`, {
    method:'POST', 
    body: JSON.stringify(formData), 
    headers: {
          "Content-Type": "application/json",
        }
  })
  const payload = await data.json()

if(payload?.success === true){
        return true
    }
    else if (payload?.statusCode == 409){
        return false;
    }

  } catch (error) {
  toast.error(error?.message)
  }
}