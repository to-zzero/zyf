<template>
  <div>
    <dir class="title">服务授权</dir>
    <el-table :data="authList">
      <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
      <el-table-column prop="userName" label="授权单位" width="150" ></el-table-column>
      <el-table-column prop="token" label="令牌"></el-table-column>
      <el-table-column prop="updateAt" label="更新时间" width="160" header-align="center"></el-table-column>

      <el-table-column width="100" fixed="right">
        <div slot-scope="{row}">
          <!-- <el-button size="mini">详情</el-button> -->
          <!-- <el-button size="mini" type="danger">删除</el-button> -->
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
      authList: [{}]
    };
  },
  mounted() {
    api.serviceAuth.list().then(data => {
      this.authList=data.list
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
