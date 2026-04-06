import { Notification } from "../models/notification.model.js"
export const getNotification=async (req,res) => {
    try {
        const notification= await Notification.find({receiver:req.user._id})
        .populate("relatedUser","firstname lastname profileImage")
        .populate("relatedPost","image description")
        return res.status(200).json({message:"notification get successfully",notification})
    } catch (error) {
        return res.status(400).json({message:`notification get error ${error}`})   
    }
}
export const deleteNotification=async (req,res) => {
    try {
        const {id}= req.params
        console.log(id);
        
         await Notification.findOneAndDelete({
            _id:id,
            receiver:req.user._id})
        return res.status(200).json({message:"notification delete successfully"})
    } catch (error) {
        return res.status(400).json({message:`notification delete error ${error}`})   
    }
}
export const clearAllNotification=async (req,res) => {
    try {
        
         await Notification.deleteMany({
            receiver:req.user._id})
        return res.status(200).json({message:"notification delete successfully"})
    } catch (error) {
        return res.status(400).json({message:`notification delete error ${error}`})  
    }
}