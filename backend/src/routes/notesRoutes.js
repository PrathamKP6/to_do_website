import express from "express";
import { createANotes, deleteANote, getAllNotes, getNoteById, updateANote } from "../controllers/notesController.js";
import authenticateUser from "../middleware/authMiddleware.js";
import userRateLimiter from "../middleware/userRateLimiter.js";

const router= express.Router();

router.use(authenticateUser);
router.use(userRateLimiter);

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createANotes);

router.put("/:id", updateANote);
 
router.delete("/:id", deleteANote);

export default router;

