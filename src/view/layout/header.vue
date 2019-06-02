<template>
  <header class="layout-header">
    <div class="content flex-box space-between pd-lr8">
      <span class="title" @click="$router.push('/')">海图服务发布系统</span>
      <div style="margin-left: auto;">欢迎:admin</div>
      <el-button class="mg-l16" @click="routerTo('/#/setting')">
        系统配置
      </el-button>
    </div>
    <el-dialog width="80%" :visible.sync="dlg_setting_show" title="目录配置">
      <catalog-config @add="dlg_publish_service = true;"></catalog-config>
    </el-dialog>

    <el-dialog width="610px" :visible.sync="dlg_publish_service" title="添加子目录">
      <ul class="ul-reset">
        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">选择SD文件：</div>
          <el-input style="width: 440px;">
            <i class="el-icon-files" slot="suffix" style="line-height: 40px; cursor: pointer;"></i>
          </el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务名称：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">关键字：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">所属分组：</div>
          <el-select style="width: 440px;" v-model="value" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">提供单位：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </li>
      </ul>
    </el-dialog>
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
      this.dlg_setting_show = val
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
