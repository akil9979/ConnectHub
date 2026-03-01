import Post from "../models/post.models.js"
import uploadOnCloudinary from "../utils/cloudinary.js"

export const createPost=async(req,res)=>{
    try {
        const {description}=req.body
            let newPost
        
        if (req.file) {
            const image= await uploadOnCloudinary(req.file?.path)
             newPost= await Post.create({
                author:req.user._id,
                description,
                image,
            })
        }
        else {
             newPost= await Post.create({
                author:req.user._id,
                description,
            })
        }
        return res.status(201).json({message:"post created successfully",newPost})
    } catch (error) {
        return res.status(400).json({message:"post creation error"})
    }
}

export const getPost=async (req,res) => {
    try {
        const post=await Post.find().populate("author","firstname lastname profileImage headline").sort({createdAt:-1})
        return res.status(200).json({message:"post get succesfully",post})
    } catch (error) {
        console.log(error);
        return res.status(400).json({message:"post get error"})
    }
}

export const like=async (req,res) => {
    try {
        let postId=req.params.id
        const userId=req.user._id
        const post=await Post.findById(postId)
        if (!post) {
            return res.status(404).json({message:"post not found"})
        }
    } catch (error) {
        
    }
}