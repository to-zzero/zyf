<template>
  <div class="layout-content_wrap">
    <div class="current mg-b24 flex-box">
      <span style="margin-right: 12px; font-weight: 600; font-size：14px; color: #292929;">当前目录：</span>
      <div v-if="currentSelect.name" class="current-tag" @click="$emit('clearSearch')">
        {{currentSelect.name}} ×
      </div>
    </div>
    <ul class="layout-content pd-lr16 pd-tb16 ul-reset">
      <li class="list-item_wrap" v-for="service in serviceList" :key="service.id">
        <div class="flex-box space-between item-header">
          <span style="font-size: 16px; font-weight: 600;">{{service.name}}</span>
          <router-link :to="{path :'/info', query: { id: service.id } }" target="_blank">详细信息</router-link>
        </div>

        <div class="flex-box align-start">
          <div style="width: 100px; height: 100px; border: 1px solid #ccc;">
            <img :src="`/thumbnail/${service.thumbnail}`" style="width:100%;height:100%">
          </div>
          <ul class="ul-reset mg-l16 relative flex-1">
            <li class="flex-box mg-b8">
              <span>提供单位：<span class="tw-b">{{service.metadata.provider || '--'}}</span></span>
            </li>
            <li class="flex-box mg-b8">
              <span>发布时间：<span class="tw-b">{{service.metadata.createAt || '--'}}</span></span>
            </li>
            <li class="flex-box mg-b8">
              <span>摘要信息：<span class="tw-b">{{service.metadata.abstract || '--'}}</span></span>
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

    <el-dialog :visible.sync="dlg_view" title="查看服务"></el-dialog>
    <el-dialog :visible.sync="dlg_edit" title="修改服务"></el-dialog>
  </div>
</template>

<script>
import { itemOperating } from "@/api";
// import { constants } from "crypto"
export default {
  name: "LayoutContent",
  props: ["serviceList", 'currentSelect'],
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
    // console.log(this.serviceList)
  },
  methods: {
    openDialog(name) {
      this["dlg_" + name] = true
      // console.log(this);
    },
    itemAction(action) {
      this.$message({ message: "敬请期待", type: "warning" })
      itemOperating(action)
    },
    onSearch(val) {
      this.$emit("search", val)
    }
  }
};
</script>

<style scoped lang="scss">
.current-tag {
  border-radius: 4px;
  background-color: #4874ed;
  padding: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
.current {
  padding: 12px 32px;
  border-radius: 4px;
  box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
  background-color: #ffffff;
  height: 64px;
  box-sizing: border-box;
}

.layout-content_wrap {
  padding: 4px 0 4px 4px;
}
.relative {
  position: relative;
}

.control-area {
  position: absolute;
  right: 0;
  bottom: 0;
}

.layout-content {
  box-sizing: border-box;
}

.list-item_wrap {
  padding: 24px 32px;
  border-radius: 4px;
  box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
  background-color: #ffffff;
  margin-bottom: 16px;

  &:last-of-type {
    margin-bottom: 24px;
  }
}

.item-header {
  border-bottom: 1px dashed #dfe3e9;
  padding-bottom: 16px;
  margin-bottom: 24px;
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

.tw-b {
  font-weight: 600;
}
</style>
