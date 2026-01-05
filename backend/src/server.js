import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"

dotenv.config()
const app= express();

const port= process.env.PORT || 5001;

connectDB();

app.use(express.json()) //middleware

app.use("/api/notes", notesRoutes)

app.listen(port, ()=>{
    console.log("Server listening on port ", port)
});

// mongodb+srv://prathamkpsagar_db_user:kXArS7zREaCzK8IU@cluster0.uivwbdk.mongodb.net/?appName=Cluster0