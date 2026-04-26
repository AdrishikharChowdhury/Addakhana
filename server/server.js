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
  cors: { origin: "http://localhost:5173" },
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
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.static(path.join(import.meta.dirname, "../client/public")));

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