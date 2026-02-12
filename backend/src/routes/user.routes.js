import {auth} from "../middlewares/auth.mmiddleware.js";
import { Router } from "express";
import {currentUser} from "../controllers/user.controller.js"

const router= Router()

router.get("/currentuser",auth,currentUser)

export default router