const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const SpecialOffersRoutes = require("./routes/SpecialOffersRoutes");
const BlogsRoutes = require("./routes/BlogsRoutes");
const FeaturedDestinationRoutes = require("./routes/FeaturedDestinationRoutes");
const AdminRoutes = require("./routes/adminRoutes");
const IsExisted = require("./middlewares/IsExisted");

dotenv.config(); // Load environment variables from .env file

const app = express();

app.use(express.json()); // Middleware for processing JSON requests
app.use(cors()); // Middleware for enabling Cross-Origin Resource Sharing

// Default route to display a simple HTML response
app.get("/", (_, res) => {
  res.set("Content-Type", "text/html; charset=UTF-8");
  res.send("<h1>Домашняя страница!</h1>");
});

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });

// Serve uploaded files statically
app.use("/api/uploads", express.static(path.join(__dirname, "uploads")));

// Upload new images
app.post("/api/upload", IsExisted, upload.array("images"), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No images uploaded!" });
  }
  const uploadedImages = req.files.map(
    // (file) => `http://localhost:4800/api/uploads/${file.filename}`
    (file) =>
      `https://travel-backend-4uug.onrender.com/api/uploads/${file.filename}`
  );
  res
    .status(200)
    .json({ message: "Successfully uploaded!", images: uploadedImages });
});

// Register routes for special offers, blogs, and featured destinations
app.use("/api/specialOffers", SpecialOffersRoutes);
app.use("/api/featuredDestinations", FeaturedDestinationRoutes);
app.use("/api/blogs", BlogsRoutes);
app.use("/api/admins", AdminRoutes);

const PORT = process.env.PORT || 4800; // Get port from environment variables or use default value 4800
const MONGODB_URI = process.env.MONGODB_URI; // Get MongoDB URI from environment variables

// Check if MongoDB URI is available in environment variables
if (!MONGODB_URI) {
  console.error("URI MongoDB не найден в переменных среды.");
  process.exit(1); // Terminate process with error code
}

// Start the application after connecting to MongoDB
const startApp = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }); // Connect to MongoDB using Mongoose
    app.listen(PORT, () => {
      console.log(`Приложение запущено на http://localhost:${PORT}`); // Log message indicating server startup
    });
  } catch (error) {
    console.error("Ошибка подключения к MongoDB: ", error); // Log MongoDB connection error
  }
};

startApp(); // Call startApp function to start the application
