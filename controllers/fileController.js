import File from "../models/fileModel.js";

// Upload handler
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const file = await File.create({
      filename: req.file.filename,
      path: req.file.path,
      mimetype: req.file.mimetype,
      size: req.file.size
    });

    res.status(201).json({
      message: "✅ File uploaded successfully",
      file
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};

// Get all uploaded files
export const getFiles = async (req, res) => {
  try {
    const files = await File.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "❌ Server error", error: error.message });
  }
};
