import express from "express";
import cors from "cors";
import "dotenv/config";

import authRoutes from "./routes/auth.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import influencerRoutes from "./routes/influencer.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import bookingRoutes from "./routes/booking.routes.js";
import chatRoutes from "./routes/chat.routes.js";

const app = express();

// CORS Configuration with Wildcard Support
const allowedOrigins = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(origin => origin.trim())
  : ["http://localhost:3000", "http://localhost:5173"];

// Add wildcard patterns for vercel.app domain
const corsPatterns = [
  /^https:\/\/.*\.vercel\.app$/,  // Allow all *.vercel.app subdomains
  /^http:\/\/localhost:\d+$/,      // Allow localhost with any port
];

const corsOptions = {
  origin: function (origin, callback) {
    // Allow no origin (mobile apps, curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check exact match in allowed origins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    // Check pattern match
    if (corsPatterns.some(pattern => pattern.test(origin))) {
      return callback(null, true);
    }

    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  maxAge: 86400, // 24 hours
};

app.use(cors(corsOptions));
app.use(express.json());

// Explicitly handle OPTIONS requests for CORS preflight
app.options("*", cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/influencer", influencerRoutes);
app.use("/api/influencers", influencerRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/chats", chatRoutes);


export default app;
