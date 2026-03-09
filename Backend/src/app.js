import express from "express"
import morgan from "morgan"
import noteModel from "./models/note.model.js"
import cors from "cors"



const app=express()
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())


app.post("/notes",async(req,res)=>{
    const {title,description,name,age}=req.body
    const newNote=await noteModel.create({
        title:title,
        description:description,
        name:name,
        age:age
    })
    res.status(201).json({
        message:"Note added successfully",
        data:newNote
    })

})

app.get("/notes",async(req,res)=>{
    const notes=await noteModel.find()

    res.status(200).json({
        message:"Notes fetched successfully",
        data:notes
    })
})

app.get("/notes/:id",async(req,res)=>{
    const {id}=req.params
    const note=await noteModel.findOne({_id:id})
    if(!note){
        return res.status(404).json({
            message:"Note not found"
        })
    }
    res.status(200).json({
        message:"Note fetched successfully",
        data:note
    })
})

app.patch("/notes/:id",async(req,res)=>{
    const {id}=req.params
    const {title,description,name,age}=req.body
    const note=await noteModel.findByIdAndUpdate({_id:id},{
        title,
        description,
        name,
        age
    },{
        new:true
    })
    if(!note){
        return res.status(404).json({
            message:"Note not found"
        })
    }
    res.status(200).json({
        message:"Note updated successfully",
        data:note
    })
})

app.delete("/notes/:id",async(req,res)=>{
    const {id}=req.params
    const note=await noteModel.findByIdAndDelete({_id:id})
    if(!note){
        return res.status(404).json({
            message:"Note not found"
        })
    }
    res.status(200).json({
        message:"Note deleted successfully",
        data:note
    })
})

export default app;
