<template>
  <header class="layout-header">
    <div class="content flex-box space-between pd-lr8">
      <span class="title">海图服务发布系统</span>

      <div>
        user-area
      </div>
    </div>
  </header>
</template>

<script>
  export default {
    name: 'LayoutHeader',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout-header {
    height: 50px;
    background: #337AB7;
    color: #fff;
  }

  .content {
    max-width: 1200px;
    margin: 0 auto;
    height: 50px;
  }

  .title {
    font-size: 24px;
    color: #fff;
    font-weight: bold;
  }
</style>
