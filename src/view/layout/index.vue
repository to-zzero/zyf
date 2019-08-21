<template>
  <el-container>
    <el-header style="padding: 0;">
      <layout-header />
    </el-header>

    <search></search>

    <el-container style="width: 1200px; margin: 0 auto;">
      <el-aside width="264px">
        <layout-menu ref="menu" />
      </el-aside>
      <el-main style="padding-right: 0px;">
        <layout-content class="flex-1" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import dayjs from "dayjs";
import { mapMutations, mapState, mapActions } from "vuex";

import LayoutHeader from "./header";
import LayoutContent from "./content";
import LayoutMenu from "./menu";
import Search from "./search";

import api from "../../api";
// import api from "@/api";

export default {
  name: "LayoutIndex",
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutMenu,
    Search
  }
};
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
