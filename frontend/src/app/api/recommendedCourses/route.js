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
  
  

   const data = await fetch(`${process.env.API}courses/recommended?limit=10` , {
    headers:{
        Authorization:`USER ${token.accessToken}`, 
    }
})
const payload = await data.json()
if(!data?.ok){
  return NextResponse.json(payload, {
    status: data.status,
  });
}
console.log('payload' , payload);


return NextResponse.json(payload);

}