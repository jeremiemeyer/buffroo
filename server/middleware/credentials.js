const allowedOrigins = require('../config/allowedOrigins')

const credentials = (req, res, next) => {
    const origin = req.headers.origin

    // console.log('Origin: ', origin)
    // console.log('Allowed Origins:', allowedOrigins);

    if (allowedOrigins.includes(origin)){
        res.header('Access-Control-Allow-Credentials', true)
    }
    next()
}

module.exports = credentials