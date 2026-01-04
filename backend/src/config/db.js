import mongoose from "mongoose"

export  const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb+srv://prathamkpsagar_db_user:kXArS7zREaCzK8IU@cluster0.uivwbdk.mongodb.net/notes_db?appName=Cluster0");
        console.log("MONGODB CONNECTED SUCCESSFULLY");
    }
    catch(error){
        console.error("Error connecting MongoDB", error);
        process.exit(1) //1 means exit with failure     
    }
} 