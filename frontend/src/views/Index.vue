<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-row class="tac">
          <el-col :span="24">
            <el-menu default-active="2" class="el-menu-vertical-demo">
              <router-link to="/index/work">
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">工作台</span>
                </el-menu-item>
              </router-link>

              <router-link to="/index/list">
                <el-menu-item index="2">
                  <i class="el-icon-document"></i>
                  <span slot="title">用户列表</span>
                </el-menu-item>
              </router-link>

              <el-menu-item index="3">
                <i class="el-icon-setting"></i>
                <span slot="title">员工列表</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>
      <el-container>
        <el-header>
          <h3>
            后台管理系统
            <el-button type="primary" class="addbtn" size="mini" @click="dialogVisible = true">添加用户</el-button>
          </h3>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>

    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="姓名" prop="pass">
          <el-input  v-model="ruleForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="checkPass">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="生日" prop="checkPass">
          <el-input  v-model="ruleForm.birthday" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" prop="age">
          <el-input v-model="ruleForm.city"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
exports.default = {
  name: "Index",
  data() {
    return {
      dialogVisible: false,
      ruleForm:{
        name:'',
        password:'',
        birthday:'',
        city:''
      }
    };
  },
  methods: {
    addUser() {
      this.dialogVisible = false;
      console.log(this.ruleForm)
      this.$axios.post('/api/add',this.ruleForm,{
        headers:{
          token:window.localStorage.token
        }
      })
      .then(res=>{
        if(res.data.code==1){
          this.$message.success(res.data.msg)
          this.$router.go(0)
        }else{
          this.$message.error(res.response.data.msg)
        }
      })
    }
  }
};
</script>
<style>
a {
  text-decoration: none;
  color: #000;
}
h3 {
  margin: 0;
  padding: 0;
}
.addbtn {
  display: inline-block;
  position: absolute;
  right: 30px;
  top: 15px;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 200px;
  position: relative;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-aside {
  line-height: 260px;
}
.el-col {
  margin-top: 50px;
}
.el-main {
  height: 500px;
}
</style>