export function getAllNotes (req, res){
    res.send("<h1>You have fetched the notes</h1>");
}

export function createANotes (req, res){
     res.status(201).json({message:"Note created successfully"})
}

export function updateANote(req, res){
    res.status(200).json({message:"Note updated successfully"})
}

export function deleteANote(req, res){
    res.status(200).json({message:"Note deleted successfully"})
}
