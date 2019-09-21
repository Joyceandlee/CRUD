const crypto = require('crypto');
const jwt = require('jsonwebtoken')


//crypto加密
module.exports.CD = (msg) => {
    return crypto.createHmac('sha256', msg).update('password').digest('hex');
}


//jsonwebtoken解密
module.exports.decode = (token, keys) => new Promise((resolve, reject) => {
    jwt.verify(token, keys, (err, data) => {
        if (err) {
            reject(err)
        } else {
            resolve(data)
        }
    })
})