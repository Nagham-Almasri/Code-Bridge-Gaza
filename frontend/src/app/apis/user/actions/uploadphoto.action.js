
"use server";

import { getTokenFun } from "@/utilities/getTokenFun";


export async function uploadPhotoFn(formData) {
    const token = await getTokenFun()
  try {
    console.log('token', token);
    

    const data = await fetch(`${process.env.API}profile/me/photo`, {
      method: "POST",
      headers: {
        Authorization:`USER ${token}` ,
      },
      body: formData,
    });

    const payload = await data.json();

    if (!data.ok) {
      throw new Error(payload.message || "Upload failed");
    }
console.log('payload',payload);

    return payload;

  } catch (error) {
    throw new Error(error.message || "Something went wrong");
  }
}
