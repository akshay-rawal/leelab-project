import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { db } from "../libs/db.js";
import { getJudge0LanguageId } from "../utills/judge0.utills.js";


const createProblem = asyncHandlers(async(req,res)=>{

        const {title,description,difficulty,tag,constraints,hints,
            examples,referenceSolution,codeSnippets} = req.body
            if(req.user.role ==! "ADMIN"){
              return res.status(403).json(new apiError(403,"you're not able to create problem!"))
            }

             try {
               for( const [language,solutionCode] of Object.entries(referenceSolution)){
                  console.log(language,solutionCode);
                  const languageId = getJudge0LanguageId(language)
                  if(!languageId){
                    return res.status(400).json(new apiError(400,`Language '${language}' not supported.`))
                  }
                  const submission = testcases.map(({input,output})=>({
                       source_code:solutionCode,
                       stdin: input,
                       expected_output: output
                  }))

               }
             } catch (error) {
              
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