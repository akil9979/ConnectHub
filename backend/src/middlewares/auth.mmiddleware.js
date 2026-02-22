import jwt from "jsonwebtoken"
import { User } from "../models/user.models.js"

const auth = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken
        ;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized: token missing" })
        }

        const decoded = jwt.verify(token,process.env.access_token_secret )
     
        req.user = decoded;
        next()

    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Access token expired" })
        }
        return res.status(401).json({ message: "Invalid access token" })
    }
}

export { auth }
