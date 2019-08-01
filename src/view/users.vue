<template>
  <div>
    <div class="title">用户管理</div>
    <!-- <el-button type="primary" @click="add_user_dlg=true" size="mini" style="margin-bottom:6px">添加</el-button> -->

    <el-dialog :title="`授权(${cur_user.realname||cur_user.name})`" :visible.sync="add_user_dlg">
      <!-- <el-form :inline="true" :model="userInfo"> -->
      <!-- <el-form-item label="用户名" prop="username">
          <el-input placeholder="用户名" v-model="userInfo.username"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="密码" prop="password">
          <el-input placeholder="密码" type="password" v-model="userInfo.password"></el-input>
      </el-form-item>-->
      <!-- <el-form-item label="用户权限:" prop="access"> -->
      <el-checkbox-group v-model="auth">
        <el-checkbox
          v-for="acc in access"
          :label="acc.code"
          :key="acc.code"
          style="width:100px"
        >{{acc.name}}</el-checkbox>
      </el-checkbox-group>
      <!-- </el-form-item> -->
      <!-- </el-form> -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="add_user_dlg = false">取 消</el-button>
        <el-button type="primary" @click="authUser">确 定</el-button>
      </span>
    </el-dialog>

    <el-table border :data="users" size="mini">
      <el-table-column width="100" label="编号" type="index"></el-table-column>
      <el-table-column label="用户名" prop="name"></el-table-column>
      <el-table-column label="实名" prop="realname"></el-table-column>
      <el-table-column label="部门" prop="departmentName"></el-table-column>
      <el-table-column label="创建时间" prop="cjsj"></el-table-column>
      <el-table-column label="操作" align="center" width="100">
        <template slot-scope="{row}">
          <el-button v-if="row.name!='admin'" size="mini" @click="openDlg(row)">授权</el-button>
          <!-- <el-button size="mini" @click="add_user_dlg=true">编辑</el-button> -->
          <!-- <el-button size="mini" @click="deleteUser">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
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
      // edit_user: false,
      // userInfo: { access: [] }
      auth: [],
      cur_user: {}
    };
  },
  computed: {
    ...mapState(["access"])
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
