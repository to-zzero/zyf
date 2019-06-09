<template>
  <div id="app">
    <router-view v-if="routerActive"/>
  </div>
</template>

<script>
export default {
  name: "app",
  provide() {
    return { reload: this.reload };
  },
  data() {
    return {
      routerActive: true
    };
  },
  methods: {
    reload() {
      this.routerActive = false;
      this.$nextTick(() => {
        this.routerActive = true;
      });
    }
  }
};
</script>

<style>
</style>
