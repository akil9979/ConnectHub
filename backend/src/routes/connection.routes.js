import { Router } from "express";
import { acceptConnection,
     getConnectionRequest,
      getConnectionStatus,
       getUserConnections,
       rejectConnection,
        removeConnection,
         sendConnection } from "../controllers/connection.controller.js";
import { auth } from "../middlewares/auth.mmiddleware.js";

const router = Router();
router.post("/send/:id",auth,sendConnection)
router.put("/accept/:connectionId",auth,acceptConnection)
router.put("/reject/:connectionId",auth,rejectConnection)
router.get("/getStatus/:userId",auth,getConnectionStatus)
router.delete("/remove/:userId",auth,removeConnection)
router.get("/requests",auth,getConnectionRequest)
router.get("/",auth,getUserConnections)
export default router;