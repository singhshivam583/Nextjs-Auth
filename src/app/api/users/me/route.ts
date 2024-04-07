import { dbConnect } from "@/dbConnect/dbConnect";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';
import { getDataFromToken } from '@/helpers/getDataFromtoken';

dbConnect();

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const userId = getDataFromToken(req);
        const user = await User.findById(userId).select(["-password"])
        if(!user){
            return NextResponse.json({Message:"Invalid Token"}, {status:400})
        }

        return NextResponse.json({Message:"Fetched Successfully", Data:user}, {status:200});

    } catch (error:any) {
        return NextResponse.json({Error: error.message},{status: 500})
    }
}

