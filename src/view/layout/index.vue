<template>
  <section class="layout">
    <layout-header />

    <div class="flex-box mg-t16">
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
  .layout {
    min-height: 100vh;
  }
</style>
