const crypto = require('crypto');


//crypto加密
module.exports.CD = (msg) => {
    return crypto.createHmac('sha256', msg).update('password').digest('hex');
}
//jsonwebtoken加密

//token解密
module.exports.Decode = (token) => {
    return jwt.verify(token, 'secret')
}