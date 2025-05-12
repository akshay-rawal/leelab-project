import { asyncHandlers } from "../utills/asyncHandler";
import { apiError } from "../utills/apiErrorHandler";
import { apiResponseHandler } from "../utills/apiresponseHandler";
import { db } from "../libs/db";

//  Create a new playlist
const createPlaylist = asyncHandlers(async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json(new apiError(400, "Title is required"));
  }

  const user = await db.user.findUnique({
    where: { id: req.user.id },
  });

  if (!user) {
    return res.status(404).json(new apiError(404, "User not found"));
  }

  // Create a new playlist
  const playlist = await db.playlist.create({
    data: {
      title,
      description: description || "", //string if no description is provided then set empty
      createdById: user.id,
    },
  });

  return apiResponseHandler(
    res,
    201,
    "Playlist created successfully",
    playlist
  );
});
//   Get playlist by ID
const getPlaylistDetails = asyncHandlers(async (req, res) => {
  const { playlistId } = req.params; // Get playlist ID from URL params

  if (!playlistId) {
    return res.status(400).json(new apiError(400, "Playlist ID is required"));
  }

  const playlist = await db.playlist.findUnique({
    where: { id: playlistId },
    include: {
      problemsInPlaylist: {
        // Include problems related to the playlist
        include: {
          problem: true, // Include the problem  details like title,description,testcases etc.
        },
      },
    },
  });

  if (!playlist) {
    return res.status(404).json(new apiError(404, "Playlist not found"));
  }

  return res
    .status(200)
    .json(
      new apiResponseHandler(
        200,
        "Playlist details fetched successfully",
        playlist
      )
    );
});

// Get all playlists
const getAllPlaylistDetails = asyncHandlers(async (req, res) => {
  try {
    const userId = req.user.id;

    const playlists = await db.playlist.findMany({
      where: {
        userId: userId,
      },
      include: {
        problemsInPlaylist: {
          include: {
            problem: true,
          },
        },
      },
    });

    if (!playlists || playlists.length === 0) {
      return apiResponseHandler(res, 404, "No playlists found.");
    }

    return apiResponseHandler(
      res,
      200,
      "All playlist details fetched successfully.",
      playlists
    );
  } catch (error) {
    console.error(error);
    return apiResponseHandler(
      res,
      500,
      "Server error while fetching playlists."
    );
  }
});

// Add problem to a playlist
const addProblemToPlaylist = asyncHandlers(async (req, res) => {
  const userId = req.user.id;
  const { playlistId, problemId } = req.body;

  // Check required fields
  if (!playlistId || !problemId) {
    return res
      .status(400)
      .json(new apiError(400, "playlistId and problemId are required"));
  }

  // Check if playlist exists and belongs to current user
  const playlist = await db.playlist.findUnique({
    where: { id: playlistId },
  });

  if (!playlist) {
    return new apiError(404, "Playlist not found").send(res);
  }

  if (playlist.userId !== userId) {
    return res
      .status(403)
      .json(
        new apiError(
          403,
          "You are not authorized to add problems to this playlist"
        )
      );
  }

  // Check if problem exists
  const problem = await db.problem.findUnique({
    where: { id: problemId },
  });

  if (!problem) {
    return res.status(400).json(new apiError(400, "Problem not found"));
  }

  // Check if problem is already added to the playlist
  const existing = await db.problemInPlaylist.findUnique({
    where: {
      playlistId_problemId: {
        playlistId,
        problemId,
      },
    },
  });

  if (existing) {
    return res
      .status(400)
      .json(new apiError(400, "Problem already exists in the playlist"));
  }

  // Add problem to playlist
  const added = await db.problemInPlaylist.create({
    data: {
      playlistId,
      problemId,
      addedById: userId,
    },
  });

  return res
    .status(201)
    .json(
      new apiResponseHandler(
        201,
        "Problem added to playlist successfully",
        added
      )
    );
});
// Remove a problem from a playlist
const problemDeleteFromPlaylist = asyncHandlers(async (req, res) => {
  const userId = req.user.id;
  const { playlistId, problemId } = req.body;

  // Validate input
  if (!playlistId || !problemId) {
    return res
      .status(400)
      .json(new apiError(400, "soory! first create playlist"));
  }

  // Check if playlist exists and belongs to the user
  const playlist = await db.playlist.findUnique({
    where: { id: playlistId },
  });

  if (!playlist) {
    return res.status(404).json(new apiError(404, "Playlist not found"));
  }

  if (playlist.userId !== userId) {
    return res
      .status(403)
      .json(
        new apiError(
          403,
          "You are not authorized to delete problems from this playlist"
        )
      );
  }

  // Check if the problem exists in the playlist
  const existing = await db.problemInPlaylist.findUnique({
    where: {
      playlistId_problemId: {
        playlistId,
        problemId,
      },
    },
  });

  if (!existing) {
    return res
      .status(404)
      .json(new apiError(404, "Problem not found in the playlist"));
  }

  // Delete the problem from playlist
  await db.problemInPlaylist.delete({
    where: {
      playlistId_problemId: {
        playlistId,
        problemId,
      },
    },
  });

  return res
    .status(200)
    .json(
      new apiResponseHandler(200, "Problem removed from playlist successfully")
    );
});

//  Delete a playlist
const deletePlaylist = asyncHandlers(async (req, res) => {
  const userId = req.user.id;
  const { playlistId } = req.body;

  if (!playlistId) {
    return res
      .status(400)
      .json(new apiError(400, "playlistId is required"));
  }

  const playlist = await db.playlist.findUnique({
    where: { id: playlistId },
  });

  if (!playlist) {
    return res
      .status(404)
      .json(new apiError(404, "Playlist not found"));
  }

  // Check user come in req its match
  if (playlist.userId !== userId) {
    return res
      .status(403)
      .json(new apiError(403, "You are not authorized to delete this playlist"));
  }

  await db.problemInPlaylist.deleteMany({
    where: { playlistId },
  });

  
  await db.playlist.delete({
    where: { id: playlistId },
  });

  return res
    .status(200)
    .json(new apiResponseHandler(200, "Playlist deleted successfully"));
});

export {
  getPlaylistDetails,
  getAllPlaylistDetails,
  createPlaylist,
  addProblemToPlaylist,
  deletePlaylist,
  problemDeleteFromPlaylist,
};
