
import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { pollBatchResults, submitBatch } from "../utills/judge0.utills.js";
import axios from "axios";


export const executeCode = asyncHandlers(async (req, res) => {
   const { source_code, language_id, stdin, expected_outputs, problemId } = req.body;
 
   // Check if stdin and expected_outputs are valid
   if (
     !Array.isArray(stdin) ||
     stdin.length === 0 ||
     !Array.isArray(expected_outputs) ||
     expected_outputs.length !== stdin.length
   ) {
     return res.status(400).json(new apiError(400, "Invalid or missing test cases!"));
   }
 
   // 2. Prepare each test-case for judge0 batch submission
   const submission = stdin.map((input) => ({
     source_code,
     language_id,
     stdin: input,
   }));
 
   // Check the prepared submission array
   console.log("Prepared Submissions for Judge0:", submission);
 
   // Check if the submission is empty
   if (submission.length === 0) {
     return res.status(400).json(new apiError(400, "No submissions to send to Judge0!"));
   }
 
   // 3. Send this Batch submission to Judge0
   try {
     const submitResponse = await submitBatch(submission);
     console.log("Submit response from Judge0:", submitResponse);
 
     const token = submitResponse.map((res) => res.token);
     console.log("Tokens received from Judge0:", token);
 
     // 4. Poll Judge0 for results of all submitted test-cases
     const result = await pollBatchResults(token);
     console.log("Result from Judge0:", result);
 
     return res.status(201).json(new apiResponseHandler(200, "Code executed!"));
   } catch (error) {
     console.error("Error in submitBatch:", error.message);
     if (error.response) {
       console.error("Response error data:", error.response.data);
     }
     return res.status(500).json(new apiError(
      500,
      "Failed to execute code.",
      error.response?.data || error.message
    ));
       }
 });
 