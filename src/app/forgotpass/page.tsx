"use client"

import React, { useState } from "react";
import  {useEffect}  from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";
import { Router } from "next/router";




export default function forgotpass(){
    const router=useRouter();
    const [buttonDisabled,setButtonSiabled]=React.useState(true);
    const [email,setEmail]=React.useState("");
    
    const Onsubmit=async()=>{
        try {
            await axios.post("/api/users/forgotpass" , {email});
            console.log("Mail Sent successfully");
            console.log("check your email to reset password");
            
            
        } catch (error: any) {
           toast.error(error.message);
            
        }
    }


    useEffect(()=>{
        if(email.length>0) setButtonSiabled(false);
        else setButtonSiabled(true);
    },[email])
    



    return(
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="rounded-3xl flex flex-col bg-amber-200 p-8 w-full max-w-md">
                <h1 className="text-4xl  " >forgot password</h1>
                <label className="mt-9" htmlFor="Email">Email: </label>
                <input 
                type="text"
                placeholder="Type email..."
                className="border-amber-800 border-2 rounded-2xl  m-1 "
                onChange={(e)=> setEmail(e.target.value)}
                 />
                 <button onClick={Onsubmit} className="border-2 ml-30 mr-30 rounded-2xl mt-10">{buttonDisabled ? "No-submit":"Submit"}</button>
            </div>
        </div>
    )
}