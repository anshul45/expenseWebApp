import mongoose from "mongoose";


export const conn = () => mongoose.connect(process.env.MONGO)
.then(()=> console.log("Mongo Connected Sucessfully"))
.catch((error)=> console.log("Error connecting mongo_server" + error.message));