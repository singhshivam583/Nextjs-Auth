import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';


dbConnect()

export async function POST(req:NextRequest, res: NextResponse){
    try {
        const reqBody = await req.json()
        const { password, confirmPassword, token } = reqBody;

        if (!password || !confirmPassword){
            return NextResponse.json({Message:"Password doesn't match"},{status:401}); 
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt);

        const user = await User.findOne({forgotPasswordToken:token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({Message:'Invalid Token'},{status:401}); 
        }
        console.log(user);

        user.password = hashedPassword;
        user.forgotPasswordToken=undefined;
        user.forgotPasswordTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({Message:"Password Changed Successfully Successfully", success:true}, {status:200})

    } catch (error: any) {
        return NextResponse.json({Error: error.message}, {status: 500})     
    }
}