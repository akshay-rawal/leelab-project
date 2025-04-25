import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/userAuth.routes.js"

dotenv.config()

const app = express()
const port = process.env.PORT


app.use(express.json())

app.get("/",(req,res)=>{
    res.send("welcome to my leedcode💪")
})

app.use("/api/vi/users",authRoutes)


app.listen(port,
    ()=>{
    console.log(`server is running on port ${port}`);
    
})

