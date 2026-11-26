import {getTokenFun} from "@/utilities/getTokenFun";

export async function getUserProfile(){
    const token = getTokenFun()
    
    
const data = await fetch(`${process.env.API}profile/me` , {
    headers:{
        Authorization:token, 
        'Content-type':'application/json'
    }
})
const payload = await data.json()
return payload
}