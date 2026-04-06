import { Router } from "express";   
import { auth } from "../middlewares/auth.mmiddleware.js";
import { clearAllNotification, deleteNotification, getNotification } from "../controllers/notification.controller.js";


const router=Router()

router.get("/get",auth,getNotification)
router.delete("/delete/:id",auth,deleteNotification)
router.delete("/",auth,clearAllNotification)
export default router