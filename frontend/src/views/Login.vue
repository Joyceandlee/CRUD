<template>
  <div id="loginpage">
    <div id="loginbox">
      <h1>LOGIN</h1>
      <el-form
        :model="ruleForm"
        status-icon
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="username" prop="username">
          <el-input v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="password" prop="password">
          <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')" ref="btn">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        let { username, password } = this.ruleForm;
        if (valid && username && password) {
          this.$axios.post("/api/login", this.ruleForm).then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "恭喜你，登陆成功！",
                type: "success"
              });
              window.localStorage.token = res.data.token;
              setTimeout(() => {
                this.$router.push({ path: "/index" });
              }, 1000);
            } else {
              this.$message.error(res.response.data.data);

              this.ruleForm.username = "";
              this.ruleForm.password = "";
            }
          });
        }
      });
    }
  }
};
</script>

<style>
#loginpage {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  background: url("../assets/bck.jpg") repeat;
}
#loginbox {
  background: #fff;
  opacity: 0.9;
  width: 500px;
  height: 300px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -200px;
  margin-left: -250px;
  border-radius: 10px;
  padding: 30px 50px;
}
</style>