
import mongoose from "mongoose";

// export async function dbConnect(){
//     try {
//         mongoose.connect(process.env.MONGODB_URI! as string)
//         const connection =  mongoose.connection;

//         connection.on('connected', () => {
//             console.log('MongoDB Connected');
//         })
        
//         connection.on('error', (error) => {
//             console.log('MongoDB Connection error: ' + error);
//             process.exit();
//         })

//     } catch (error) {
//         console.log("Something went wrong while connecting DB !");
//         console.log(error);
//     }
// }


let isConnected: boolean;

export async function dbConnect(){
    try {
        // If already connected, return early
        if (isConnected) {
            console.log('Already connected to MongoDB');
            return;
        }
        
        // Attempt to establish connection
        await mongoose.connect(process.env.MONGODB_URI! as string);
        const connection = mongoose.connection;

        // Handle connection events
        connection.on('connected', () => {
            console.log('MongoDB Connected');
            isConnected = true;
        });
        
        // Handle connection errors
        connection.on('error', (error) => {
            console.log('MongoDB Connection error: ' + error);
            process.exit(1);
        });

    } catch (error) {
        // Handle connection errors during initial connection
        console.log("Error occurred while establishing DB connection.");
        console.log(error);
        process.exit(1);
    }
}