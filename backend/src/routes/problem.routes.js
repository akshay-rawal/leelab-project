
    import express from "express"
    import { verifyUser } from "../controllers/auth.controller.js"
    import { problemCreateValidator } from "../utills/validators/problemValidator.js"
    import { isAdmin } from "../controllers/isAdmin.js"
    import { createProblem,getAllProblems,getSolvedProblemByUser,updateProblem,getProblemById,deleteProblem } from "../controllers/problem.controller.js"
    const problemRoutes = express.Router()



    problemRoutes.post("/create-problem",verifyUser,isAdmin,createProblem,problemCreateValidator(),createProblem)
    problemRoutes.put("/update-problem/:id".verifyUser,isAdmin,updateProblem)
    problemRoutes.delete("/problem-delete/:id",verifyUser,isAdmin,deleteProblem)
    problemRoutes.get("getall-problems",verifyUser,getAllProblems)
    problemRoutes.get("getall-problems/:id",verifyUser,getProblemById)
    problemRoutes.get("/get-solved-problem",verifyUser,getSolvedProblemByUser)



    export default problemRoutes