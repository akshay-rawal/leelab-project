
    import express from "express"
    import { verifyUser } from "../controllers/auth.controller"
    import { isAdmin } from "../controllers/problem.controller.js/isAdmin"
    import { problemCreateValidator } from "../utills/validators/problemValidator"

    const problemRoutes = express.Router()



    problemRoutes.post("/create-problem",verifyUser,isAdmin,createProblem,problemCreateValidator())


    export default problemRoutes