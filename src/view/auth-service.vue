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
    <el-table :data="authList">
      <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
      <el-table-column prop="userName" label="授权用户" width="150"></el-table-column>
      <el-table-column prop="ip" label="IP" width="150"></el-table-column>
      <el-table-column prop="token" label="令牌"></el-table-column>
      <el-table-column prop="updateAt" label="更新时间" width="160" header-align="center"></el-table-column>
      <el-table-column label="范围" width="80" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button :disabled="!!scope.row.extent" size="mini">查看</el-button>
        </template>
      </el-table-column>

      <!-- <el-table-column width="100" fixed="right">
        <div slot-scope="{row}">
          <el-button size="mini">详情</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </div>
      </el-table-column> -->
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
