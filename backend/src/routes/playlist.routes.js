
import express from "express"
import { verifyUser } from "../controllers/auth.controller"

const playlistRoutes = express.Router()


playlistRoutes.get("/",verifyUser,getAllLIstDetails)
playlistRoutes.get("/:playlistId",verifyUser,getPlaylistDetails)
playlistRoutes.post('/create-playlist',verifyUser,createPlaylist)
playlistRoutes.post("/:playlistId/add-problem",verifyUser,addProblemToPlaylist)
playlistRoutes.delete("/:playlistId",verifyUser,deletePlaylist)
playlistRoutes.delete("/:deleteI/remove-problem",verifyUser,problemDeleteFromPlaylist)

export default playlistRoutes