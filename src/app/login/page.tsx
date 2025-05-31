"use client"
import React from "react";
import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";

export default function login(){
    const router=useRouter();
    const [user,setuser]=React.useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled , setButtonSiabled]=React.useState(false);
    const [loading , setLoading]=React.useState(false);

    const onlogin=async()=>{
       try {
        setLoading(true);
        console.log("still working");
        
       const response= await axios.post("/api/users/login",user);

       console.log("login success" );
       toast.success("Login success");
       const name=user.username;
       console.log(name);
       
       router.push(`/Profile`);
       


       } catch (error: any) {
        console.log("login failed" , error.message);
        toast.error(error.message);
        
       }finally{
        setLoading(false);
       }
    }
    useEffect(()=>{
        if(user.email.length>0 && user.email.length>0 && user.password.length>0){
            setButtonSiabled(false);
        }
        else{
            setButtonSiabled(true);
        }
    },[user])

    return (
        <div className="flex flex-col justify-start items-center h-screen bg-black">
            <h1 className="text-7xl pb-9 text-white"  >{loading ? "Processing":"Login"}</h1>
            <hr />
           <div className="flex flex-col justify-center items-center h-screen bg-gray-300 border-4 rounded-3xl mb-25">
           <label htmlFor="Email">Email</label>
            <input 
            className="border-amber-800 border-2 rounded-2xl pr-7 pl-15 m-10 "
            type="text"
            id="Email"
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
            
             <button onClick={onlogin} className="border-2 m-4 rounded-2xl pr-4 pl-4"  >{buttonDisabled ? "No-Login":"Login"}</button>
             <Link href="/signup">visit Signup Page</Link>
           </div>
        </div>
    )
}