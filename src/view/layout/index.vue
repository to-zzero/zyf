<template>
  <el-container>
    <el-header style="padding: 0;">
      <layout-header/>
    </el-header>

    <search @search="onSearch"></search>

    <el-container style="width: 1200px; margin: 0 auto;">
      <el-aside width="264px">
        <layout-menu @onSubjectClick="onSubjectClick"/>
      </el-aside>
      <el-main style="padding-right: 0px;">
        <layout-content @clearSearch="onSubjectClick({id: null, subject: {}})" :currentSelect="currentSelect" :serviceList="serviceList" @search="onSearch" class="flex-1"/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import LayoutHeader from "./header";
import LayoutContent from "./content";
import LayoutMenu from "./menu";
import Search from './search';

import api from '@/api'

export default {
  name: "LayoutIndex",
  components: {
    LayoutHeader,
    LayoutContent,
    LayoutMenu,
    Search
  },
  data() {
    return {
      serviceList: [],
      currentSubject: null,
      currentSelect: {}
    };
  },
  mounted() {
    this.queryServices(this.currentSubject, null);
  },
  methods: {
    async onSubjectClick({id, subject}) {
      this.currentSubject = id;
      this.currentSelect = subject;
      this.queryServices(id);
    },
    async onSearch(val) {
      this.queryServices(this.currentSubject, val);
    },
    async queryServices(id, name) {
      var list = await api.service.servie_list(id, name);
      this.serviceList = list.list.map(r => {
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
