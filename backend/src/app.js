import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      "http://localhost:5173",
      "https://connecthub-frontend-006.onrender.com",
      "https://connecthub-frontend-0016.onrender.com"
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  optionsSuccessStatus: 204
};


app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use(express.json());
app.use(cookieparser());
app.use(express.static("public"));
app.use(urlencoded({ extended: true }));

import authRoute from "./routes/auth.route.js";
app.use("/api/v1/auth", authRoute);
import userroute from "./routes/user.routes.js";
app.use("/api/v1/user", userroute);
import postroute from "./routes/post.routes.js";
app.use("/api/v1/post", postroute);
import connectionroute from "./routes/connection.routes.js";
import notificationroute from "./routes/notification.route.js";
app.use("/api/v1/connection", connectionroute);
app.use("/api/v1/notification", notificationroute);

export { app };
