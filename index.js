const express = require("express")

const app = express()

app.use(express.json())

const {connection} = require("./configs/db")

const {userRouter} = require("./routes/User.routes")

const {postRouter} = require("./routes/Post.route")

const {authenticate} = require("./middleware/authenticate.middleware")

require("dotenv").config()
// -----------------------------------------------
app.get("/",(req,res)=>{
    res.send("HomePage")
})



//----------------------------User Router-----------------------
app.use("/users",userRouter)

//---------------------------POST ROUTER------------------------
app.use(authenticate)
app.use("/posts",postRouter)


// -------------------SERVER----------------------

app.listen(process.env.port,async()=>{
    try {
        await connection
        console.log("Server connected to Database")
    } catch (error) {
        console.log("Error is", error.message)
    }
    console.log("Server started at port 8080")
})