import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";
import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import myHotelRoutes from "./routes/my-hotels";
import hotelRoutes from "./routes/hotels";
import myBookingRoutes from "./routes/my-bookings";
import reviewRoutes from "./routes/reviews";
import subscriberRoutes from './routes/subscriberRoutes';
import unsubscribe from './routes/unsubscribe';

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// MongoDB Connection
mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const port = process.env.PORT || 7000;
const app = express();

// Middleware
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Middleware (Allow All Origins)
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins, including localhost or any other domain
    callback(null, true);
  },
  credentials: true  // Allows cookies to be sent with cross-origin requests
}));

// Serve static frontend files
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/my-bookings", myBookingRoutes);
app.use("/api/reviews", reviewRoutes);
app.use('/subscribe', subscriberRoutes);
app.use('/unsubscribe', unsubscribe);

// Catch-all route for frontend SPA (Single Page App) handling
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
