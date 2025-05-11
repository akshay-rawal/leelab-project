import { asyncHandlers } from "../utills/asyncHandler.js";
import { apiError } from "../utills/apiErrorHandler.js";
import { db } from "../libs/db.js";
import { apiResponseHandler } from "../utills/apiresponseHandler.js";

export const getAllSubmission = asyncHandlers(async (req, res) => {
  const userId = req.user?.id;

  const submissions = await db.submission.findMany({
    where: {
      userId: userId,
    },
  });
  if (!submissions || submissions.length === 0) {
    return res
      .status(404)
      .json(new apiError(404, "No submissions found for the current user."));
  }

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "Submissions fetched successfully.",
        submissions
      )
    );
});

export const getSubmissionIdProblem = asyncHandlers(async (req, res) => {
  const userId = req.user?.id;
  const { problemId } = req.params;

  if (!problemId) {
    return res.status(400).json(new apiError(400, "Problem ID is required."));
  }

  const submissions = await db.submission.findMany({
    where: {
      userId,
      problemId,
    },
  });

  if (!submissions || submissions.length === 0) {
    return res
      .status(404)
      .json(new apiError(404, "No submissions found for this problem."));
  }

  return res.status(200).json( new
    apiResponseHandler(200, "Submissions fetched successfully.", {
      submissions,
    })
  );
});

export const getAllTheSubmissionForProblem = asyncHandlers(async (req, res) => {
  const { problemId } = req.params;

  if (!problemId) {
    return res
      .status(400)
      .json(new apiError(400, "Problem ID is required."));
  }

   const count = await db.submission.count({
    where: { problemId },
  });

  return res
    .status(200)
    .json(new apiResponseHandler(200, "All submissions for the problem fetched successfully.",count ));
});

