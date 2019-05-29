<template>
  <header class="layout-header">
    <div class="content flex-box space-between pd-lr8">
      <span class="title">海图服务发布系统</span>
      <div style="margin-left: auto;">欢迎:admin</div>
      <basis-btn class="mg-l16" @click="dlg_setting_show=true">目录配置</basis-btn>
    </div>
    <el-dialog width="80%" :visible.sync="dlg_setting_show" title="目录配置">
      <catalog-config></catalog-config>
    </el-dialog>
  </header>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      dlg_setting_show: false
    };
  }
};
</script>

<style scoped lang="scss">
.layout-header {
  height: 50px;
  background-image: linear-gradient(to right, #0033ff , #0099ff);
  color: #fff;
  padding: 0 20px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  height: 50px;
}

.title {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
}
</style>
