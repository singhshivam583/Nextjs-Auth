import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';

dbConnect()

export async function POST(req:NextRequest, res:NextResponse){
    try {
        const reqBody = await req.json()
        const { token } = reqBody;
        // console.log(token)

        const user = await User.findOne({verifyToken:token, verifyTokenExpiry: {$gt: Date.now()}})
        if(!user){
            return NextResponse.json({Message:'Invalid Token'},{status:401}); 
        }
        console.log(user);

        user.isVerified=true;
        user.verifyToken=undefined;
        user.verifyTokenExpiry=undefined;
        await user.save();

        return NextResponse.json({Message:"Email Verified Successfully", success:true}, {status:200})

    } catch (error: any) {
        return NextResponse.json({Error: error.message}, {status: 500})     
    }
}