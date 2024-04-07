import jwt from 'jsonwebtoken';
import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs, { hash } from 'bcryptjs';
import { sendEmail } from "@/helpers/mail.helper";

dbConnect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const {email, password} = await req.json() 

        const user = await User.findOne({ email });
        if (!user){
            return NextResponse.json({Mesage: "User Doesn't exists"}, { status: 400 })
        }
        // console.log(user)

        const isPasswordCorrect = await bcryptjs.compare(password,user.password)
        // console.log(isPasswordCorrect)
        if(!isPasswordCorrect){
            return NextResponse.json({Message:"Invalid Password"},{status:400})
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email:user.email,
        }

        const accessToken = await jwt.sign(
            tokenData,
            process.env.ACCESS_TOKEN_SECRET as string ,
            {
                expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
            }
        )
        // console.log(accessToken)
        const Options ={
            httpOnly : true,
            secure:true
        }

        const response = NextResponse.json({
            Message:"User Logged In Successfully", 
            success:true
        },{status:200});
        response.cookies.set(
            "accessToken",
            accessToken,
            Options
        );
        return response

    } catch (error:any) {
        return NextResponse.json({Error: error.message},{status: 500})
    }
}
