import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { db } from "../libs/db.js";


const createProblem = asyncHandlers(async(req,res)=>{

        const {title,description,difficulty,tag,constraints,hints,
            examples,referenceSolution,codeSnippets} = req.body
            if(req.user.role ==! "ADMIN"){
              return res.status(403).json(403,"you're not able to create problem!")
            }

})
const deleteProblem = asyncHandlers(async(req,res)=>{
    
})
const updateProblem = asyncHandlers(async(req,res)=>{
    
})
const getProblemById = asyncHandlers(async(req,res)=>{
    
})
const getAllProblems = asyncHandlers(async(req,res)=>{
    
})

const getSolvedProblemByUser = asyncHandlers(async(req,res)=>{
    
})

export {createProblem,deleteProblem,updateProblem,getAllProblems,getProblemById,getSolvedProblemByUser}