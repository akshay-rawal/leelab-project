
import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { pollBatchResults, submitBatch } from "../utills/judge0.utills.js";
import { getJudge0LanguageName } from "../utills/judge0.utills.js";


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
     const results = await pollBatchResults(token);

     // analysis test case results

     let allPassed = true;
     const detailedResults = results.map((res,i )=>{
      const stdout = res.stdout?.trim()
      const expected_output = expected_outputs[i]?.trim();
      const passed = stdout === expected_output;
      console.log(`Testcase #${i+1}`);
      console.log(`Input ${stdin[i]}`);
      console.log(`Expected Output for tast case ${expected_output}`);
      console.log(`Actual input ${stdout}`);
      console.log(`Matched:${passed}`);
      
      if(!passed) allPassed = false

      return{
          testCaseIndex:i+1,
          stdout:stdout,
          expectedOutput:expected_output,
          stderr:results.stderr || null,
          compileOutput:results.compile_output || null,
          status:results.status.description,
          memory:results.memory ? `${results.memory} kb `: undefined,
          time:results.time ? `${results.time} sec` : undefined
          
      }
      
      
     })
     console.log("detail results.....",detailedResults);

     const submission = await db.submission.create({
        data:{
          userId,
          problemId,
          sourceCode:source_code,
          language:getJudge0LanguageName(language_id),
          stdin:stdin.join("\n"),
          stdout:JSON.stringify(detailedResults.map((r)=>r.stdout)),
          stderr:detailedResults.some((r)=>r.stderr) ? JSON.stringify(detailedResults.map((r)=>r.stderr)) : null,
          compileOutput:detailedResults.some((r)=>r.compile_output) ? JSON.stringify(detailedResults.map((r)=>r.compile_output)) : null,
          status:allPassed ? "Accepted":"Wrong Answer",
          memory: detailedResults.some((r)=>r.memory) ? JSON.stringify(detailedResults.map((r)=>r.memory)) : null,
          time:detailedResults.some((r)=>r.time) ? JSON.stringify(detailedResults.map((r)=>r.time)) : null,
        }
     })

     if(allPassed){
        await db.problemSolved.upsert({
          where:{
            userId_problemId:{
              userId,problemId
            }}, 
            update:{},
            create:{
              userId,
              problemId

            },


          }
        )
     }
 
     //save individual tast case results using detailResults
       const tasteCaseResults = detailedResults.map((result)=>({
           submissionId:submission.id,
           tasteCase:result.tasteCase,
           passed:result.passed,
           stdout:result.stdout,
           expectedOutput:result.expected_output,
           stderr:result.stderr,
           compileOutput:result.compile_output,
           status:result.status,
           memory:result.memory,
           time:result.time

       }))

        await db.TestCaseResult.createMany({
          data:tasteCaseResults
        })

        const submittionTestCases = await db.submission.findUnique({
       where:{
        id:submission.id
       },
       include:{
        testCases:true
       }
        })
     
     
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
 