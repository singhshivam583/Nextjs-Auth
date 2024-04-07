import { dbConnect } from "@/dbConnect/dbConnect";
import { getDataFromToken } from "@/helpers/getDataFromtoken";
import User from "@/models/user.model";
import { NextRequest, NextResponse } from 'next/server';

dbConnect();

export async function GET(req:NextRequest, res:NextResponse){
    try {
        const userId = getDataFromToken(req);
        const user = await User.findById(userId).select(["-password"])
        if(!user){
            return NextResponse.json({Message:"Invalid Token"}, {status:400})
        }
        
        const response = NextResponse.json({message:"User Logout Successfully", success:true},{status:200});
        response.cookies.delete("accessToken")
        return response;

    } catch (error:any){
        return NextResponse.json({Error: error.message},{status: 500})
    }
}