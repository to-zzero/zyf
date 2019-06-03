<template>
  <div class="info-edit">
    <layout-header></layout-header>

    <div class="info-edit_content">
      <ul class="ul-reset">
        <li class="flex-box item">
          <div class="item-title">服务名称：</div>
          <el-input class="flex-1" v-model="info.name"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">服务简介：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">关键字：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">服务类型：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">主题分类：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">覆盖区域：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">坐标系：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">投影类型：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">使用权限：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">服务预览：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">服务名称：</div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">所属分组：</div>
          <el-select v-model="value1" class="flex-1" multiple placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </li>

        <li v-if="!customArr.length" class="item" style="text-align: right;">
          <el-button
            type="primary"
            v-if="index === customArr.length - 1 || !customArr.length"
            style="margin-left: 16px;"
            @click="add"
          >添加自定义名称</el-button>
        </li>

        <li v-for="(item, index) in customArr" :key="index" class="flex-box item">
          <el-input style="width: 100px" placeholder="自定义名称"></el-input>
          <el-input class="flex-1" style="margin: 0 16px;"></el-input>
          <el-button @click="remove(index)">删除</el-button>
          <el-button
            type="primary"
            v-if="index === customArr.length - 1 || !customArr.length"
            style="margin-left: 16px;"
            @click="add"
          >添加</el-button>
        </li>

        <li class="flex-box item mg-t40">
          <el-button type="primary" class="flex-1" style="margin-left: 116px;">更新</el-button>
          <el-button style="margin-left: 16px;">取消</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// import api from '@/api'
import api from "../../api";
import LayoutHeader from "../layout/header";
export default {
  name: "InfoEdit",
  components: {
    LayoutHeader
  },
  data() {
    return {
      info: { keyword: "", metadata: {} },
      value1: [],
      options: [],
      customArr: []
    };
  },
  methods: {
    add() {
      this.customArr.push({});
    },
    remove(index) {
      this.customArr.splice(index, 1);
    }
  },
  mounted() {
    const { id } = this.$route.query || {};
    api.service.get(id).then(data => {
      data.metadata = JSON.parse(data.metadata || "{}");
      this.info = data;
      this.customArr=data.metadata.customize||[]
    });

    api.catalog.catalog_list().then(data => {
      this.options=data
    });
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 20px;
  font-weight: 600;
  color: #292929;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
}
.info-edit_content {
  margin: 24px auto;
  width: 1200px;
  border-radius: 4px;
  box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
  background-color: #ffffff;
  padding: 32px 276px;
  box-sizing: border-box;
}

.item {
  &:not(:last-of-type) {
    margin-bottom: 24px;
  }
}

.item-title {
  text-align: right;
  font-size: 14px;
  color: #696969;
  margin-right: 16px;
  width: 100px;
}
</style>

