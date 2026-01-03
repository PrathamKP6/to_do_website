import express from "express"

const app= express();
const port= 5001;

app.get("/api/notes", (req,res)=>{
    res.send("<h1>You have not created any notes yet</h1>");
})
app.listen(port, ()=>{
    console.log(`Server listening on port ${port}`)
});