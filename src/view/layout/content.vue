<template>
  <div class="layout-content_wrap">
    <div class="current mg-b24 flex-box">
      <span style="margin-right: 12px; font-weight: 600; font-size：14px; color: #292929;">当前目录：</span>
      <div
        class="current-tag"
        @click="clearSearch"
      >{{current_catalog.name || '全部'}} {{ current_catalog.name ? '×' : '' }}</div>
      <el-tooltip style="margin-left: auto;" placement="bottom">
        <div slot="content">包含聚合服务</div>
        <el-checkbox v-model="with_aggrate" @change="handleAggrateChanged">聚合</el-checkbox>
      </el-tooltip>
    </div>
    <ul class="layout-content pd-lr16 pd-tb16 ul-reset" id="content_list_item">
      <li class="list-item_wrap" v-for="service in service_list.list" :key="service.id">
        <div class="flex-box space-between item-header">
          <span style="font-size: 16px; font-weight: 600;" v-if="service.type==0">{{service.name}}</span>
          <el-badge value="聚" type="primary" v-else>
            <span style="font-size: 16px; font-weight: 600;margin-right:6px">{{service.name}}</span>
          </el-badge>
          <!-- <router-link :to="{path :'/info', query: { id: service.id } }" target="_blank">详细信息</router-link> -->
          <!-- <span style="font-size: 14px; color: #696969">访问次数: {{service.visit}}</span> -->
        </div>

        <div class="flex-box align-start" >
          <div style="width: 110px; height: 110px;">
            <img :src="`./api/service/thumbnail/${service.id}`" style="width:100%;height:100%" />
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
                <span class="tw-b" style="color: #292929;">{{service.pubdate || '--'}}</span>
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
                  v-if="service.status"
                >
                  <img
                    src="../../assets/eye@2x.png"
                    style="width: 16px; height: auto; margin-right: 4px;"
                    alt
                  />
                  <span style="color: #696969;">查看</span>
                </router-link>
                <span v-else style="color: #b1b1b1;cursor:not-allowed">查看</span>
              </span>
              <span
                v-if="canDelete"
                class="control-item flex-box"
                style="color: #696969;"
                @click="deleteService(service)"
              >
                <img
                  src="../../assets/delete@2x.png"
                  style="width: 16px; height: auto; margin-right: 4px;"
                  alt
                />
                删除
              </span>
              <span v-if="canEdit" class="control-item flex-box" style="color: #696969;">
                <router-link
                  class="flex-box"
                  :to="{path :'/info_edit', query: { id: service.id } }"
                  target="_blank"
                >
                  <img
                    src="../../assets/edit@2x.png"
                    style="width: 16px; height: auto; margin-right: 4px;"
                    alt
                  />
                  <span style="color: #696969;">编辑</span>
                </router-link>
              </span>
              <div class="switch-wrap control-item">
                <el-switch
                  :disabled="!canStop"
                  :width="50"
                  size="small"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  :value="service.status"
                  @change="start_stop_Service(service,!service.status)"
                ></el-switch>
                <span
                  @click="start_stop_Service(service,!service.status)"
                  :style="service.status ? 'left: 15%;top:58%; right: unset;' : 'right:15%;top:58%;'"
                  class="text"
                >{{ !service.status ? '开' : '关' }}</span>
              </div>
            </li>
          </ul>
        </div>
      </li>

      <li
        style="text-align: center; font-weight: 600;"
        class="list-item_wrap"
        v-if="!service_list.list.length"
      >暂无服务</li>

      <li class="flex-box" style="justify-content: flex-end;">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="service_list.total"
          :page-size="service_filter.size"
          @current-change="currentChange"
        ></el-pagination>
      </li>
    </ul>
  </div>
</template>

<script>
import api from "../../api";
import { Loading } from "element-ui";
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "LayoutContent",
  data() {
    return {
      with_aggrate: true
    };
  },
  mounted() {
    this.queryService();
  },
  computed: {
    ...mapState([
      "access",
      "service_list",
      "service_filter",
      "current_catalog"
    ]),
    canDelete() {
      return this.access.find(r => r.code == 101).visible;
    },
    canStop() {
      return this.access.find(r => r.code == 102).visible;
    },
    canEdit() {
      return this.access.find(r => r.code == 103).visible;
    }
  },
  methods: {
    ...mapActions(["queryCatalog", "queryService"]),
    ...mapMutations(["setCatalog"]),
    openDialog(name) {
      this["dlg_" + name] = true;
      // console.log(this);
    },
    deleteService(service) {
      this.$confirm(`确定删除服务 ${service.name}`, "删除确认", {
        type: "warning",
        confirmButtonText: "确定",
        cancelButtonText: "取消"
      })
        .then(async () => {
          let loading = this.$loading({
            lock: true,
            text: "正在删除服务...",
            spinner: "el-icon-loading",
            background: "rgba(0, 0, 0, 0.25)"
          });
          api.service
            .service_action(service.id, "delete")
            .then(() => {
              loading.close();
              this.$message({ message: "删除成功", type: "success" });
              this.queryCatalog();
              this.queryService();
            })
            .catch(err => {
              loading.close();
              this.$message({ message: "删除失败：" + err, type: "error" });
            });
        })
        .catch(() => {});
    },
    start_stop_Service(service, start) {
      console.log(service.name + "--" + start);
      if (this.canStop) {
        if (start) {
          this.startService(service);
        } else {
          this.stopService(service);
        }
      }
    },
    async startService(service) {
      let loading = this.$loading({
        text: "正在启动服务...",
        target: "#content_list_item"
      });
      api.service
        .service_action(service.id, "on")
        .then(result => {
          if (result === true) {
            this.queryService();
          }
          loading.close();
        })
        .catch(e => {
          loading.close();
        });
    },
    stopService(service) {
      var loading = this.$loading({
        text: "正在停止服务...",
        target: "#content_list_item"
      });
      api.service
        .service_action(service.id, "off")
        .then(result => {
          if (result === true) {
            this.queryService();
          }
          loading.close();
        })
        .catch(e => {
          loading.close();
        });
    },
    onSearch(val) {
      this.queryService({ name: val });
    },
    clearSearch() {
      this.setCatalog(null);
      this.queryService({ catalogId: null });
    },
    currentChange(page) {
      this.queryService({ page });
    },
    handleAggrateChanged() {
      this.queryService({ aggrate: this.with_aggrate });
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
  padding: 12px 16px;
  margin: 0 16px;
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

.control-item:hover{
  color:#4874ed;
}

.tw-b {
  font-weight: 600;
}
</style>
