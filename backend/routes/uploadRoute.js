const express = require("express");
const multer = require("multer");
const path = require("path");
const jobQueue = require("../config/redis");

const router = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

router.post("/", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Respond to client once
    res.status(200).json({
      message: "File uploaded successfully",
      filename: req.file.filename,
      path: req.file.path,
    });

    // Run job in background
    await jobQueue.add({ filePath: req.file.path });
  } catch (err) {
    console.error("Upload error:", err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Processing failed" });
    }
  }
});

module.exports = router;
