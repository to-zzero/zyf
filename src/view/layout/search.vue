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

      <el-button
        v-if="canPublish"
        class="mg-l16"
        type="primary"
        @click="openDialog('publish_service')"
      >发布服务</el-button>

      <el-button
        v-if="canPublish"
        class="mg-l16"
        type="primary"
        @click="openDialog('service_aggrate')"
      >服务聚合</el-button>
    </div>

    <el-dialog
      width="610px"
      :visible.sync="dlg_publish_service"
      title="发布服务"
      :close-on-click-modal="false"
    >
      <ul class="ul-reset">
        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">
            选择.sd文件
            <span style="color:red;font-weight: bold;">*</span>
          </div>
          <el-input disabled :value="fileName" style="width: 440px;" size="mini">
            <el-upload
              :show-file-list="false"
              :on-change="selectFile"
              :before-upload="()=>false"
              :multiple="false"
              class="upload"
              slot="suffix"
              action
            >
              <!-- action需要改一下 -->
              <img src="../../assets/folder@2x.png" style="width: 25px;" alt />
            </el-upload>
            <!-- <div class="flex-box" style="height: 40px; width: 30px; justify-content: center; cursor-pointer" slot="suffix">
              <img src="../../assets/folder@2x.png" style="width: 16px;" alt="">
            </div>-->
          </el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">
            服务名称
            <span style="color:red;font-weight: bold;">*</span>
          </div>
          <el-input style="width: 440px;" v-model="service_info.name" size="mini"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">
            所属分组
            <span style="color:red;font-weight: bold;">*</span>
          </div>
          <el-select
            size="mini"
            multiple
            style="width: 440px;"
            v-model="service_info.service_catalog"
            placeholder="请选择"
          >
            <template v-for="(catalog, index) in catalog_list">
              <!-- 循环template -->
              <div :key="index" style="padding: 8px 12px;">{{catalog.name}}</div>
              <el-option
                v-for="subject in catalog.subject"
                :key="subject.id"
                :label="subject.name"
                :value="subject.id"
              ></el-option>
            </template>
          </el-select>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >关键字:</div>
          <el-input
            size="mini"
            style="width: 440px;"
            placeholder="多个关键字以;分隔"
            v-model="service_info.keyword"
          ></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >提供单位:</div>
          <el-input size="mini" style="width: 440px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要:</div>
          <el-input size="mini" style="width: 440px;" v-model="service_info.metadata.abstract"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button @click="dlg_publish_service=false" size="mini">取消</el-button>
          <el-button type="primary" @click="doPublish">确定</el-button>
        </li>
      </ul>
    </el-dialog>

    <serviceAggrateDialg
      v-if="dlg_service_aggrate"
      :isOpen="dlg_service_aggrate"
      @change="dlg_service_aggrate=!dlg_service_aggrate"
    ></serviceAggrateDialg>
  </div>
</template>

<script>
import api from "../../api";
import serviceAggrateDialg from "./serviceAggrateDialg";
import { mapState } from "vuex";
const default_info = JSON.stringify({
  name: "",
  keyword: "",
  service_catalog: [], //服务所属分类
  file: null,
  metadata: {
    provider: "",
    abstract: "",
    customize: []
  }
});
export default {
  name: "Search",
  props: ["catalog"],
  inject: ["reload"],
  components: {
    serviceAggrateDialg
  },
  data() {
    return {
      dlg_publish_service: false,
      dlg_service_aggrate: false,
      catalog_list: [],
      searchContent: "",
      service_info: JSON.parse(default_info),
      fileName: "",
      options: [],
      formData: {
        type: 1,
        level: 0,
        url: "",
        group: [],
        layerName: "",
        style: "",
        tile: "",
        serviceList: [],
        service_catalog: []
      }
    };
  },
  methods: {
    openDialog(name) {
      this["dlg_" + name] = true;
    },
    onSearch(val) {
      this.$emit("search", val);
    },
    selectFile(file) {
      this.fileName = file.name;
      this.service_info.file = file;
    },
    async doPublish() {
      if (!this.service_info.file) {
        return this.$message({ message: "请选择sd文件", type: "error" });
      }

      if (!this.service_info.name) {
        return this.$message({ message: "请输入服务名称", type: "error" });
      }

      var nameOK = await api.service.checkname(this.service_info.name);
      if (nameOK == false) {
        return this.$message({ message: "服务名称已经被使用", type: "error" });
      }

      if (this.service_info.service_catalog.length < 1) {
        return this.$message({ message: "请选择所属分组", type: "error" });
      }

      let loading;
      loading = this.$loading({
        lock: true,
        text: "正在发布服务...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.5)"
      });
      api.service
        .publish(this.service_info)
        .then(async service => {
          let checkStatus = async () => {
            let status = await api.service.getStatus(service.id);
            status = status * 1;
            if (status == 99) {
              loading.close();
              this.$message({
                message: "发布失败",
                type: "error",
                showClose: true,
                duration: 0
              });
              this.dlg_publish_service = false;
              api.service.service_action(service.id, "delete");
              return;
            } else if (status == 100) {
              loading.close();
              this.$message({ message: "发布成功", type: "success" });
              this.dlg_publish_service = false;
              this.reload();
              return;
            }
            setTimeout(() => {
              checkStatus();
            }, 1000);
          };
          checkStatus();

          // this.$message({ message: "发布成功", type: "success" });
          // this.dlg_publish_service = false;
          // this.reload();
        })
        .catch(err => {
          loading.close();
          this.$message({ message: "发布失败:" + err, type: "error" });
        });
    }
  },
  mounted() {
    api.catalog.catalog_list().then(data => {
      this.catalog_list = data;
    });
  },
  computed: {
    ...mapState(["access"]),
    canPublish() {
      return this.access.find(r => r.code == 100).visible;
    }
  },
  watch: {
    fileName(newVal, oldVal) {
      if (!this.service_info.name || this.service_info.name === oldVal) {
        this.service_info.name = newVal.substr(0, newVal.lastIndexOf("."));
      }
    },
    catalog(newVal, oldVal) {
      if (newVal) {
        this.service_info.service_catalog = [newVal];
      } else {
        this.service_info.service_catalog = [];
      }
    }
  }
};
</script>

<style lang="scss">
.search-wrap {
  .el-input__suffix {
    display: flex;
    align-items: center;
  }
  .el-upload {
    display: flex !important;
    align-items: center;
  }
}
.upload {
  .el-upload-dragger {
    width: 30px !important;
    height: 40px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: unset !important;
    border: none !important;
  }
}
</style>

<style lang="scss" scoped>
.search-wrap {
  box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
  background-color: #ffffff;
  padding: 16px 12px;
  box-sizing: border-box;
}
.search-content {
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
}
</style>
