import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function GET(request){
   const token = await getToken({ 
    req: request,
    secret: process.env.NEXTAUTH_SECRET,})
   
    console.log('tokeen', token);
    
   if (!token?.accessToken) {
    return NextResponse.json(
      { message: "Please login first" },
      { status: 401 }
    );
  }
  
  

   const data = await fetch(`${process.env.API}courses/me/enrollments` , {
    headers:{
        Authorization:`USER ${token.accessToken}`, 
    }
})
console.log(data, 'daataa');

const payload = await data.json()
console.log(payload, 'payload');

if(!data?.ok){
  return NextResponse.json(payload, {
    status: data.status,
  });
}



return NextResponse.json(payload);

}