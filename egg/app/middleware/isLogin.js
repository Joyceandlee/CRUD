const { decode } = require('../extends/helper')

module.exports = (keys) => async (ctx, next) => {

    let { white } = ctx.app.config;

    let flag = white.map(item => ctx.method == item.method && ctx.path == item.path);

    if (flag[0]) {
        await next()
        return
    }

    //获取请求头中的token
    let token = ctx.get('token');

    try {
        let data = await decode(token, ctx.app.config.keys);
        let { iat } = data;


        let curerntTime = Date.now() - iat;

        let times = 648000000;

        if (curerntTime > times) {
            ctx.status = 401;
            ctx.body = {
                code: 0,
                msg: "用户信息已过期，请重新登录！"
            }
            return;
        }

        ctx.userInfo = data;
        await next()
    } catch (error) {
        ctx.status = 401;
        ctx.body = {
            code: 0,
            msg: "用户权限可能被篡改！"
        }
    }

}