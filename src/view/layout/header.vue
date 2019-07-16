<template>
  <header class="layout-header">
    <div class="content flex-box space-between pd-lr8">
      <span class="title" @click="$router.push('/')">海图服务发布系统</span>
        <div style="margin-left: auto;">
          欢迎:{{userName}}
          <el-button v-if="sid" size="mini" @click="onLogout">退出</el-button>
        </div>
        <el-button class="mg-l16" size="mini" @click="routerTo('/#/setting')">系统配置</el-button>
    </div>
  </header>
</template>

<script>
import { mapState } from "vuex";
import Cookies from "js-cookie";
import api from "../../api";
export default {
  name: "LayoutHeader",
  data() {
    return {};
  },
  mounted() {
    // this.$root.$off("addList");
    // this.$root.$on("addList", val => {
    //   this.dlg_publish_service = val;
    // });
  },
  computed: {
    ...mapState(["userName", "sid"])
  },
  methods: {
    routerTo(path) {
      window.open(path);
    },
    onLogout() {
      api.admin.logout().then(() => {
        Cookies.remove("sid");
        this.$router.push({ name: "login" });
      });
    }
  }
};
</script>

<style scoped lang="scss">
.layout-header {
  height: 60px;
  background-image: linear-gradient(to right, #0033ff, #0099ff);
  color: #fff;
  padding: 0 20px;
}

.content {
  max-width: 1200px;
  margin: 0 auto;
  height: 60px;
}

.title {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  cursor: pointer;
}
</style>
