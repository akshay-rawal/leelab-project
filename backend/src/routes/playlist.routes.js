import express from "express";
import { verifyUser } from "../controllers/auth.controller.js";

import { getPlaylistDetails, getAllPlaylistIstDetails, createPlaylist, addProblemToPlaylist, deletePlaylist,problemDeleteFromPlaylist} from "../controllers/playlist.controller.js";
const playlistRoutes = express.Router();

playlistRoutes.get("/", verifyUser, getAllPlaylistIstDetails);
playlistRoutes.get("/:playlistId", verifyUser, getPlaylistDetails);
playlistRoutes.post("/create-playlist", verifyUser, createPlaylist);
playlistRoutes.post("/:playlistId/add-problem",  verifyUser,addProblemToPlaylist);
playlistRoutes.delete("/:playlistId", verifyUser, deletePlaylist);
playlistRoutes.delete("/:deleteI/remove-problem",verifyUser,problemDeleteFromPlaylist);




export default playlistRoutes;
