
// Custon error handler function
const errorHandler = (err, req, res, next) => {
// set Status code. If statusCode is there, use it otherwise use 500 status code
// 500 - server error
    const statusCode = res.statusCode ? res.statusCode : 500
    res.status(statusCode);
    res.json({
        message: err.message, 
        // only show if not in production
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    })

}

module.exports = {errorHandler};