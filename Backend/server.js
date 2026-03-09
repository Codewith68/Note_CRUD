import app from "./src/app.js"
import mongoose from "mongoose"



async function connectDb(){
    await mongoose.connect("mongodb+srv://subratpaleibabul_db_user:FvZSmZeammVt0diM@cluster0.twfovf4.mongodb.net/day-33")

    console.log("connected to database")
}

connectDb()
app.listen(3000,()=>{
    console.log("server is running on port 3000")
})