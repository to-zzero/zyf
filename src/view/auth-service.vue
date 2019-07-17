<template>
  <el-table :data="authList">
    <el-table-column prop="name" label="序号"></el-table-column>
    <el-table-column prop="name" label="授权用户"></el-table-column>

    <el-table-column prop="token" label="单位名称" ></el-table-column>
    <el-table-column prop="token" label="令牌" ></el-table-column>

    <el-table-column prop="" label="操作">
      <div slot-scope="{row}">
        <el-button size="mini">详情</el-button>
        <el-button size="mini" type="danger">删除</el-button>
      </div>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      authList: [{}]
    };
  },
  mounted() {}
};
</script>

<style>
</style>
