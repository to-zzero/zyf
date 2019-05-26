<template>
  <section class="layout">
    <layout-header />

    <div class="flex-box layout-wrap">
      <layout-menu />
      <layout-content class="flex-1 mg-l16" />
    </div>
  </section>
</template>

<script>
  import LayoutHeader from './header'
  import LayoutContent from './content'
  import LayoutMenu from './menu'

  export default {
    name: 'LayoutIndex',
    components: {
      LayoutHeader,
      LayoutContent,
      LayoutMenu
    },
    data () {
      return {
      }
    }
  }
</script>

<style scoped lang="scss">
  .layout-wrap {
    max-width: 1200px;
    margin: 16px auto 0;
  }
  .layout {
    min-height: 100vh;
  }
</style>
