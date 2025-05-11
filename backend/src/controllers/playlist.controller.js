
import { asyncHandlers } from "../utills/asyncHandler";
import { apiError } from "../utills/apiErrorHandler";
import { db } from "../libs/db";


//  Create a new playlist
const createPlaylist = asyncHandlers(async (req, res) => {
  res.json({ message: "createPlaylist called" });
});
//   Get playlist by ID
const getPlaylistDetails = asyncHandlers(async (req, res) => {
  res.json({ message: "getPlaylistDetails called" });
});


  // Get all playlists
const getAllPlaylistIstDetails = asyncHandlers(async (req, res) => {
  res.json({ message: "getAllLIstDetails called" });
});

 


// Add problem to a playlist
const addProblemToPlaylist = asyncHandlers(async (req, res) => {
  res.json({ message: "addProblemToPlaylist called" });
});
// Remove a problem from a playlist
const problemDeleteFromPlaylist = asyncHandlers(async (req, res) => {
  res.json({ message: "problemDeleteFromPlaylist called" });
});

//  Delete a playlist
const deletePlaylist = asyncHandlers(async (req, res) => {
  res.json({ message: "deletePlaylist called" });
});



// Export all handlers
module.exports = {
  getAllLIstDetails,
  getAllPlaylistIstDetails,
  createPlaylist,
  addProblemToPlaylist,
  deletePlaylist,
  problemDeleteFromPlaylist,
};
