import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helper/mailer";
import bcryptjs from "bcryptjs";

connect();

export async function POST(request: NextRequest){
    try {
       const reqBody=await request.json();
       const {email , token , newPass}=reqBody

       const user=await User.findOne({email});
       console.log("user not found");
       if(!user){
        console.log("user not found");
        
        return NextResponse.json({message: "email not exist"},{status: 400});
       }
       console.log(user.forgotPasswordToken);

       const isvalid=await bcryptjs.compare(token,user.forgotPasswordToken);
       const isTokenExpired = user.forgotPasswordTokenexpiry < new Date();

       console.log(isTokenExpired);
       

       if(isvalid && !isTokenExpired){
           //encrypth the password and then set in the data base
           console.log(newPass);
           
           const hashedPassword=await bcryptjs.hash(newPass,10);
           user.password=hashedPassword;
           user.forgotPasswordToken="";
           await user.save();
           return NextResponse.json({message:"password changed sussessfully"},{status:200});
       }
       else{
        console.log("user not ffound");
        return NextResponse.json({message: " not a valid token"},{status: 400});
       }
    } catch (error:any) {
        return NextResponse.json({error: error.message} , {status: 500});
    }
}