<template>
  <div>
    <div class="title">用户管理</div>

    <el-dialog :title="`授权(${cur_user.realname||cur_user.name})`" :visible.sync="add_user_dlg">
      <el-checkbox-group v-model="auth">
        <el-checkbox
          v-for="acc in access"
          :label="acc.code"
          :key="acc.code"
          style="width:100px"
        >{{acc.name}}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_user_dlg = false">取 消</el-button>
        <el-button type="primary" @click="authUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-table border :data="users" size="mini">
      <el-table-column width="100" label="编号" type="index"></el-table-column>
      <el-table-column label="用户名" prop="name">
        <template slot-scope="{row}">
          {{row.name==userName?(row.name+" (我)"):row.name}}
        </template>
      </el-table-column>
      <el-table-column label="实名" prop="realname"></el-table-column>
      <el-table-column label="部门" prop="departmentName"></el-table-column>
      <el-table-column label="创建时间" prop="cjsj"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="{row}">
          <el-button v-if="row.name!='admin'" size="mini" @click="openDlg(row)">授权</el-button>
          <!-- <el-button v-else size="mini" @click="show_reset_psw_dlg=!show_reset_psw_dlg" style="padding: 6px;">修改密码</el-button> -->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="修改密码" :visible.sync="show_reset_psw_dlg"  width="400px" size="mini" center>
      <el-form :inline="true" :model="reset_psw" size="mini" label-width="120px">
        <el-form-item label="旧密码：">
          <el-input type="password" :show-password="true" v-model="reset_psw.old_psw"/>
        </el-form-item>
        <el-form-item label="新密码：">
          <el-input type="password" :show-password="true" v-model="reset_psw.new_psw"/>
        </el-form-item>
        <el-form-item label="确认新密码：">
          <el-input type="password" :show-password="true"  v-model="reset_psw.new_psw2"/>
        </el-form-item>
      </el-form>
      <span slot="footer" >
        <el-button type="primary" size="mini" @click="onChangePsw">修改</el-button>
        <el-button @click="show_reset_psw_dlg=false" size="mini">取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import api from "../api";
export default {
  data() {
    return {
      users: [],
      add_user_dlg: false,
      auth: [],
      cur_user: {},
      show_reset_psw_dlg:false,
      reset_psw:{
        old_psw:"",
        new_psw:"",
        new_psw2:""
      }
    };
  },
  computed: {
    ...mapState(["access", "userName"])
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      api.admin.userList().then(users => {
        this.users = users;
      });
    },
    authUser() {
      var load = this.$loading({ text: "保存中..." });
      api.admin
        .auth(this.auth, this.cur_user.id)
        .then(data => {
          load.close();
          if (data == "success") {
            this.$message({ message: "保存成功", type: "success" });
            this.add_user_dlg = false;
            this.load();
          } else {
            this.$message({ message: "保存失败", type: "error" });
          }
        })
        .catch(err => {
          load.close();
        });
    },
    openDlg(row) {
      this.cur_user = row;
      var access = JSON.parse(row.auth) || [];
      this.$set(this, "auth", access);
      this.add_user_dlg = true;
    },
    onChangePsw(){
      console.log(this.reset_psw)
      if(!this.reset_psw.old_psw){
        return this.$message({message:"请输入旧密码",type:"error"})
      }

      if(!this.reset_psw.new_psw){
        return this.$message({message:"请输入新密码",type:"error"})
      }

      if(this.reset_psw.new_psw !=this.reset_psw.new_psw2){
        return this.$message({message:"两次新密码不一致",type:"error"})
      }

      api.admin.changePsw(this.reset_psw.old_psw,this.reset_psw.new_psw).then(data=>{
        this.$message({message:'修改成功',type:"success"})
        this.show_reset_psw_dlg=false
        return
      })
    }
  }
};
</script>

<style>
.title {
  font-size: 20px;
  font-weight: 600;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
  color: #292929;
  margin-bottom: 24px;
}
</style>
