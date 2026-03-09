import mongoose from "mongoose";


const noteSchema=new mongoose.Schema({
    title:String,
    description:String,
    name:String,
    age:Number
})

const noteModel=mongoose.model("collect",noteSchema)

export default noteModel;