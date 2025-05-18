import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/userAuth.routes.js"
import problemRoutes from "./routes/problem.routes.js"
import exectionRoutes from "./routes/execute.routes.js"
import submitRoutes from "./routes/submission.routes.js"
import playlistRoutes from "./routes/playlist.routes.js"
import cors from "cors"

dotenv.config()

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(cors({
  origin: "http://localhost:5173", // frontend origin
  credentials: true, 
}));


app.get("/",(req,res)=>{
    res.send("welcome to my leedcode💪")
})
  
app.use("/api/vi/users",authRoutes)
app.use("/api/vi/problems",problemRoutes)
app.use("/api/vi/execute-code",exectionRoutes)
app.use("/api/vi/submission",submitRoutes)
app.use('/api/vi/playlist',playlistRoutes)


app.listen(port,
    ()=>{
    console.log(`server is running on port ${port}`);
    
})

