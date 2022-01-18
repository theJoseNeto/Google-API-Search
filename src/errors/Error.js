module.exports = class APIError {

    constructor(message, statusCode){
        this.statusCode = statusCode;
        this.message = message;
    
    }

}