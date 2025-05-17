import express from "express"

import { registerUser,loginUser,logoutUser,verifyUser } from "../controllers/auth.controller.js"

const router = express.Router()


router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/logout", logoutUser)
router.get("/check-user", verifyUser, (req, res) => {
    res.status(200).json({
      success: true,
      message: "User authenticated",
      user: req.user,
    });
  });
  



  



export default router