import { NextRequest } from "next/server";
import { headers } from 'next/headers';
import jwt from "jsonwebtoken";

export const getDataFromToken = (req:NextRequest) => {
    try {
        // Get token from cookie.
        const token = req?.cookies?.get("accessToken")?.value.toString();
        if(typeof token !== "string" || !token){
            throw new Error("Token Not Found")
        }

        const decodedToken: any = jwt.verify(token as string, process.env.ACCESS_TOKEN_SECRET as string)
        return decodedToken.id

    } catch (error:any){
        throw new Error(error.message);
    }
}
