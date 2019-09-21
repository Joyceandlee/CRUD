const jwt=require('jsonwebtoken')

//jsonwebtoken解密
const decode=(token,keys)=>new Promise((resolve,reject)=>{
    jwt.verify(token,keys,(err,data)=>{
        if(err){
            reject(err)
        }else{
            resolve(data)
        }
    })
})

// module.exports=(keys)=>async (ctx,next)=>{

// }