<template>
  <basis-scroll height="calc(100vh - 66px)">
    <div class="layout-content pd-lr16 pd-tb16">
      content
    </div>
  </basis-scroll>
</template>

<script>
  export default {
    name: 'LayoutContent',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout-content {
    background: #eee;
    min-height: calc(100vh - 66px);
    box-sizing: border-box;
  }
</style>
