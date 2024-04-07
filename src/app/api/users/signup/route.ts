
import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mail.helper";


// localhost:3001/api/users/signup

dbConnect()

export async function POST(req: NextRequest, res: NextResponse){
    try {

        const reqBody = await req.json()
        const {username, email, password} = reqBody;
        // console.log(reqBody);

        //  validation 

        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({Message: "User already exists"}, {status:400});
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        // console.log(savedUser);

        // send verification email
        const mailResponse = await sendEmail({email, emailType: "VERIFY", userId: savedUser._id})
        if(!mailResponse){
            return NextResponse.json({Message:"mail doesn't send"},{status:400})
        }

        return NextResponse.json({
            message: "User Registered Successfully", 
            success:true,
            savedUser,
            // mailResponse
        },{ status:201 });

        
    } catch (error: any) {
        return NextResponse.json({error: error.message},{status: 500}) 
    }
}




