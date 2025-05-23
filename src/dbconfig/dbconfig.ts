import mongoose from "mongoose";

export  async function connect() {
    try {
        console.log("db connecting");
        
       await mongoose.connect(process.env.MONGO_URI!)
       console.log("mongo db connected");
       
        const connection=mongoose.connection
        connection.on('connected',()=>{
            console.log('Mongodb connected sucessfully');
            
        })


    } catch (error) {
        console.log('something went wrong');
        console.log(error);
    }
}