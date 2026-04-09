
import { io } from "socket.io-client";

const SOCKET_URL = "https://connecthub-backend-wweb.onrender.com";


const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true,
  transports:["websocket","polling"]
});

export default socket;
