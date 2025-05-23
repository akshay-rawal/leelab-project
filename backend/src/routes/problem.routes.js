
    import express from "express"
    import { verifyUser } from "../controllers/auth.controller.js"
    import { problemCreateValidator } from "../utills/validators/problemValidator.js"
    import { isAdmin } from "../controllers/isAdmin.js"
    import { createProblem,getAllProblems,updateProblem,getProblemById,deleteProblem,getSolvedProblemByUser } from "../controllers/problem.controller.js"
    const problemRoutes = express.Router()



    problemRoutes.post("/create-problem",verifyUser,isAdmin,problemCreateValidator(),createProblem) //done
    problemRoutes.patch("/update-problem/:id",verifyUser,isAdmin,updateProblem) //done
    problemRoutes.delete("/problem-delete/:id",verifyUser,isAdmin,deleteProblem)  //done
    problemRoutes.get("/getAll-problems",verifyUser,getAllProblems)   //done
    problemRoutes.get("/get-problems/:id",verifyUser,getProblemById)  //done
    problemRoutes.get("/get-solved-problem",verifyUser,getSolvedProblemByUser)



    export default problemRoutes