require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import all routes
const itemRoutes = require("./routes/itemroute");
const orderRoutes = require("./routes/dorderRoutes");
const vendorRoutes = require("./routes/dvendorroute");
const feedbackRoutes = require("./routes/dfeedbackroute");

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Your frontend URL
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204
}));

// Middleware
app.use(express.json());

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({ 
    status: "OK",
    message: "Server is up and running!",
    timestamp: new Date().toISOString()
  });
});

// API Routes (maintaining your exact paths)
app.use("/items", itemRoutes);
app.use("/dorders", orderRoutes);
app.use("/dvendors", vendorRoutes);
app.use("/api/dfeedbacks", feedbackRoutes);

// MongoDB Connection
const MONGO_URI = process.env.MONGODB_URI || "mongodb+srv://dasuniuthpala2002:mBcoj9vTzxjsVuGm@cluster0.y6utk.mongodb.net/";

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  retryWrites: true,
  w: "majority"
})
.then(() => {
  console.log("Successfully connected to MongoDB");
  
  // Start server after successful DB connection
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log("Available endpoints:");
    console.log(`- Items: http://localhost:${PORT}/items`);
    console.log(`- Orders: http://localhost:${PORT}/dorders`);
    console.log(`- Vendors: http://localhost:${PORT}/dvendors`);
    console.log(`- Feedbacks: http://localhost:${PORT}/api/dfeedbacks`);
  });
})
.catch(err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
});

// Handle 404 - Route not found
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    path: req.originalUrl,
    availableEndpoints: {
      items: "/items",
      orders: "/dorders",
      vendors: "/dvendors",
      feedbacks: "/api/dfeedbacks"
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});