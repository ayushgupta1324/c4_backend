const express = require("express")

const userRouter = express.Router()

const {userModel, UserModel} = require("../model/User.model")

const jwt = require("jsonwebtoken")

const bcrypt = require("bcrypt")
// --------------------------REGISTER----------------------------
userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password,age,city} = req.body
    try {
        bcrypt.hash(password,5,async (err,hash)=>{
            if(err)
            {
                res.send({"msg":"Some Error","Error":err.message})
            }
            else
            {
                const userDetail = new UserModel({name,email,gender,password:hash,age,city});
                await userDetail.save()
                res.send({"msg":"User Registered Successfully"})
            }
        })
    } catch (error) {
        res.send({"msg":"Could not Register","Error is":error.message})
    }
})


// -------------------------------LOGIN---------------------------------
userRouter.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    try {
        const loggedUser = await UserModel.find({email})
        console.log(loggedUser)
        if(loggedUser.length>0)
        {
            bcrypt.compare(password,loggedUser[0].password,(err,result)=>{
                if(result)
                {
                    let token = jwt.sign({ userID:loggedUser[0]._id}, 'shhhhh');
                    res.send({"msg":"User Logged in successfully","token":token})
                }
                else
                {
                    res.send({"msg":"User not found, please Check"})
                }
            })
        }
        else
        {
            res.send({"msg":"Invalid Details"})
        }
    } catch (error) {
        res.send({"Error msg":error.message})
    }
})

// -------------------------export-----------------------------
module.exports = {
    userRouter
}