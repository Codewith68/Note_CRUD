import app from "./src/app.js"
import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config()

async function connectDb(){
    await mongoose.connect(process.env.MONGO_URI)

    console.log("connected to database")
}

connectDb()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})