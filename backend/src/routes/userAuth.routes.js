import express from "express"

import { registerUser,loginUser,logoutUser,verifyUser } from "../controllers/auth.controller.js"
import { userregisterValidator,userLoginValidator} from "../utills/validators/authValidator.js"
import { validate } from "../middleware/checkValidator.js"
const router = express.Router()


router.post("/register",userregisterValidator(), validate,registerUser)
router.post("/login",userLoginValidator(),validate, loginUser)
router.get("/logout", logoutUser)
router.get("/check-user", verifyUser, (req, res) => {
    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: req.user,
    });
  });
  



  



export default router