const { JsonWebTokenError } = require("jsonwebtoken");


const validationErrorMongoDB = (err, res) => {
    // res.status // res.message
    const errorValues = Object.values(err.errors);
    const firstError = errorValues[0];
    console.log(firstError.kind);

    if (firstError.kind === 'minlength') {
        res.json({
            status: 'error',
            message: 'Your password is too short. Minimum length is 8 characters. '
        })
    } else if (firstError.kind = 'user defined') {
        res.json({
            status: 'error',
            message: firstError.message
        })
    } 

   

}

const jsonWebTokenError = (err, res) => {
    res.json({
        status: 'error',
        message: err.message
    })
}



module.exports = (err, req, res, next) => {
   
    if (err.name === 'ValidationError') return validationErrorMongoDB(err, res);
    if (err.name === 'JsonWebTokenError') return jsonWebTokenError(err, res);
        res.json({
            status: 'error',
            message: err.message,
        })
    
    
}