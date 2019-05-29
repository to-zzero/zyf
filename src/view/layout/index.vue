<template>
  <el-container>
    <el-header style="padding: 0;">
      <layout-header/>
    </el-header>

    <el-container style="width: 1200px; margin: 0 auto;">
      <el-aside width="220px">
        <layout-menu @onSubjectClick="onSubjectClick"/>
      </el-aside>
      <el-main>
        <layout-content :serviceList="serviceList" @search="onSearch" class="flex-1 mg-l16"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from "./header";
import LayoutContent from "./content";
import LayoutMenu from "./menu";

import { servie_list } from "../../api";

export default {
  name: "LayoutIndex",
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutMenu
  },
  data() {
    return {
      serviceList: [],
      currentSubject: null
    };
  },
  mounted() {
    this.queryServices(this.currentSubject, null);
  },
  methods: {
    async onSubjectClick(id) {
      this.currentSubject = id;
      this.queryServices(id);
    },
    async onSearch(val) {
      this.queryServices(this.currentSubject, val);
    },
    async queryServices(id, name) {
      var list = await servie_list(id, name);
      this.serviceList = list.map(r => {
        if (r.metadata) {
          r.metadata = JSON.parse(r.metadata);
        } else {
          r.metadata = {};
        }

        if (r.keyword) {
          r.keyword = r.keyword.split(";");
        } else {
          r.keyword = [];
        }
      r.thumbnail="1439126935969.jpg"

        r.status = !!r.status;

        return r;
      });
    }
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
