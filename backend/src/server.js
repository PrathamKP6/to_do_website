import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from "./config/db.js";
import dotenv from "dotenv"
import rateLimiter from "./middleware/ratelimiter.js";

dotenv.config()
const app= express();

const port= process.env.PORT || 5001;



app.use(express.json()) //middleware
app.use(rateLimiter)
app.use( (req, res, next)=>{
    console.log(`Req method is ${req.method} and request url is ${req.url}`);
    next();
});
app.use("/api/notes", notesRoutes)

connectDB().then( () => {
    app.listen(port, ()=>{
        console.log("Server listening on port ", port)
    });
})
// mongodb+srv://prathamkpsagar_db_user:kXArS7zREaCzK8IU@cluster0.uivwbdk.mongodb.net/?appName=Cluster0