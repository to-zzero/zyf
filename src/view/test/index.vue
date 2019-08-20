<template>
  <div class="container">
    <el-tabs>
      <el-tab-pane label="瓦片请求">
        <Tile></Tile>
      </el-tab-pane>
      <el-tab-pane label="地图">
        <Map />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import Tile from "./tile";
import Map from "./map";

export default {
  components: { Tile, Map },
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
