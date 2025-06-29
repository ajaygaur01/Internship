const sharp = require("sharp");
const path = require("path");
const fs = require("fs");

const compressImage = async (req, res, next) => {
  try {
    if (!req.file) return next();

    const filename = `${Date.now()}.webp`;
    const outputPath = path.join(__dirname, "../images", filename);

    await sharp(req.file.buffer)
      .resize({ width: 800 }) // Optional resize
      .webp({ quality: 10 })  // Compress to webp
      .toFile(outputPath);

    // Replace file info so it can be used in controller
    req.compressedImageName = filename;
    next();
  } catch (err) {
    console.error("Image compression failed:", err);
    res.status(500).json({ message: "Image processing failed." });
  }
};

module.exports = compressImage;
