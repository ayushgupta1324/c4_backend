const express = require("express");

const postRouter = express.Router()

const {PostModel} = require("../model/Posts.model")

// ----------------------CREATE POST-------------------------
postRouter.post("/createpost",async(req,res)=>{
    const postContent = req.body;
    try {
        const posts = new PostModel(postContent)
        await posts.save()
        res.send("Post Created")
        
    } catch (error) {
        res.send({"msg":error.message})
    }
})


// ------------------------DISPLAY POSTS------------------------
postRouter.get("/",async(req,res)=>{
    try {
        const posts = await PostModel.find()
        res.send("Posts from Logged in Users")
    } catch (error) {
        res.send({"msg":error.message})
    }
})


// ------------------------DISPLAY TOP POSTS-------------------
postRouter.get("/top",(req,res)=>{
    res.send("Posts with Maximum Comments")
})

// -------------------------DELETE POST------------------------
postRouter.delete("/delete/:id",async(req,res)=>{
    const postID = req.params['id']
    try {
        await PostModel.findByIdAndDelete({_id:postID})
        res.send("Post Deleted")
    } catch (error) {
        res.send({"msg":error.message})
    }
})


// -------------------------UPDATE POST------------------------
postRouter.patch("/update/:id",async(req,res)=>{
    const postID = req.params['id'];
    const payload = req.body;
    try {
        const updatedData = await PostModel.findByIdAndUpdate({_id:postID},payload)
        res.send("Post updated")
    } catch (error) {
        res.send({"msg":error.message})
    }
})

module.exports = {
    postRouter
}