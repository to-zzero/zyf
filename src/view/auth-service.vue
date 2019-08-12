<template>
  <div>
    <dir class="title">服务授权</dir>
    <el-button type="primary" @click="add_auth_dlg=true" size="mini" style="margin-bottom:6px">添加</el-button>
    <el-dialog>
      <el-form label-width="80">
        <el-form-item label="用户"></el-form-item>
        <el-form-item label="IP"></el-form-item>
        <el-form-item label="范围"></el-form-item>
      </el-form>
    </el-dialog>
    <el-table :data="authList" border>
      <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
      <el-table-column prop="userName" label="授权用户" width="150"></el-table-column>
      <el-table-column prop="ip" label="IP限制" width="150"></el-table-column>
      <el-table-column prop="token" label="令牌"></el-table-column>
      <el-table-column prop="updateAt" label="更新时间" width="160" header-align="center"></el-table-column>
      <el-table-column label="范围限制" width="80" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.extent" size="mini" type="danger">受限</el-tag>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="150" fixed="right" label="操作" align="center" >
        <div slot-scope="{scope}">
          <el-button size="mini" @click="editAuth(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteAuth(scope.row)">删除</el-button>
        </div>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      add_auth_dlg: false,
      authList: [{}]
    };
  },
  mounted() {
    api.serviceAuth.list().then(data => {
      this.authList = data.list;
    });
  },
  methods: {
    editAuth(auth) {
      debugger;
    },
    deleteAuth(auth) {
      debugger;
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
