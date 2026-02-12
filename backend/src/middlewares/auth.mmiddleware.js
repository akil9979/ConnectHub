import jwt from 'jsonwebtoken';
import { User } from '../models/user.models.js';
 const auth=async (req,res,next) => {
    try {
     
        const token=req.cookies?.accessToken;
        if (!token) {
            return res.status(400).json({ message: "Unauthorized" });
        }
        const verifyToken=await jwt.verify(token,process.env.access_token_secret)
        if(!verifyToken){
            return res.status(400).json({ message: "invalid acces token " });
        }
        const user=await User.findById(verifyToken.id).select("-password")
        req.user=user;
        next()
        

    } catch (error) {
        return res.status(500).json({ message: "internal server error" })
    }
}

export  {auth};