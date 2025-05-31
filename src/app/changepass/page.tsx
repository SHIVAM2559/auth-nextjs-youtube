"use client"

import React, { useState } from "react";
import  {useEffect}  from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function changepass(){
    const router=useRouter();
     const searchParams = useSearchParams();
    const token = searchParams.get("token"); 
    const email=searchParams.get("email");
    const [newPass , setNewPass]=React.useState("");
    const [conPass , setConPass]=React.useState("");
    const [buttonDisabled , setButtonDisabled]=React.useState(true);


    const onsubmit=async()=>{
       try {
        console.log(token);
        console.log(newPass);
        await axios.post("/api/users/changepass",{email,token,newPass});
        console.log("password chnaged");
        router.push("/login");
        
        
       } catch (error:any) {
        console.log("change passwword failed");
        
        toast.error(error.message);
       }
        
    }

   useEffect(() => {
        if (newPass.length > 0 && newPass === conPass) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [newPass, conPass]);

    return (
         <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="rounded-3xl flex flex-col bg-amber-200 p-8 w-full max-w-md">
                <h1 className="text-4xl  " >Chnage password</h1>
                <label className="mt-9" htmlFor="Password">New Password: </label>
                <input 
                type="text"
                placeholder="Type NewPass..."
                className="border-amber-800 border-2 rounded-2xl  m-1 "
                onChange={(e)=> setNewPass(e.target.value)}
                 />
                <label className="mt-9" htmlFor="Password">Confirm Password: </label>
                <input 
                type="text"
                placeholder="Type confirmPass..."
                className="border-amber-800 border-2 rounded-2xl  m-1 "
                onChange={(e)=> setConPass(e.target.value)}
                 />
                 
                 <button onClick={onsubmit} className="border-2 ml-30 mr-30 rounded-2xl mt-10">{buttonDisabled ? "No-submit":"Submit"}</button>
            </div>
        </div>
    )
}