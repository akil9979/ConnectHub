import { User } from "../models/user.models.js"
import uploadOnCloudinary  from "../utils/cloudinary.js"

export const currentUser = async(req, res) => {
    try {
        const user=req.user
        
        
        const currentuser=await User.findById(user?._id).select("-password")
        if (!currentuser) {
            return res.status(401).json({message:"user does not exist"})
        }
        return res.status(200).json({message:"current User fetch succesfully",currentuser})
    } catch (error) {
        return res.status(400).json({message:"get current user error"})
    }
}
export const updateProfile=async(req,res)=>{
    try {
        const {firstname,lastname,headline,username,location,gender}=req.body
        let skills=req.body.skills?JSON.parse(req.body.skills):[]
        let education=req.body.educations?JSON.parse(req.body.educations):[]
        let experience=req.body.experience?JSON.parse(req.body.experience):[]
        let profileImage
        let coverImage
        console.log(req.files);
        
        if (req.files.profileImage) {
            profileImage=await uploadOnCloudinary(req.files.profileImage[0]?.path)
        }
        if (req.files.coverImage) {
            coverImage=await uploadOnCloudinary(req.files.coverImage[0]?.path)
        }

        const user= await User.findByIdAndUpdate(req.user._id,{
            firstname,lastname,headline,username,location,gender,skills,education,experience,
            profileImage,coverImage
        },{new:true}).select("-password")

        return res.status(200).json({message:"profile updated successfully",user})

    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"profile update error"})
        
    }
}