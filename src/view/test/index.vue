<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="瓦片请求">
        <Tile></Tile>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tile from "./tile";

export default {
  components: { Tile },
  data() {
    return {
      tileUrl: ""
    };
  }
};
</script>

<style>
.container {
  margin: 6px;
}
</style>
