<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="Id" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <p>姓名: {{ scope.row.name }}</p>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.name }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column label="生日" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.birthday }}</span>
        </template>
      </el-table-column>

      <el-table-column label="城市" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.city }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    

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
        <el-button type="primary" @click="editUser()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
exports.default = {
  name: "List",
  data() {
    return {
      tableData: [],
       dialogVisible: false,
      ruleForm:{
        name:'',
        password:'',
        birthday:'',
        city:''
      }
    };
  },
  created() {
    this.$axios.post("/api/getlist").then(res => {
      if (res.data.code === 1) {
        this.tableData = res.data.listinfo;
      }
    });
  },
  methods: {
    editUser(){
      this.dialogVisible=false;

      console.log(this.ruleForm)

      this.$axios.post('/api/edit',this.ruleForm)
      .then(res=>{
        console.log(res)
      })
      .catch(err=>{
        console.log(err.response.data)
      })
    },
    handleEdit(index, row) {
      this.dialogVisible = true
      console.log(index, row);
      // let {name,password,city,birthday}=row;
      this.ruleForm=row;
      
    },
    handleDelete(index, row) {
      console.log(index, row.id);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true
      })
        .then(() => {
          this.$axios.delete("/api/delete?id="+row.id).then(res => {
            console.log(res);
            if (res.data.code == 1) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
            this.$router.go(0)
          }).catch(err=>{
            console.log(err.reponse.data)
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>