const Service = require('egg').Service;
const uuidv4 = require('uuid/v4');



class HomeService extends Service {
    async login(ctx) {

        let { username, password } = ctx;
        let data = await this.app.mysql.query(`SELECT * from userinfo WHERE username='${username}' and password='${password}'`);

        if (data.length !== 0) {
            return {
                code: 1,
                msg: "login success",
                data
            }
        } else {
            return {
                code: 0,
                msg: 'login failed',
                data: "用户名或密码错误！"
            }
        }
    }
    async registry(ctx) {
        let { username, password } = ctx;
        let $flag = await this.app.mysql.query(`SELECT * from userinfo WHERE username='${username}'`);

        //判断用户名是否存在
        if ($flag.length !== 0) {
            this.ctx.body = {
                code: 0,
                msg: "registry failed",
                data: "用户名重复！"
            }
        } else {
            //生成一个uuid
            let uuid = uuidv4();
            //密码加密
            // password = CD(password);

            let userinfo = await this.app.mysql.query(`INSERT INTO userinfo (uuid,username,password) VALUES ('${uuid}','${username}','${password}')`);

            this.ctx.body = {
                code: 1,
                msg: "registry success",
                userinfo
            }
        }
    }

    async getList() {
        let listinfo = await this.app.mysql.select("listinfo")
        console.log(listinfo);

        this.ctx.body = {
            code: 1,
            msg: 'getList success',
            listinfo
        }
    }

    async add(ctx) {
        let { name, password, birthday, city } = ctx;

        let $flag = await this.app.mysql.get('listinfo', { name: name });

        if ($flag) {
            return {
                code: 0,
                msg: "add failed",
                data: "用户名重复！"
            }

        } else {

            try {
                await this.app.mysql.insert('listinfo', { name: `${name}`, password: `${password}`, birthday: `${birthday}`, city: `${city}` })
                return {
                    code: 1,
                    msg: "add success!"
                }
            } catch (err) {
                return {
                    code: 0,
                    msg: "add failed!",
                    err
                }
            }
        }
    }

    async delete(ctx) {
        let { id } = ctx;
        let deldata = await this.app.mysql.delete('listinfo', { id: id });
        if (deldata) {
            return {
                code: 1,
                deldata
            }
        }
    }

    async edit(ctx){
        // let {name,password,birthday,city}=ctx;
        let updateData=await this.app.mysql.update('listinfo',ctx);

        console.log(updateData)

        if(updateData){
            return {
                code:1,
                updateData
            }
        }
    }
}

module.exports = HomeService;