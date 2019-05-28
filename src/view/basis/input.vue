<template>
  <div class="flex-box align-center">
    <input
      ref="input"
      v-model="searchText"
      placeholder="请输入服务名称关键词进行搜索，如全球矢量地图服务"
      class="basis-input flex-1"
    >
    <div
      :style="{
        height: `${inputHeight}px`,
        lineHeight: `${inputHeight}px`
      }"
      @click="onSearch"
      class="search"
    >搜索</div>
  </div>
</template>

<script>
export default {
  name: "BasisInput",
  data() {
    return {
      inputHeight: "",
      searchText: ""
    };
  },
  mounted() {
    const { input } = this.$refs;
    if (input) {
      this.inputHeight = input.offsetHeight;
    }
  },
  methods: {
    onSearch() {
      this.$emit("search", this.searchText);
    }
  }
};
</script>

<style lang="scss" scoped>
.basis-input {
  outline: none;
  border-radius: 4px 0 0 4px;
  border: 2px solid #4679b2;
  padding: 8px 16px;
}

.search {
  color: #fff;
  background: #4679b2;
  border-radius: 0 4px 4px 0;
  padding: 0 16px;
  cursor: pointer;

  &:hover {
    background: #2679b2;
  }
  &:active {
    background: #147bc0;
  }
}
</style>