<template>
  <div class="layout-content_wrap">
    <div class="flex-box mg-b16">
      <basis-input @search="onSearch" class="flex-1"/>

      <basis-btn class="mg-l16" @click="openDialog('publish_service')">发布服务</basis-btn>
      <basis-btn class="mg-l16" @click="openDialog('service_aggrate')">服务聚合</basis-btn>
    </div>
    <!-- <basis-scroll height="calc(100vh - 120px)"> -->
    <ul class="layout-content pd-lr16 pd-tb16 ul-reset">
      <li class="list-item_wrap mg-r16" v-for="service in serviceList" :key="service.id">
        <div class="flex-box space-between item-header">
          <span>{{service.name}}</span>
          <a :href="`/service/info/${service.id}`" target="_blank">详细信息</a>
        </div>

        <div class="flex-box align-start">
          <div style="width: 100px; height: 100px; border: 1px solid #ccc;">
            <img :src="`/service/thumbnail/${service.thumbnail}`" style="width:100%;height:100%">
          </div>
          <ul class="ul-reset mg-l16 relative flex-1">
            <li class="flex-box mg-b8">
              <span>提供单位：{{service.metadata.provider}}</span>
            </li>
            <li class="flex-box mg-b8">
              <span>发布时间：{{service.metadata.createAt}}</span>
            </li>
            <li class="flex-box mg-b8">
              <span>摘要信息：{{service.metadata.abstract}}</span>
            </li>
            <li class="flex-box">
              <span>关键字：</span>
              <div class="tag-item" v-for="keyword in service.keyword" :key="keyword">{{keyword}}</div>
            </li>
            <li class="control-area flex-box">
              <el-switch
                size="small"
                active-color="#13ce66"
                inactive-color="#ff4949"
                v-model="service.status"
              ></el-switch>
              <span
                class="control-item"
                style="margin-left:3px"
                @click="itemAction('on')"
              >{{(service.status)?'停止':'开启'}}</span>
              <span class="control-item" @click="openDialog('view')">查看</span>
              <span class="control-item" @click="itemAction('delete')">删除</span>
              <span class="control-item" @click="openDialog('edit')">编辑</span>
            </li>
          </ul>
        </div>
      </li>
    </ul>
    <!-- </basis-scroll> -->
    <el-dialog :visible.sync="dlg_publish_service" title="发布服务"></el-dialog>
    <el-dialog :visible.sync="dlg_view" title="查看服务"></el-dialog>
    <el-dialog :visible.sync="dlg_edit" title="修改服务"></el-dialog>
    <el-dialog :visible.sync="dlg_service_aggrate" title="服务聚合"></el-dialog>
  </div>
</template>

<script>
import { itemOperating } from "@/api";
import { constants } from "crypto";
export default {
  name: "LayoutContent",
  props: ["serviceList"],
  data() {
    return {
      service: this.$props.serviceInfo,
      dlg_publish_service: false,
      dlg_service_aggrate: false,
      dlg_view: false,
      dlg_edit: false,
    };
  },
  mounted() {
    console.log(this.serviceList);
  },
  methods: {
    openDialog(name) {
      this["dlg_" + name] = true;
      console.log(this);
    },
    itemAction(action) {
      this.$message({ message: "敬请期待", type: "warning" });
      itemOperating(action).then(res => {
        console.log(res);
      });
    },
    onSearch(val) {
      this.$emit("search", val);
    }
  }
};
</script>

<style scoped lang="scss">
.relative {
  position: relative;
}

.control-area {
  position: absolute;
  right: 0;
  bottom: 0;
}

.layout-content {
  min-height: calc(100vh - 120px);
  box-sizing: border-box;
}

.list-item_wrap {
  padding: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 24px;
  }
}

.item-header {
  border-bottom: 2px solid #ccc;
  padding-bottom: 8px;
  margin-bottom: 8px;
}

.tag-item {
  border-radius: 4px;
  padding: 4px;
  background: #337ab7;
  color: #fff;
  font-size: 12px;
  &:not(:last-of-type) {
    margin-right: 16px;
  }
}

.control-item {
  margin-left: 16px;
  font-size: 14px;
  cursor: pointer;
}
</style>
