import mongoose from "mongoose";

export const conn = async (): Promise<void> => {
  const mongoURI = process.env.MONGO;
  
  if (!mongoURI) {
    console.error("MongoDB connection string is not defined in the environment variables.");
    process.exit(1);
  }

  mongoose.connect(process.env.MONGO ?? "")
  .then(()=> console.log("Mongo Connected Sucessfully"))
  .catch((error)=> console.log("Error connecting mongo_server" + error.message));
};
