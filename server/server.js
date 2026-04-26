import express from "express";
import "dotenv/config";
import cors from "cors";
import http from "http";
import cookieParser from "cookie-parser";
import dbgr from "debug";
import { connectDB } from "./lib/db.js";
import userRouter from "./routes/userRoutes.js";
import path from "path";
import messageRouter from "./routes/messageRoutes.js";
import { Server } from "socket.io";
const log = dbgr("development:server");

const app = express();

const server = http.createServer(app);

export const io = new Server(server, {
  cors: { 
    origin: "*",
    methods: ["GET", "POST"],
    credentials: true
  },
});

export const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  log(`User Connected ${userId}`);
  if (userId) userSocketMap[userId] = socket.id;
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    log(`User Disconnected ${userId}`);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

app.use(express.json({ limit: "4mb" }));

const corsOptions = {
  origin: function(origin, callback) {
    // Allow requests with no origin (mobile apps, curl, Postman)
    if (!origin) return callback(null, true);
    
    // Allow specific domains (without trailing slash)
    const allowedOrigins = [
      "https://addakhana-pied.vercel.app",
      "https://addakhana-frontend.vercel.app",
      "http://localhost:5173",
      "http://localhost:3000"
    ];
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      // For Vercel preview deployments or other origins, check if it contains vercel.app
      if (origin && origin.includes('vercel.app')) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "public")));

app.use("/api/status", (req, res) => {
  res.send("Server is Live");
});

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

await connectDB();

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;

  server.listen(PORT, () => {
    log(`Server is running on PORT: ${PORT}`);
  });
}

export default server