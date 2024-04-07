import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromtoken';
import { sendEmail } from "@/helpers/mail.helper";

dbConnect();

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const userId = getDataFromToken(req);
        const user = await User.findById(userId).select(["-password"])
        if(!user){
            return NextResponse.json({Message:"Invalid Token"}, {status:400})
        }

        const mailResponse = await sendEmail({email:user.email, emailType:"RESET", userId:user._id})
        if(!mailResponse){
            return NextResponse.json({Message:"mail doesn't send for password reset"},{status:400})
        }

        return NextResponse.json({
            message: "Mail Sent Successfully for Password Change", 
            success:true,
            user,
            // mailResponse
        },{ status:201 });


    } catch (error:any) {
        return NextResponse.json({Error: error.message},{status: 500})
    }
}

