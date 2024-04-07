
import mongoose from "mongoose";

export async function dbConnect(){
    try {
        mongoose.connect(process.env.MONGODB_URI! as string)
        const connection =  mongoose.connection;

        connection.on('connected', () => {
            console.log('MongoDB Connected');
        })
        
        connection.on('error', (error) => {
            console.log('MongoDB Connection error: ' + error);
            process.exit();
        })

    } catch (error) {
        console.log("Something went wrong while connecting DB !");
        console.log(error);
    }
}