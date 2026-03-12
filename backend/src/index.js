import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./DB/connectdb.js";
import http  from "http";  
import { Server } from "socket.io";                    
dotenv.config({});
const server = http.createServer(app); 
export const io= new Server(server,{
    cors:({
        origin: "http://localhost:5173",
        credentials: true,
    })
})
export const userSocketMap=new Map()
io.on("connection",(socket)=>{
    
    socket.on("register",(userId)=>{
        userSocketMap.set(userId,socket.id)
        console.log(userSocketMap);
        
    })
    socket.on("disconnect",()=>{})

})
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