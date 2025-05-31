import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';
import React from 'react';
import crypto from "crypto"


export const sendEmail=async({email , emailType,userId}: any)=>{
    
    //create hashed token
    try {
      const token = crypto.randomBytes(20).toString('hex');
      const hashedToken = await bcryptjs.hash(token, 10);

      if (emailType === "VERIFY") {
        
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 3600000,
        });
      } else if (emailType === "RESET") {
       
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenexpiry: Date.now() + 3600000,
        });
      }
      // Looking to send emails in production? Check out our Email API/SMTP product!
      var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.MAILTRAP_USER, // Ensure these are in .env
        pass: process.env.MAILTRAP_PASS,
        },
      });
      
      
      const mailOption={
        from: 'st827906@gmail.com',
        to:email,
        subject: emailType==="VERIFY" ? "verify your email":"Reset Your password",
        html: `<p>Click <a href="${hashedToken}">here</a> to ${emailType==="VERIFY" ? "verify your email":"reset your password"} or copy and paste the link below in your browser .<br>${process.env.DOMAIN}/${emailType=="VERIFY" ? "verifyemail":"changepass"}?token=${token}&email=${encodeURIComponent(email)}</p>`
      }
      const mailresponse=await transport.sendMail(mailOption);
      console.log("completed tell there");

      return mailresponse;
      
    } catch (error: any) {
      throw new Error(error.message);
    }
}