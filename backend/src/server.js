import express from "express"
import notesRoutes from "./routes/notesRoutes.js"
const app= express();

const port= 5001;

app.use("/api/notes", notesRoutes)
 
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});