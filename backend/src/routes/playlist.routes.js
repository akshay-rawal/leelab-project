import express from "express";
import { verifyUser } from "../controllers/auth.controller.js";

import { getPlaylistDetails, getAllPlaylistDetails, createPlaylist, addProblemToPlaylist, deletePlaylist,problemDeleteFromPlaylist} from "../controllers/playlist.controller.js";
const playlistRoutes = express.Router();

playlistRoutes.get("/", verifyUser, getAllPlaylistDetails);
playlistRoutes.get("/:playlistId", verifyUser, getPlaylistDetails);
playlistRoutes.post("/create-playlist", verifyUser, createPlaylist);
playlistRoutes.post("/:playlistId/add-problem",  verifyUser,addProblemToPlaylist);
playlistRoutes.delete("/:playlistId", verifyUser, deletePlaylist);
playlistRoutes.delete("/:problemId/remove-problem",verifyUser,problemDeleteFromPlaylist);




export default playlistRoutes;
