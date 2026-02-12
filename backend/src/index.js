import { app } from "./app.js";
import dotenv from "dotenv";
import connectDB from "./DB/connectdb.js";

dotenv.config({});

connectDB()
.then(
    app.listen(process.env.PORT, () => {
        console.log("Server is running on port 8000");
    })
)
.catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
})