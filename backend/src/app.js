import express, { urlencoded } from "express";
import cookieparser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(cors({
  origin: true,
  credentials: true
}));




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
