<template>
  <div class="search-wrap">
    <div class="flex-box search-content">
      <el-input @change="onSearch" placeholder="请输入内容" v-model="searchContent" class="flex-1">
        <i slot="suffix" style="font-size: 16px; margin: 0 auto; line-height: 40px; cursor: pointer;" class="el-icon-search"></i>
      </el-input>

      <el-button
        class="mg-l16"
        type="primary"
        @click="openDialog('publish_service')">
        发布服务
      </el-button>

      <el-button
        class="mg-l16"
        type="primary"
        @click="openDialog('service_aggrate')">
        服务聚合
      </el-button>
    </div>

    <el-dialog :visible.sync="dlg_publish_service" title="发布服务"></el-dialog>
    <el-dialog :visible.sync="dlg_service_aggrate" title="服务聚合"></el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Search',
    data () {
      return {
        dlg_publish_service: false,
        dlg_service_aggrate: false,
        searchContent: ''
      }
    },
    methods: {
      openDialog(name) {
        this["dlg_" + name] = true
        // console.log(this);
      },
      onSearch(val) {
        this.$emit("search", val)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .search-wrap {
    box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
    background-color: #ffffff;
    padding: 16px 0;
  }
  .search-content {
    width: 1200px;
    margin: 0 auto;
  }
</style>
