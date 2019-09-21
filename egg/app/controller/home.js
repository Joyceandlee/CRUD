'use strict';

const Controller = require('egg').Controller;
const jwt = require('jsonwebtoken');

class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  //登录
  async login(ctx) {
    let { username, password } = ctx.request.body;

    if (!username || !password) {
      this.ctx.body = {
        code: 0,
        msg: 'login failed',
        data: "用户信息不完整！"
      }
    } else {
      try {
        //与数据库信息进行比对
        let res = await this.ctx.service.home.login(ctx.request.body);

        if (res.code === 1) {
          //删除密码
          delete res.data.password;
          //jsonwebtoken加密  返回token
          const token = jwt.sign({
            data: res.data,//用户信息
            iat: Date.now()
          }, this.app.config.keys);

          //返回状态
          this.ctx.status = 200;
          this.ctx.body = {
            code: 1,
            msg: "恭喜泥，登陆成功！",
            token
          }
        }
        if (res.code === 0) {
          this.ctx.status = 401;
          this.ctx.body = res;
        }
      } catch (error) {
        this.ctx.body = error.response;
      }
    }
  }

  //注册
  async registry(ctx) {
    let { username, password } = ctx.request.body;
    if (!username || !password) {
      this.ctx.body = {
        code: 0,
        msg: 'login failed',
        data: "用户信息不完整！"
      }
    }
    await this.ctx.service.home.registry(ctx.request.body)
  }

  async getList() {
    await this.ctx.service.home.getList()
  }

  async add(ctx) {
    let res = await this.ctx.service.home.add(ctx.request.body);
    if (res.code == 1) {
      this.ctx.status = 200;
      this.ctx.body = {
        code: 1,
        msg: "添加成功！"
      }
    } else {
      this.ctx.status = 401;
      this.ctx.body = res;
    }

  }

  async delete(ctx){
    let res=await this.ctx.service.home.delete(ctx.request.query)

    if(res.code===1){
      this.ctx.status=200;
      this.ctx.body=res;
    }
  }

  async edit(ctx){
    let res=await this.ctx.service.home.edit(ctx.request.body)

    if(res.code==1){
      this.ctx.status=200;
      this.ctx.body=res
    }
  }
}

module.exports = HomeController;
