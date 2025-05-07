import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { db } from "../libs/db.js";
import { getJudge0LanguageId } from "../utills/judge0.utills.js";
import { submitBatch } from "../utills/judge0.utills.js";
import { pollBatchResults } from "../utills/judge0.utills.js";
import axios from "axios";

const createProblem = asyncHandlers(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tag,
    constraints,
    hints,
    testCases,
    examples,
    referenceSolution,
    codeSnippets,
  } = req.body;

  console.log("BODY DATA:", req.body);

  if (req.user.role !== "ADMIN") {
    return res
      .status(403)
      .json(new apiError(403, "You're not authorized to create problems!"));
  }

  // Validate required fields
  if (
    !title ||
    !description ||
    !difficulty ||
    !referenceSolution ||
    !testCases
  ) {
    return res.status(400).json(new apiError(400, "Missing required fields"));
  }

  if (!Array.isArray(testCases) || testCases.length === 0) {
    return res
      .status(400)
      .json(new apiError(400, "Test cases must be a non-empty array"));
  }

  try {
    for (const [language, solutionCode] of Object.entries(
      referenceSolution || {}
    )) {
      const languageId = getJudge0LanguageId(language);

      if (!languageId) {
        return res
          .status(400)
          .json(new apiError(400, `Language ${language} not supported.`));
      }

      const submission = testCases.map(({ input, output }) => ({
        source_code: solutionCode,
        stdin: input,
        expected_output: output,
        language_id: languageId,
      }));

      const submissionResult = await submitBatch(submission);
      const tokens = submissionResult.map((s) => s.token);
      const results = await pollBatchResults(tokens);

      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        if (result.status.id !== 3) {
          return res
            .status(400)
            .json(
              new apiError(
                400,
                `Testcase ${i + 1} failed for ${language}: ${result.status.description}`
              )
            );
        }
      }
    }

    // Save to database
    const newProblem = await db.problem.create({
      data: {
        title,
        description,
        difficulty,
        tag,
        constraints,
        hints,
        examples,
        referenceSolution,
        codeSnippets,
        testCases,
        createdBy: {
          connect: {
            id: req.user.id,
          },
        },
      },
    });

    return res.status(201).json(newProblem);
  } catch (error) {
    console.error("Error in createProblem:", error);
    return res.status(500).json(new apiError(500, "Something went wrong"));
  }
});

const deleteProblem = asyncHandlers(async (req, res) => {});
const updateProblem = asyncHandlers(async (req, res) => {
 try {
   const { id } = req.params;
  
 
 const existingProblem = await prisma.problem.findUnique({
       where: { id }, 
     });
 if (!existingProblem) {
   return res.status(404).json(new apiError(404, "Problem not found"));

 }
 const allowedFields = [
  "title", "description", "difficulty", "tag", "constraints",
  "hints", "testCases", "examples", "referenceSolution", "codeSnippets"
];

 const updateData = {}

 for(const key of allowedFields)
  if (key in req.body) {  // If the field is provided in the request
    updateData[key] = req.body[key];  // Add it to the updateData object
  }
 const updatedProblems = await prisma.problem.update({
   where: { id},
   data: updateData,
 });
     return res.status(200).json(200,"problem update successfully!")
 
 } catch (error) {
  res.status(500).json(new apiError(500, "Server error",error.message));

 }

});
const getProblemById = asyncHandlers(async (req, res) => {
      
  const {id} = req.params;
  
    try {
      const problemById = await db.problem.findUnique({
        where:{
          id
        }
  
      })
      if(!problemById){
        return res.status(404).json(new apiError(404, "Something went wrong"));
      }else{
        return res.status(200).json(200,"message created successfully!")
      }
    } catch (error) {

      console.error("Error in createProblem:", error);
    return res.status(500).json(new apiError(500, "Something went wrong"));
    }})
    
  
const getAllProblems = asyncHandlers(async (req, res) => {
  try {
    const problems = await db.problem.findMany();
  
      if (!problems) {
        return res.status(404).json(new apiError(404, "No problem found!"));
      } else {
        return res
          .status(200)
          .json(new apiResponseHandler(200, "message created successfully!", problems));
      
    }
  } catch (error) {
    console.log("error releted to getproblem", error);
    return res
      .status(500)
      .json(new apiError(500, "Error while fetching problem"));
  }
});

const getSolvedProblemByUser = asyncHandlers(async (req, res) => {});

export {
  createProblem,
  deleteProblem,
  updateProblem,
  getAllProblems,
  getProblemById,
  getSolvedProblemByUser,
};
