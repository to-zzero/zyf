<template>
  <!-- <basis-scroll height="calc(100vh - 66px)" width="220"> -->
  <ul class="layout-menu ul-reset mg-t24">
    <li class="item-wrap">
      <ul class="ul-reset item-content" v-for="catalog in menu_data" :key="catalog.id">
        <li @click="showCatalog(catalog)" class="inner-item relative">
          {{catalog.name}}
          <i
            class="custom-icon"
            :class="(catalog.isView || catalog.isView === undefined) ? '' : 'un-opened'"
          />
        </li>
        <template v-if="catalog.isView || catalog.isView === undefined">
          <li
            class="inner-item"
            v-for="subject in (!catalog.showMore ? catalog.subject.slice(0, 5) : catalog.subject)"
            :key="subject.id"
            @click="onSubjectClick(subject.id, subject)"
          >{{subject.name}}({{subject.count}})</li>
          <li
            v-if="catalog.subject.length > 5"
            @click="showMore(catalog)"
            class="view-more"
          >{{ !catalog.showMore ? '查看更多' : '收起'}}</li>
          <li v-if="catalog.subject.length === 0 " class="no-subjects">暂无内容</li>
        </template>
      </ul>
    </li>
  </ul>
  <!-- </basis-scroll> -->
</template>

<script>
import api from "../../api";
export default {
  name: "LayoutMenu",
  data() {
    return {
      menu_data: []
    };
  },
  mounted() {
    this.loadCatalog();
  },
  methods: {
    loadCatalog() {
      api.catalog.catalog_list().then(res => {
        this.menu_data = res;
      });
    },
    onSubjectClick(id, subject) {
      this.$emit("onSubjectClick", {
        id,
        subject
      });
    },
    showMore(catalog) {
      if (!catalog.showMore) {
        this.$set(catalog, "showMore", true);
      } else {
        this.$set(catalog, "showMore", false);
      }
    },
    showCatalog(catalog) {
      if (catalog.isView === undefined) {
        this.$set(catalog, "isView", false);
        return false;
      }
      if (!catalog.isView) {
        this.$set(catalog, "isView", true);
      } else {
        this.$set(catalog, "isView", false);
      }
    }
  }
};
</script>

<style scoped lang="scss">
// .layout-menu {
//   background: #fff;
// }
.relative {
  position: relative;
  cursor: pointer;

  .custom-icon {
    position: absolute;
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
    right: 12px;
    top: calc(50% - 5px);
    border-left: 2px solid #4874ed;
    border-top: 2px solid #4874ed;

    &.un-opened {
      transform: rotate(225deg);
    }
  }
}
.view-more {
  border-radius: 0 0 4px 4px;
  background-color: #ffffff;
  color: #7f8fa4;
  font-size: 14px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
}

.no-subjects {
  border-radius: 0 0 4px 4px;
  background-color: #ffffff;
  color: #7f8fa4;
  font-size: 14px;
  padding: 16px;
  text-align: center;
}

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
      // background: #eee;
      color: #4874ed;
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
