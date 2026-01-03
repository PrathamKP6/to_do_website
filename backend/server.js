import express from "express"

const app= express();
const port= 5001;

app.get("/api/notes", (req,res)=>{
    res.send("<h1>You have not created any notes yet</h1>");
})
app.post("/api/notes", (req, res) =>{
    res.status(201).json({message:"Note created successfully"})
})
app.put("/api/notes/:id", (req, res) => {
    res.status(200).json({message:"Note updated successfully"})
})  
app.delete("/api/notes", (req, res) => {
    res.status(200).json({message:"Note deleted successfully"})
})  
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});