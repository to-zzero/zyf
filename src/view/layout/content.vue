<template>
  <div class="layout-content_wrap">
    <div class="current mg-b24 flex-box">
      <span style="margin-right: 12px; font-weight: 600; font-size：14px; color: #292929;">当前目录：</span>
      <div
        class="current-tag"
        @click="clearSearch"
      >{{currentSelect.name || '全部'}} {{ currentSelect.name ? '×' : '' }}</div>
    </div>
    <ul class="layout-content pd-lr16 pd-tb16 ul-reset">
      <li class="list-item_wrap" v-for="service in serviceQueryResult.list" :key="service.id">
        <div class="flex-box space-between item-header">
          <span style="font-size: 16px; font-weight: 600;">{{service.name}}</span>
          <!-- <router-link :to="{path :'/info', query: { id: service.id } }" target="_blank">详细信息</router-link> -->
          <span style="font-size: 14px; color: #696969">访问次数: {{service.visit}}</span>
        </div>

        <div class="flex-box align-start">
          <div style="width: 110px; height: 110px;">
            <img :src="`/thumbnail/${service.thumbnail}`" style="width:100%;height:100%">
          </div>
          <ul class="ul-reset mg-l16 relative flex-1">
            <li class="flex-box mg-b8">
              <span style="font-size: 14px; color: #696969;">
                提供单位：
                <span
                  class="tw-b"
                  style="color: #292929;"
                >{{service.metadata.provider || '--'}}</span>
              </span>
            </li>
            <li class="flex-box mg-b8">
              <span style="font-size: 14px; color: #696969;">
                发布时间：
                <span
                  class="tw-b"
                  style="color: #292929;"
                >{{service.metadata.createAt || '--'}}</span>
              </span>
            </li>
            <li class="flex-box mg-b8">
              <span style="font-size: 14px; color: #696969;">
                摘要信息：
                <span
                  class="tw-b"
                  style="color: #292929;"
                >{{service.metadata.abstract || '--'}}</span>
              </span>
            </li>
            <li class="flex-box">
              <span style="font-size: 14px; color: #696969;">关键字：</span>
              <div
                class="tag-item"
                style="color: #fff;"
                v-for="keyword in service.keyword"
                :key="keyword"
              >{{keyword}}</div>
            </li>
            <li class="control-area flex-box">
              <span class="control-item flex-box" style="color: #696969;">
                <router-link
                  class="flex-box"
                  :to="{path :'/info', query: { id: service.id } }"
                  target="_blank"
                >
                  <img
                    src="../../assets/eye@2x.png"
                    style="width: 16px; height: auto; margin-right: 4px;"
                    alt
                  >
                  <span style="color: #696969;">查看</span>
                </router-link>
              </span>
              <span
                class="control-item flex-box"
                style="color: #696969;"
                @click="deleteService(service)"
              >
                <img
                  src="../../assets/delete@2x.png"
                  style="width: 16px; height: auto; margin-right: 4px;"
                  alt
                >
                删除
              </span>
              <span class="control-item flex-box" style="color: #696969;">
                <router-link
                  class="flex-box"
                  :to="{path :'/info_edit', query: { id: service.id } }"
                  target="_blank"
                >
                  <img
                    src="../../assets/edit@2x.png"
                    style="width: 16px; height: auto; margin-right: 4px;"
                    alt
                  >
                  <span style="color: #696969;">编辑</span>
                </router-link>
              </span>
              <div class="switch-wrap control-item">
                <el-switch
                  :width="50"
                  size="small"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :value="service.status"
                  @change="val =>val?startService(service): stopService(service)"
                ></el-switch>
                <span
                  @click="service.status?stopService(service):startService(service)"
                  :style="service.status ? 'left: 15%;top:58%; right: unset;' : 'right:15%;top:58%;'"
                  class="text"
                >{{ !service.status ? 'ON' : 'OFF' }}</span>
              </div>
            </li>
          </ul>
        </div>
      </li>

      <li
        style="text-align: center; font-weight: 600;"
        class="list-item_wrap"
        v-if="!serviceQueryResult.list.length"
      >暂无服务</li>

      <li class="flex-box" style="justify-content: flex-end;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="serviceQueryResult.total"
          :page-size="serviceQueryResult.size"
          @current-change="currentChange"
        ></el-pagination>
      </li>
    </ul>

    <el-dialog :visible.sync="dlg_view" title="查看服务"></el-dialog>
    <el-dialog :visible.sync="dlg_edit" title="修改服务"></el-dialog>
  </div>
</template>

<script>
import api from "../../api";
// import { constants } from "crypto"
export default {
  name: "LayoutContent",
  props: ["serviceQueryResult", "currentSelect"],
  data() {
    return {
      service: this.$props.serviceInfo,
      dlg_publish_service: false,
      dlg_service_aggrate: false,
      dlg_view: false,
      dlg_edit: false
    };
  },
  mounted() {},
  methods: {
    openDialog(name) {
      this["dlg_" + name] = true;
      // console.log(this);
    },
    async deleteService(service) {
      try {
        await this.$confirm(`确定删除服务 ${service.name}`, "删除确认", {
          type: "warning"
        });
        var result = await api.service.service_action(service.id, "delete");
        if (result == "success") {
          this.$emit("reload-catalog");
        }
      } catch (error) {
        return;
      }
    },
    async startService(service) {
      var result = await api.service.service_action(service.id, "on");
      if (result == "success") {
        service.status = true;
      }
    },
    async stopService(service) {
      var result = await api.service.service_action(service.id, "off");
      if (result == "success") {
        service.status = false;
      }
    },
    onSearch(val) {
      this.$emit("search", val);
    },
    clearSearch() {
      if (this.currentSelect.name) {
        this.$emit("clearSearch");
      }
    },
    currentChange(page) {
      this.$emit("page-changed", page);
    }
  }
};
</script>

<style>
.el-pager .number:not(.active),
.btn-prev,
.btn-next,
.el-icon.more {
  background-color: #ffffff !important;
  color: #b1b7cc !important;
}
.el-pager .number.active {
  background: #4874ed !important;
}
.el-icon.more.el-icon-d-arrow-right {
  color: #4874ed !important;
}
</style>


<style scoped lang="scss">
.switch-wrap {
  position: relative;
  .text {
    position: absolute;
    right: 10%;
    top: 50%;
    transform: translateY(-50%);
    color: #fff;
    font-size: 12px;
  }
}
.current-tag {
  border-radius: 4px;
  background-color: #4874ed;
  padding: 4px 8px;
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
  height: 24px;
  border-radius: 4px;
  background-color: #4874ed;
  color: #fff;
  font-size: 12px;
  line-height: 24px;
  padding: 0 8px;
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
