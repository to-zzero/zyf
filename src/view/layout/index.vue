<template>
  <section class="layout">
    <layout-header/>

    <div class="flex-box layout-wrap">
      <layout-menu @onSubjectClick="onSubjectClick"/>
      <layout-content :serviceList="serviceList" class="flex-1 mg-l16"/>
    </div>
  </section>
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
      serviceList: []
    };
  },
  methods: {
    async onSubjectClick(id) {
      var list = await servie_list(id);
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
