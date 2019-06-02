<template>
  <header class="layout-header">
    <div class="content flex-box space-between pd-lr8">
      <span class="title" @click="$router.push('/')">海图服务发布系统</span>
      <div style="margin-left: auto;">欢迎:admin</div>
      <el-button class="mg-l16" @click="routerTo('/#/setting')">
        系统配置
      </el-button>
    </div>
    <!-- <el-dialog width="80%" :visible.sync="dlg_setting_show" title="目录配置">
      <catalog-config @add="dlg_publish_service = true;"></catalog-config>
    </el-dialog>    -->
  </header>
</template>

<script>
export default {
  name: "LayoutHeader",
  data() {
    return {
      dlg_setting_show: false,
      dlg_publish_service: false,
      value: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }]
    };
  },
  mounted () {
    this.$root.$off('addList')
    this.$root.$on('addList', (val) => {
      this.dlg_publish_service = val
    })
  },
  methods: {
    routerTo (path) {
      window.open(path)
    }
  }
};
</script>

<style scoped lang="scss">
.layout-header {
  height: 60px;
  background-image: linear-gradient(to right, #0033ff , #0099ff);
  color: #fff;
  padding: 0 20px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
}

.title {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
</style>
