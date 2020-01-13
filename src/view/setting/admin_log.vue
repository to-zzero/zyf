<template>
  <div>
    <div class="title">系统日志</div>

    <div style="margin: 8px 0;">
      <el-input
        v-model="username"
        style="width: 400px; margin-right: 16px;"
        placeholder="请输入要查询的用户名"
      ></el-input>
      <el-button @click="handlePageChange(1)" type="primary">查询</el-button>
    </div>

    <el-table :data="logList" size="mini">
      <el-table-column label="编号" type="index"></el-table-column>
      <el-table-column label="用户" prop="userName"></el-table-column>
      <el-table-column label="操作" prop="function"></el-table-column>
      <el-table-column label="名称" prop="refName"></el-table-column>
      <el-table-column label="IP地址" prop="ip">
        <!-- <template slot-scope="scope">
          <el-tag type="error" size="mini" v-if="scope.row.status==0">失败</el-tag>
          <el-tag type="success" size="mini" v-if="scope.row.status==1">成功</el-tag>
        </template>-->
      </el-table-column>
      <el-table-column label="时间" prop="createAt"></el-table-column>
    </el-table>
    <el-pagination
      background
      layout="prev, pager, next,sizes"
      :total="total"
      :current-page.sync="page"
      @current-change="handlePageChange"
      @size-change="handleSizeChange"
      :page-sizes="[10,20,50,100]"
      :page-size="size"
    ></el-pagination>
  </div>
</template>

<script>
import api from "../../api";
export default {
  data() {
    return {
      total: 0,
      page: 1,
      size: 10,
      logList: [],
      username: ""
    };
  },
  mounted() {
    this.handlePageChange(1);
  },
  methods: {
    handlePageChange(page) {
      api.admin.getLogList(page, this.size, this.username).then(data => {
        this.total = data.total;
        this.page = data.page;
        // this.size = data.size;
        this.logList = data.list;
      });
    },

    handleSizeChange(size) {
      this.size = size;
      api.admin.getLogList(1, this.size, this.username).then(data => {
        this.total = data.total;
        this.page = data.page;
        // this.size = data.size;
        this.logList = data.list;
      });
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
