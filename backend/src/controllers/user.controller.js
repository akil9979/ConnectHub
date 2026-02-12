import { User } from "../models/user.models.js"

export const currentUser = async(req, res) => {
    try {
        const user=req.user
        const currentuser=await User.findById(user?._id).select("-password")
        if (!currentUser) {
            return res.status(401).json({message:"user does not exist"})
        }
        return res.status(200).json({message:"current User fetch succesfully",currentUser})
    } catch (error) {
        return res.status(400).json({message:"get current user error"})
    }
}