import express from "express";
import multer from "multer";
import rateLimit from "express-rate-limit";
import { uploadFile, getFiles } from "../controllers/fileController.js";

const router = express.Router();

// ✅ Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname)
});
const upload = multer({ storage });

// ✅ Apply a specific rate limit for uploads (e.g., 5 uploads per minute)
const uploadLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: {
    message: "⚠️ Upload limit reached, please wait a minute before retrying."
  }
});

// ✅ Routes
router.post("/upload", uploadLimiter, upload.single("file"), uploadFile);
router.get("/", getFiles);

export default router;
