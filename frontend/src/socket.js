import { io } from "socket.io-client";
import logger from "./utils/logger";

const SOCKET_URL = "https://connecthub-backend-wweb.onrender.com";

export const socket = io(SOCKET_URL, {
  withCredentials: true,
  autoConnect: false, // Do not connect automatically before authentication
  transports: ["websocket", "polling"], // Allow polling fallback to avoid connection drop
  reconnectionAttempts: 5,
  reconnectionDelay: 2000,
});

export const connectSocket = (userId) => {
  if (!userId) return;

  if (!socket.connected) {
    socket.connect();
    socket.once("connect", () => {
      logger.log("Socket connected, registering user:", userId);
      socket.emit("register", userId);
    });
  } else {
    socket.emit("register", userId);
  }
};

export const disconnectSocket = () => {
  if (socket.connected) {
    socket.disconnect();
    logger.log("Socket disconnected");
  }
};

export default socket;
