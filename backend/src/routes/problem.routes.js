
    import express from "express"
    import { verifyUser } from "../controllers/auth.controller"
    import { isAdmin } from "../controllers/problem.controller.js/isAdmin"
    import { problemCreateValidator } from "../utills/validators/problemValidator"

    const problemRoutes = express.Router()



    problemRoutes.post("/create-problem",verifyUser,isAdmin,createProblem,problemCreateValidator(),createProblem)
    problemRoutes.put("/update-problem/:id".verifyUser,isAdmin,updateProblem)
    problemRoutes.delete("/problem-delete/:id",verifyUser,isAdmin,deleteProblem)
    problemRoutes.get("getall-problems",verifyUser,getAllProblems)
    problemRoutes.get("getall-problems/:id",verifyUser,getProblemById)
    problemRoutes.get("/get-solved-problem",verifyUser,getSolvedProblem)



    export default problemRoutes