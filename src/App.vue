<template>
  <div id="app">
    <router-view v-if="routerActive" />
  </div>
</template>

<script>
import api from "./api";
import { mapMutations } from "vuex";
import Cookies from "js-cookie";
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
    ...mapMutations(["setUser"]),
    reload() {
      this.routerActive = false;
      this.$nextTick(() => {
        this.routerActive = true;
      });
    }
  },
  mounted() {
    api.admin.getUserInfo().then(data => {
      if (data) {
        this.setUser({
          userName: data.userName,
          userId: data.userId,
          userInfo: data.userInfo,
          sid: Cookies.get("sid"),
          access: JSON.parse(data.access||'[]')
        });
      }
    });
  }
};
</script>

<style>
</style>
