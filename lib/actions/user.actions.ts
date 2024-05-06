'use server'

import { ID } from "node-appwrite"
import { createAdminClient,createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async(data:{email:string,password:string})=>{
  try {

    
  } catch (error) {
    console.error("Error",error)
  }
}

export const signUp = async(data:SignUpParams)=>{
  try {
    const {account} = await createAdminClient()
  const newUserAccount =  await account.create(ID.unique(),data.email,data.password,`${data.firstName} ${data.lastName}`)
    const session = await account.createEmailPasswordSession(data.email,data.password)
    cookies().set("appwrite-session",session.secret,{
      path:"/",
      sameSite:"strict",
      secure:true,
      httpOnly:true
    })
    return parseStringify(newUserAccount)
  } catch (error) {
    console.error("Error",error)
  }
}

export async function getLoggedInUser(){
  try {
    const {account} = await createSessionClient()
    return await account.get()
  } catch (error) {
    console.error("Error",error)
  }
}