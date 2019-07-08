<template>
  <el-table :data="authList">
    <el-table-column prop="name" label="用户"></el-table-column>

    <el-table-column prop="token" label="令牌" ></el-table-column>

    <el-table-column prop="" label=""></el-table-column>
  </el-table>
</template>

<script>
export default {
  data() {
    return {
      authList: []
    };
  },
  mounted() {}
};
</script>

<style>
</style>
