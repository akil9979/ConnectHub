
import { io } from "socket.io-client";

const SOCKET_URL = "https://connecthub-backend-web.onrender.com";


const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: true,
});

export default socket;
