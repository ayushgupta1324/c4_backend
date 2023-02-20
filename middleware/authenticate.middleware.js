const jwt = require("jsonwebtoken")

const authenticate = (req,res,next) =>{
    const token = req.headers.authorization;
    if(token){
        jwt.verify(token,"evaluation",(err,decoded)=>{
            if(decoded)
            {
                req.body.loggedUser = decoded.userID
                next()
            }
            else
            {
                res.send({"message":"Not Logged in"})
            }
        })
    }
    else
    {
        res.send({"message":"Login Please"})
    }
}


module.exports = {
    authenticate
}