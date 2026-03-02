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
        .populate("comments.user","firstname lastname profileImage headline").sort({createdAt:-1})
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
        if (post.likes.includes(userId)) {
           post.likes= post.likes.filter((id)=>id!=userId)
        }
        else{
            post.likes.push(userId)
        }

        await post.save()
       
        
        return res.status(200).json({message:"like ",post})
        
    } catch (error) {
        return res.status(400).json({message:"like post error"})
    }
}


export const comment=async (req,res) => {
    try {
        const postId=req.params.id
        const userId=req.user._id
        const {content}=req.body
       
        const post= await Post.findByIdAndUpdate(postId,{
            $push:{
                comments:{content,user:userId}
            }
        },{new:true}).populate("comments.user","firstname lastname profileImage headline")
        return res.status(200).json({message:"comment added successfully",post})

    } catch (error) {
        console.log("COMMENT ERROR:", error)
        return res.status(400).json({message:"comment post error"})
    }
}