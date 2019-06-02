<template>
  <div class="setting-wrap">
    <el-header style="padding: 0;">
      <layout-header/>
    </el-header>

    <div class="flex-box align-start">
      <menu-list />

      <div style="padding: 32px 40px; overflow-y: auto; flex: 1;">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
  import LayoutHeader from '../layout/header'
  import MenuList from './menu' 
  export default {
    name: 'setting-wrap',
    components: {
      LayoutHeader,
      MenuList
    }
  }
</script>

<style lang="scss" scoped>
  .setting-wrap {
    min-width: 1200px;
  }
</style>
