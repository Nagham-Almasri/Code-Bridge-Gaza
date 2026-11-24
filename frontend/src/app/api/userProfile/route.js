import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request){
   const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,})
   
    
   if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Please login first" },
      { status: 401 }
    );
  }
  console.log(token?.accessToken);
  

   const data = await fetch(`${process.env.API}profile/me` , {
    headers:{
        Authorization:`USER ${token.accessToken}`, 
        'Content-type':'application/json'
    }
})
const payload = await data.json()
console.log(payload,'payload');

return NextResponse.json(payload);

}