"use server";


export async function handleSignup(formData) {
  try {
 
  const data = await fetch(`${process?.env?.API}auth/register`, {
    method:'POST', 
    body: JSON.stringify(formData), 
    headers: {
          "Content-Type": "application/json",
        }
  })
  const payload = await data.json()

if(payload?.success === true){
    return {
        success: true,
        email: payload?.results.user.email,
        message : payload?.results?.message
      };
    }
    else if (payload?.statusCode == 409){
        return false;
    }

  } catch (error) {
  toast.error(error?.message)
  }
}