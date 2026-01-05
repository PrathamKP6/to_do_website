import mongoose from "mongoose";

//defining the schema 
const noteSchema = new mongoose.Schema(
    {
    title:{
        type: String, 
        required: true
    },
    content:{
         type: String,
         required: true
    }
    },
    {timestamps : true} //createdAt, updatedAt
);

//create a Note model based on noteSchema schema
const Note = mongoose.model("Note", noteSchema)

export default Note