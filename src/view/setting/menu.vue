<template>
  <el-menu
    @select="handleSelectMenuItem"
    :default-openeds="active_menu"
    :router="true"
    text-color="#696969"
    style="width: 260px; height: calc(100vh - 60px); overflow-y: auto;"
  >
    <img
      style="display: block; margin: 64px auto 24px; width: 80px; height: auto;"
      src="../../assets/setting-illustration@2x.png"
      alt="setting"
    />
    <div
      style="font-weight: 600; color: #292929; font-size: 20px; text-align: center; margin-bottom: 32px;"
    >系统配置</div>
    <el-submenu index="1">
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

    <el-submenu index="2">
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

    <el-submenu index="3">
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
        <el-menu-item index="3-2">权限管理</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  name: "setting-menu",
  data() {
    return {
      active_menu: ["1"]
    };
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
