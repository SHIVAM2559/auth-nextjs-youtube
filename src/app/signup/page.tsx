"use client"

import React from "react";
import  {useEffect}  from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";


export default function signup(){
    const router=useRouter();
    const [user,setuser]=React.useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled,setButtonSiabled]=React.useState(false);
    const [loading , setLoading]=React.useState(false);

    const onSignup=async()=>{
        try {
            setLoading(true);
            console.log("calling for signup");
            
            const response = await axios.post("/api/users/signup" , user);
            console.log("signUp sucess" , response.data);
            

            router.push("/login");
        } catch (error: any) {
            console.log("Signup failed" , error.message);

            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }
    

    useEffect(() =>{
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonSiabled(false);
        }
        else{
            setButtonSiabled(true);
        }
    } , [user])

    return (
        <div className="flex flex-col justify-start items-center h-screen bg-black">
            <h1 className="text-7xl pb-9 text-white"  >{loading ? "Processing" : "SignUp"}</h1>
            <hr />
           <div className="flex flex-col justify-center items-center h-screen bg-gray-300 border-4 rounded-3xl mb-25">
           <label htmlFor="username">username</label>
            <input 
            className="border-amber-800 border-2 rounded-2xl pr-7 pl-15 m-10 "
            type="text"
            id="usename"
            value={user.username}
            onChange={(e)=> setuser({...user,username:e.target.value})}
            placeholder="username"
             />
             <label htmlFor="email">email</label>
            <input 
            className="border-amber-800 border-2 rounded-2xl pr-7 pl-15 m-10 "
            type="text"
            id="email"
            value={user.email}
            onChange={(e)=> setuser({...user,email:e.target.value})}
            placeholder="email"
             />
             <label htmlFor="password">password</label>
            <input 
            className="border-amber-800 border-2 rounded-2xl pr-7 pl-15 m-10 "
            type="text"
            id="password"
            value={user.password}
            onChange={(e)=> setuser({...user,password:e.target.value})}
            placeholder="password"
             />
            
             <button onClick={onSignup} className="border-2 m-4 rounded-2xl pr-4 pl-4"  >{buttonDisabled ? "no-signup" : "Signup"}</button>
             <Link href="/login">visit login</Link>
           </div>
        </div>
    )
}