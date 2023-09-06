class ErrorHandler extends Error {
    constructor(message,statuscode){
        super(message);
        this.statuscode = statuscode;

        ErrorHandler.captureStackTrace(this, this.constructor)
    }
}

module.exports = ErrorHandler