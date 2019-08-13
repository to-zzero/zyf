<template>
  <el-menu
    @select="handleSelectMenuItem"
    :default-openeds="active_menu"
    :router="true"
    text-color="#696969"
    style="width: 260px; height: calc(100vh - 60px); overflow-y: auto;"
  >
    <!-- <img
      style="display: block; margin: 64px auto 24px; width: 80px; height: auto;"
      src="../../assets/setting-illustration@2x.png"
      alt="setting"
    /> -->
    <div
      style="font-weight: 600; color: #292929; font-size: 20px; text-align: center; margin-bottom: 16px;margin-top: 16px;"
    >系统配置</div>
    <el-submenu index="1" v-if="canMgrDic">
      <template slot="title">
        <img
          src="../../assets/dictionary@2x.png"
          style="width: 16px; height: 16px; display: inline-block; margin-right: 16px;"
          alt
        />
        <span>服务字典</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="1-1"
          :class="{ 'is-active': $route.path === '/setting/catalog' }"
          :route="{ path: '/setting/catalog' }"
        >服务目录</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2" v-if="canMgrAuth">
      <template slot="title">
        <img
          src="../../assets/management@2x.png"
          style="width: 16px; height: 16px; display: inline-block; margin-right: 16px;"
          alt
        />
        <span>授权管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :class="{ 'is-active': $route.path === '/setting/authservice' }"
          :route="{ path: '/setting/authservice' }"
          index="2-1"
        >服务授权</el-menu-item>
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3" v-if="canMgrSys">
      <template slot="title">
        <img
          src="../../assets/system@2x.png"
          style="width: 16px; height: 16px; display: inline-block; margin-right: 16px;"
          alt
        />
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="3-1"
          :class="{ 'is-active': $route.path === '/setting/users' }"
          :route="{ path: '/setting/users' }"
        >用户管理</el-menu-item>
        <el-menu-item
          index="3-2"
          :class="{ 'is-active': $route.path === '/setting/systemlog' }"
          :route="{ path: '/setting/systemlog' }"
        >系统日志</el-menu-item>
        <!-- <el-menu-item
          index="3-3"
          :class="{ 'is-active': $route.path === '/setting/servicelog' }"
          :route="{ path: '/setting/servicelog' }"
        >服务日志</el-menu-item>-->
      </el-menu-item-group>
    </el-submenu>
    <el-submenu index="4" v-if="canMgrMon">
      <template slot="title">
        <img
          src="../../assets/system@2x.png"
          style="width: 16px; height: 16px; display: inline-block; margin-right: 16px;"
          alt
        />
        <span>服务监控</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          index="4-1"
          :class="{ 'is-active': $route.path === '/setting/status_monitor' }"
          :route="{ path: '/setting/status_monitor' }"
        >状态监控</el-menu-item>
        <el-menu-item
          index="4-2"
          :class="{ 'is-active': $route.path === '/setting/safety_warning' }"
          :route="{ path: '/setting/safety_warning' }"
        >安全警告</el-menu-item>
        <el-menu-item
          index="4-3"
          :class="{ 'is-active': $route.path === '/setting/discharge_count' }"
          :route="{ path: '/setting/discharge_count' }"
        >流量统计</el-menu-item>
        <el-menu-item
          index="4-4"
          :class="{ 'is-active': $route.path === '/setting/access_log' }"
          :route="{ path: '/setting/access_log' }"
        >访问日志</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "setting-menu",
  data() {
    return {
      active_menu: ["1"]
    };
  },
  computed: {
    ...mapState(["access"]),
    canMgrDic() {
      return this.access.find(r => r.code == 105).visible;
    },
    canMgrAuth() {
      return this.access.find(r => r.code == 106).visible;
    },
    canMgrSys() {
      return this.access.find(r => r.code == 107).visible;
    },
    canMgrMon() {
      return this.access.find(r => r.code == 108).visible;
    }
  },
  methods: {
    handleSelectMenuItem(key, keyPath) {
      this.active_menu = [keyPath[0]];
    }
  }
};
</script>

<style lang="scss">
.el-submenu__title {
  font-weight: 600;
}
.el-submenu {
  .el-submenu__icon-arrow {
    font-size: 16px !important;
    margin-top: -8px !important;
  }
  &.is-opened {
    .el-submenu__icon-arrow {
      color: #4874ed !important;
    }
  }
  .el-menu-item.is-active {
    background-color: #f4f4f9 !important;
    color: #4874ed !important;
    border-left: 6px solid #4874ed !important;
    padding-left: 34px !important;
  }
}
</style>
