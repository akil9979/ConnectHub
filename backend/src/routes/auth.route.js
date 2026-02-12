import { Router } from "express";
import {  signUp,LogIn,logOut } from "../controllers/auth.controller.js";
const router=Router();

router.post("/signUp",signUp)
router.post("/login",LogIn)
router.post("/logout",logOut)

export default router;