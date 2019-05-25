<template>
  <basis-scroll
    height="calc(100vh - 66px)"
    width="220">
    <ul class="layout-menu ul-reset">
      <li>123</li>
      <li>456</li>
    </ul>
  </basis-scroll>
</template>

<script>
  export default {
    name: 'LayoutMenu',
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout-menu {
    min-height: calc(100vh - 66px);
    background: #777777;
  }
</style>
