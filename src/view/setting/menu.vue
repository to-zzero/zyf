<template>
  <el-menu
    style="width: 260px; height: calc(100vh - 60px); overflow-y: auto;">
    <el-submenu index="1">
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>服务字典</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="1-1">服务目录</el-menu-item>
        <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="2">
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>授权管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="2-1">服务授权</el-menu-item>
        <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
      </el-menu-item-group>
    </el-submenu>

    <el-submenu index="3">
      <template slot="title">
        <!-- <i class="el-icon-location"></i> -->
        <span>系统管理</span>
      </template>
      <el-menu-item-group>
        <!-- <template slot="title">分组一</template> -->
        <el-menu-item index="3-1">
          <router-link to="/setting/user_management">
            用户管理
          </router-link>
        </el-menu-item>
        <el-menu-item index="3-2">权限管理</el-menu-item>
        <!-- <el-menu-item index="1-2">选项2</el-menu-item> -->
      </el-menu-item-group>
    </el-submenu>

  </el-menu>
</template>

<script>
  export default {
    name: 'setting-menu'
  }
</script>

<style lang="scss">
  .el-submenu__title {
    font-weight: 600;
  }
</style>
