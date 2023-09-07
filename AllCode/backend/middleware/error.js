const ErrorHandler = require('../util/errorHandler');

module.exports = (err, req, res, next) =>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // MongoDB error Handling
    if(err.name === "CastError"){
        const message = `Resource not found: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // Mongoose duplicate error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} entered ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT error 
    if(err.name === "jsonWebTokenError"){
        const message = `Json webtoken is inalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    // wrong JWT expire error 
    if(err.name === "TokenEExpiredrror"){
        const message = `Json webtoken is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success:false,
        message: err.message,
        // error:err.stack,
        // error:err,
    })
};