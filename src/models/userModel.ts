import { verify } from "crypto";
import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"please provide a username"],
        unique:true,
    },
    email:{
        type: String,
        required:[true,"please provide an Email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"please provide password"]
    },
    isVerfied:{
        type:Boolean,
        default:false,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenexpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,

})

const User=mongoose.models.users || mongoose.model("users" , userSchema);

export default User;