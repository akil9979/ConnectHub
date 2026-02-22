import {auth} from "../middlewares/auth.mmiddleware.js";
import { Router } from "express";
import {currentUser, updateProfile} from "../controllers/user.controller.js"
import upload from "../middlewares/multer.js";


const router= Router()

router.get("/currentuser",auth,currentUser)
router.put("/updateprofile",auth,upload.fields([
    {name:"profileImage",maxCount:1},
    {name:"coverImage",maxCount:1}
]),updateProfile)

export default router