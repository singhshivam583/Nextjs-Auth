import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromtoken';
import { sendEmail } from "@/helpers/mail.helper";

dbConnect();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userId = getDataFromToken(req);
        const user = await User.findById(userId).select(["-password"])
        if(!user){
            return NextResponse.json({Message:"Invalid Token"}, {status:400})
        }

        return NextResponse.json({Message:"Fetched Successfully", Data:user, success:true}, {status:200});

    } catch (error:any) {
        return NextResponse.json({Error: error.message},{status: 500})
    }
}

