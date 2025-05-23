"use client";
import axios from "axios";
import react,{ useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";




export default function profilePage(){
    const router=useRouter();
    const [data,setData]=useState("nothing");
    const logout=async ()=>{
     
    try {
        const res=await axios.get("/api/users/logout")

        
        toast.success("Logout successful");
        router.push("/login");

    } catch (error: any) {
        // console.log(error.message);

        toast.error(error.message);
        
    }
}
    const getUserDetail=async() => {
        const res=await axios.get("/api/users/me")
        console.log(res.data);
        setData(res.data.data._id);
        
    }

    return (
        <div className="flex justify-center bg-gray-200 items-center min-h-screen flex-col">
            <h1 className="text-8xl text-blue-300">Profile Page</h1>
            <h2 className="bg-green-800 rounded p-1">{data==="nothing" ? "Nothing": <Link href={'/Profile/${data}'} >{data}</Link>}</h2>
            <hr />
            {/* <p className="text-5xl ">Profile Page</p> */}
            <hr />
            <button onClick={logout} className="flex items-center bg-blue-600 rounded-4xl p-1.5 mt-4">Logout</button>
            <button onClick={getUserDetail} className="flex items-center bg-purple-600 rounded-4xl p-1.5 mt-4">GetUserDetail</button>
        </div>
    )
}