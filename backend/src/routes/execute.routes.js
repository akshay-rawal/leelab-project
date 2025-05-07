import express from "express"
import { verifyUser } from "../controllers/auth.controller.js"
import { executeCode } from "../controllers/executeCode.controller.js"

const exectionRoutes = express.Router()


exectionRoutes.post("/",verifyUser,executeCode)

export default exectionRoutes