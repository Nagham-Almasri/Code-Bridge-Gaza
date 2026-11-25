import { getToken } from "next-auth/jwt";
import {  NextResponse } from "next/server";

export async function proxy(req){
  

    const token = await getToken({req})
    if(!!token){
        return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login',req.url))
    
}
export const config = {matcher:['/profile','/dashboard','/forgetpassword','/jobs','/courses','/setting', '/cv-generator','ai-assistant']}