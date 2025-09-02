import mongoose from "mongoose";
require('dotenv').config();

const dbUrl:string = "mongodb+srv://Shahzadali:Rbv3SSWepe9YxGTe@lms.gkk3gaq.mongodb.net/LMS?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
    try {
        await mongoose.connect(dbUrl).then((data:any) => {
            console.log(`database connected with ${data.connection.host}`);
            
        })
    } catch (error:any) {
        console.log(error.message);
        setTimeout(connectDB, 4000)       
    }
}

export default connectDB;