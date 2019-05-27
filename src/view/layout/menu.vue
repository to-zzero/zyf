<template>
  <basis-scroll height="calc(100vh - 66px)" width="220">
    <ul class="layout-menu ul-reset">
      <li class="item-wrap">
        <ul class="ul-reset item-content" v-for="catalog in menu_data" :key="catalog.id">
          <li
            class="inner-item"             
          >{{catalog.name}}</li>
          <li
            class="inner-item"
            v-for="subject in catalog.subject"
            :key="subject.id"
            @click="onSubjectClick(subject.id)"
          >{{subject.name}}({{subject.count}})</li>
        </ul>
      </li>
    </ul>
  </basis-scroll>
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
  async mounted() {
    var data = await catalog_list();
    this.menu_data = data;
  },
  methods: {
    onSubjectClick(id){
      this.$emit('onSubjectClick',id)
    }
  }
};
</script>

<style scoped lang="scss">
.layout-menu {
  min-height: calc(100vh - 66px);
  padding-right: 10px;
  // background: #777777;
}
.item-content {
  padding-bottom: 12px !important;
}
.inner-item {
  text-align: center;
  padding: 8px;
  width: 200px;
  box-sizing: border-box;
  border: {
    left: 1px solid #ddd;
    top: 1px solid #ddd;
    right: 1px solid #ddd;
  }
  &:first-of-type {
    border-radius: 4px 4px 0 0;
    background: #f5f5f5;
  }
  &:not(:first-of-type) {
    cursor: pointer;

    &:hover {
      background: #eee;
    }
  }
  &:last-of-type {
    border-bottom: 1px solid #ddd;
    border-radius: 0 0 4px 4px;
  }
}
</style>
