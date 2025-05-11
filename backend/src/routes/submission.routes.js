import express from "express"
import { verifyUser } from "../controllers/auth.controller"

const submitRoutes  = express.Router()


submitRoutes.get("/get-all-submissions",verifyUser,getAllSubmission)
submitRoutes.get("/get-submission/:problemId",verifyUser,getSubmissionIdProblem)
submitRoutes.get("/get-submissions-count/:problemId",verifyUser,getAllTheSubmissionForProblem )





export default submitRoutes