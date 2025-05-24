import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";
import { db } from "../libs/db.js";
import { getJudge0LanguageId } from "../utills/judge0.utills.js";
import { submitBatch } from "../utills/judge0.utills.js";
import { pollBatchResults } from "../utills/judge0.utills.js";
import { normalizeConstraints } from "../utills/constraints.js";

const createProblem = asyncHandlers(async (req, res) => {
  const {
    title,
    description,
    difficulty,
    tags,
    constraints,
    hints,
    testcases,
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
    !testcases
  ) {
    return res.status(400).json(new apiError(400, "Missing required fields"));
  }

  if (!Array.isArray(testcases) || testcases.length === 0) {
    return res
      .status(400)
      .json(new apiError(400, "Test cases must be a non-empty array"));
  }

           const normalizedConstraints = normalizeConstraints(constraints);

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

      const submission = testcases.map(({ input, output }) => ({
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
        tags,
        constraints:normalizedConstraints,
        hints,
        examples,
        referenceSolution,
        codeSnippets,
        testcases,
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

const deleteProblem = asyncHandlers(async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the problem exists
    const existingProblem = await prisma.problem.findUnique({
      where: { id },
    });

    if (!existingProblem) {
      return res
        .status(404)
        .json(new apiError(404, "Problem not found"));
    }

    // Delete the problem
    await prisma.problem.delete({
      where: { id },
    });

    return res
      .status(200)
      .json({ status: 200, message: "Problem deleted successfully!" });

  } catch (error) {
    return res
      .status(500)
      .json(new apiError(500, "Server error", error.message));
  }
});

const updateProblem = asyncHandlers(async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Check if the problem exists
    const existingProblem = await prisma.problem.findUnique({
      where: { id },
    });

    if (!existingProblem) {
      return res
        .status(404)
        .json(new apiError(404, "Problem not found"));
    }

    // Step 2: Define which fields are allowed to be updated
    const allowedFields = [
      "title",
      "description",
      "difficulty",
      "tag",
      "constraints",
      "hints",
      "testCases",
      "examples",
      "referenceSolution",
      "codeSnippets",
    ];

    // Step 3: Filter out only the fields sent in the request body
    const updateData = {};
    for (const key of allowedFields) {
      if (key in req.body) {
        updateData[key] = req.body[key];
      }
    }

    // Step 4: Perform the update
    const updatedProblem = await prisma.problem.update({
      where: { id },
      data: updateData,
    });

    // Step 5: Send a success response
    return res
      .status(200)
      .json(new apiResponseHandler(200, "Problem updated successfully!", updatedProblem));

  } catch (error) {
    console.error("Error updating problem:", error);
    return res
      .status(500)
      .json(new apiError(500, "Server error", error.message));
  }
});

const getProblemById = asyncHandlers(async (req, res) => {
  const { id } = req.params;

  try {
    const problemById = await db.problem.findUnique({
      where: {
        id
      }
    });

    if (!problemById) {
      return res.status(404).json(new apiError(404, "Problem not found"));
    } else {
      return res.status(200).json(new apiResponseHandler(200, "Problem retrieved successfully", problemById));
    }
  } catch (error) {
    console.error("Error in getProblemById:", error);
    return res.status(500).json(new apiError(500, "Internal server error"));
  }
});

    
  
const getAllProblems = asyncHandlers(async (req, res) => {
  try {
    const problems = await db.problem.findMany();
  
      if (!problems) {
        return res.status(404).json(new apiError(404, "No problem found!"));
      } else {
        return res
          .status(200)
          .json(new apiResponseHandler(200, "problems gets successfully!", problems));
      
    }
  } catch (error) {
    console.log("error releted to getproblem", error);
    return res
      .status(500)
      .json(new apiError(500, "Error while fetching problem"));
  }
});

const getSolvedProblemByUser = asyncHandlers(async (req, res) => {
  const problems = await db.problem.findMany({
    where: {
      solvedProblemByUser: {
        some: {
          userId: req.user.id
        }
      }
    },
    include: {
      solvedProblemByUser: {
        where: {
          userId: req.user.id
        }
      }
    }
  });

  // If no problems found for the current user
  if (!problems || problems.length === 0) {
    return res.status(404).json(
      new apiError(404, "No solved problems found for the current user.")
    );
  }

  // Success response
  return res.status(200).json(
    new apiResponseHandler(200, "Solved problems fetched successfully.", problems)
  );
});




export {
  createProblem,
  deleteProblem,
  updateProblem,
  getAllProblems,
  getProblemById,
  getSolvedProblemByUser,
};
