
import mongoose from "mongoose";
import dotEnv from 'dotenv'
dotEnv.config()
export const connectDB = async()=>{
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kpsyb7k.mongodb.net/?retryWrites=true&w=majority&appName=${process.env.APP_NAME}`
    try{
await mongoose.connect(uri,{ dbName: "cloty"});
console.log("connect to mongoDB")
    }catch(err){
        console.log(`Error connecting to Database`)
    }
}

