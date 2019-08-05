<template>
  <div>
    <el-tabs>
      <el-tab-pane label="瓦片请求">
        <el-input v-model="tileUrl"></el-input>
        <el-image :src="tileUrl"></el-image>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tileUrl: ""
    };
  }
};
</script>

<style>
</style>
