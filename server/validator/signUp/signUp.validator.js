const ErrorHandler = require("../../utils/customError");

const  signUpValidator=(req,res,next)=>{

    const {name,email,password}=req.body;
    if(!name || !email || !password){

        return next(new ErrorHandler("ghghgh",401))
    }
    next();

}
module.exports=signUpValidator;