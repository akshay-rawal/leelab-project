import express from "express"
import { verifyUser } from "../controllers/auth.controller.js"
import { getAllSubmission,getSubmissionIdProblem,getAllTheSubmissionForProblem } from "../controllers/submission.controller.js"

const submitRoutes  = express.Router()


submitRoutes.get("/get-allsub-missions",verifyUser,getAllSubmission)
submitRoutes.get("/get-submission/:problemId",verifyUser,getSubmissionIdProblem)
submitRoutes.get("/get-submissions-count/:problemId",verifyUser,getAllTheSubmissionForProblem )





export default submitRoutes