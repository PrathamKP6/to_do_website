import express from "express";
import { createANotes, deleteANote, getAllNotes, getNoteById, updateANote } from "../controllers/notesController.js";

const router= express.Router();


router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createANotes);

router.put("/:id", updateANote);
 
router.delete("/:id", deleteANote);

export default router;

