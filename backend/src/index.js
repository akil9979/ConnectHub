import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./DB/connectdb.js";
import http  from "http";  
import { Server } from "socket.io";    
import cors from "cors";
dotenv.config({});
const server = http.createServer(app); 
export const io = new Server(server, {
  cors: {
    origin: [
      "http://localhost:5173",
      "https://connecthub-frontend-006.onrender.com",
      "https://connecthub-frontend-0016.onrender.com"
    ],
    methods: ["GET", "POST"],
    credentials: true
  },
  allowEIO3: true // ← add this
});
export const userSocketMap=new Map()
io.on("connection", (socket) => {
    let currentUserId = null;
    socket.on("register", (userId) => {
        if (userId) {
            currentUserId = userId.toString();
            userSocketMap.set(currentUserId, socket.id);
        }
    });

    socket.on("disconnect", () => {
        if (currentUserId && userSocketMap.get(currentUserId) === socket.id) {
            userSocketMap.delete(currentUserId);
        }
    });
});
connectDB()
.then(()=>{
    server.listen(process.env.PORT, () => {
        console.log("Server is running on port 8000");
    })
}
)
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})
