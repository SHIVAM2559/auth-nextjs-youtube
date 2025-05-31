import { connect } from "@/dbconfig/dbconfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { sendEmail } from "@/helper/mailer";

connect();

export async function POST(request: NextRequest){
    try {
        const reqBody=await request.json();
        const {email}=reqBody;
        console.log(email);

        const user=await User.findOne({email});
        if(!user){
            return NextResponse.json({error : "Invalid email"} , {status:400});
        }

        //check if user exist or not

        //now send mail to user and update data base
         await sendEmail({email,emailType: "RESET",userId : user._id})
         console.log("done");
         
         //done till 3rd point (i have sended email and and updated database as well with the token);  

         return NextResponse.json({message : "token set at database and sent to user as well"});
        
    } catch (error:any) {
        return NextResponse.json({error: error.message} ,{status: 500});
    }
}