<template>
  <div class="search-wrap">
    <div class="flex-box search-content">
      <el-input @change="onSearch" placeholder="请输入内容" v-model="searchContent" class="flex-1">
        <i
          slot="suffix"
          style="font-size: 16px; margin: 0 auto; line-height: 40px; cursor: pointer;"
          class="el-icon-search"
        ></i>
      </el-input>

      <el-button class="mg-l16" type="primary" @click="openDialog('publish_service')">发布服务</el-button>

      <el-button class="mg-l16" type="primary" @click="openDialog('service_aggrate')">服务聚合</el-button>
    </div>

    <el-dialog width="610px" :visible.sync="dlg_publish_service" title="发布服务">
      <ul class="ul-reset">
        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >选择.sd文件：</div>
          <el-input disabled style="width: 440px;">
            <el-upload
              class="upload"
              slot="suffix"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"><!-- action需要改一下 -->
              <img src="../../assets/folder@2x.png" style="width: 16px;" alt="">
            </el-upload>
            <!-- <div class="flex-box" style="height: 40px; width: 30px; justify-content: center; cursor-pointer" slot="suffix">
              <img src="../../assets/folder@2x.png" style="width: 16px;" alt="">
            </div> -->
          </el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务名称：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >关键字：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >所属分组：</div>
          <el-select multiple style="width: 440px;" v-model="value" placeholder="请选择">
            <template v-for="item in 3"> <!-- 循环template -->
              <div style="font-size: 12px; opacity: 0.5; color: #354052; padding: 8px 12px;">
                {{item}}-一级
              </div>
              <el-option
                v-for="item in options"
                :key="item.value + item.toString()"
                :label="item.label"
                :value="item.value"
              ></el-option>
              </template>
          </el-select>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >提供单位：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要：</div>
          <el-input style="width: 440px;"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button>取消</el-button>
          <el-button type="primary">确定</el-button>
        </li>
      </ul>
    </el-dialog>

    <el-dialog :visible.sync="dlg_service_aggrate" title="服务聚合"></el-dialog>
  </div>
</template>

<script>
export default {
  name: "Search",
  data() {
    return {
      dlg_publish_service: false,
      dlg_service_aggrate: false,
      searchContent: "",
      value: "",
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ]
    };
  },
  methods: {
    openDialog(name) {
      this["dlg_" + name] = true;
      // console.log(this);
    },
    onSearch(val) {
      this.$emit("search", val);
    }
  }
};
</script>

<style lang="scss">
  .upload {
    .el-upload-dragger {
      width: 30px!important;
      height: 40px!important;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: unset!important;
      border: none!important;
    }
  }
</style>

<style lang="scss" scoped>
.search-wrap {
  box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
  background-color: #ffffff;
  padding: 16px 0;
}
.search-content {
  width: 1200px;
  margin: 0 auto;
}
</style>
