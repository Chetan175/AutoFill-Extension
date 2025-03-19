const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/user"); // Import User model
const parseResumeRoute = require("./routes/parseResume");
const userRoute = require("./routes/user");

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files (important for dashboard.html)
app.use(express.static(path.join(__dirname, "../frontend/public")));

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/user")
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Routes
app.use("/user", userRoute);
app.use("/api", parseResumeRoute);

// GET / - Fetch all parsed resumes of all users
app.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId).select("parsedResume");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      userName: user.name,
      email: user.email,
      phone: user.phone,
      linkedIn: user.linkedIn,
      github: user.linkedIn,
      skills: user.linkedIn,
      workExperience: user.workExperience,
      education: user.education,
      parsedResume: user.parsedResume,
    }); // JSON data for AJAX fetch in dashboard.html
  } catch (error) {
    res.status(500).json({ message: "Error fetching parsed resume", error });
  }
});

// Route to render dashboard.html
app.get("/dashboard", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/public/dashboard.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
