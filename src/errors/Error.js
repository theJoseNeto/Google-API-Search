module.exports = class APIError extends Error{

    constructor(message, statusCode){
        this.statusCode = statusCode;
        this.message = message;
    
    }

}