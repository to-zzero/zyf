<template>
  <el-container>
    <el-header style="padding: 0;">
      <layout-header />
    </el-header>

    <search @search="onSearch" :catalog="currentSubject"></search>

    <el-container style="width: 1200px; margin: 0 auto;">
      <el-aside width="264px">
        <layout-menu ref="menu" @onSubjectClick="onSubjectClick" />
      </el-aside>
      <el-main style="padding-right: 0px;">
        <layout-content
          @page-changed="onPageChanged"
          @option-changed="onOptionChanged"
          @clearSearch="onSubjectClick({id: null, subject: {}})"
          @reload-catalog="doQuery"
          :currentSelect="currentSelect"
          :serviceQueryResult="serviceQueryResult"
          @search="onSearch"
          class="flex-1"
        />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import dayjs from "dayjs";

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
  },
  data() {
    return {
      serviceQueryResult: { list: [], page: 1, size: 10, total: 0 },
      currentSubject: null,
      currentSelect: {},
      queryOpt: {
        catalogId: null,
        name: null,
        sort_field: null,
        page: 1,
        size: 5,
        sort_method: 0
      }
    };
  },
  mounted() {
    this.queryServices(this.currentSubject, null);
  },
  methods: {
    async onSubjectClick({ id, subject }) {
      this.currentSubject = id;
      this.currentSelect = subject;
      this.queryServices(id);
    },
    async onSearch(val) {
      this.queryServices(this.currentSubject, val);
    },
    async queryServices(id, name) {
      this.queryOpt.catalogId = id;
      this.queryOpt.name = name;
      this.doQuery();
    },
    async doQuery() {
      let opt = this.queryOpt;
      var list = await api.service.servie_list(opt);
      this.serviceQueryResult.list = list.list.map(r => {
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
        r.pubdate = dayjs(r.createAt).format("YYYY-MM-DD");
        r.status = !!r.status;
        return r;
      });

      this.serviceQueryResult.page = list.pageNum;
      this.serviceQueryResult.size = list.pageSize;
      this.serviceQueryResult.total = list.total;
    },
    async onPageChanged(page) {
      this.queryOpt.page = page;
      this.doQuery();
    },

    onOptionChanged(with_aggrate) {
      this.queryOpt.page = 1;
      this.queryOpt.aggrate = with_aggrate;
      console.log(with_aggrate);
      this.doQuery();
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
