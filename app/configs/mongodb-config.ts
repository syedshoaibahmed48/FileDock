import mongoose from "mongoose";

export async function connectToMongoDB(){
    try {
        mongoose.connect(process.env.MongoDBConnectionStr!);
        const connection = mongoose.connection;
        connection.on('connected', ()=>{
            console.log('Successfully connected to MongoDB Database');
        })
        connection.on('error', (error)=>{
            console.error("MongoDB connection error", error);
        })
    } catch (error) {
        console.error("Couldnt connect to MongoDB", error);
    }
}