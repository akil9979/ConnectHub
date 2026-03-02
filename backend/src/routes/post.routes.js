import { Router } from "express";
import { comment, createPost, getPost, like } from "../controllers/post.controller.js";
import { auth } from "../middlewares/auth.mmiddleware.js";
import upload from "../middlewares/multer.js";


const router= Router()

router.post("/createPost",auth,upload.single("image"),createPost)
router.get("/getPost",auth,getPost)
router.get("/like/:id",auth,like)
router.post("/comment/:id",auth,comment)
export default router