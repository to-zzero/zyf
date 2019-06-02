<template>
  <!-- <basis-scroll height="calc(100vh - 66px)" width="220"> -->
  <ul class="layout-menu ul-reset mg-t24">
    <li class="item-wrap">
      <ul class="ul-reset item-content" v-for="catalog in menu_data" :key="catalog.id">
        <li
          class="inner-item"             
        >{{catalog.name}}</li>
        <li
          class="inner-item"
          v-for="subject in catalog.subject"
          :key="subject.id"
          @click="onSubjectClick(subject.id, subject)"
        >{{subject.name}}({{subject.count}})</li>
      </ul>
    </li>
  </ul>
  <!-- </basis-scroll> -->
</template>

<script>
import { catalog_list } from "../../api";
export default {
  name: "LayoutMenu",
  data() {
    return {
      menu_data: []
    };
  },
  mounted() {
    catalog_list().then(res => {
      this.menu_data = res
    })
  },
  methods: {
    onSubjectClick(id, subject){
      this.$emit('onSubjectClick', {
        id,
        subject
      })
    }
  }
};
</script>

<style scoped lang="scss">
// .layout-menu {
//   background: #fff;
// }
.item-content {
  margin-bottom: 12px !important;
  background: #fff;
  border-radius: 4px;
}
.inner-item {
  text-align: center;
  padding: 16px;
  box-sizing: border-box;
  margin: 0 8px;
  &:first-of-type {
    padding: 20px;
    border-radius: 4px 4px 0 0;
    box-shadow: 0 5px 8px -4px rgba(57, 64, 79, 0.1);
    font-weight: 600;
  }
  &:not(:first-of-type) {
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
  &:not(:last-of-type) {
    border-bottom: 1px solid #dfe3e9;
  }
  &:last-of-type {
    border-radius: 0 0 4px 4px;
  }
}
</style>
