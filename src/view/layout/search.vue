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
          <el-input disabled :value="fileName" style="width: 440px;">
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
              <img src="../../assets/folder@2x.png" style="width: 25px;" alt>
            </el-upload>
            <!-- <div class="flex-box" style="height: 40px; width: 30px; justify-content: center; cursor-pointer" slot="suffix">
              <img src="../../assets/folder@2x.png" style="width: 16px;" alt="">
            </div>-->
          </el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务名称：</div>
          <el-input style="width: 440px;" v-model="service_info.name"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >关键字：</div>
          <el-input style="width: 440px;" placeholder="多个关键字以;分隔" v-model="service_info.keyword"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >所属分组：</div>
          <el-select
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
          >提供单位：</div>
          <el-input style="width: 440px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要：</div>
          <el-input style="width: 440px;" v-model="service_info.metadata.abstract"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button @click="dlg_publish_service=false">取消</el-button>
          <el-button type="primary" @click="doPublish">确定</el-button>
        </li>
      </ul>
    </el-dialog>

    <el-dialog width="600px" :visible.sync="dlg_service_aggrate" title="服务聚合">
      <ul class="ul-reset">
        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务类型</div>
          <el-select v-model="formData.type" style="width: 460px;">
            <el-option label="系统服务" :value="0"></el-option>
            <el-option label="外部服务" :value="1"></el-option>
          </el-select>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >{{ formData.type ? '服务链接' : '选择分组' }}</div>
          <el-input v-if="formData.type === 1" style="width: 460px;" v-model="formData.url"></el-input>
          <el-select
            v-else
            v-model="formData.group"
            multiple
            style="width: 460px;"
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
          >服务参数</div>
          <div style="width: 460px;" class="flex-box space-between">
            <el-input v-model="formData.layerName" class="mg-r8" placeholder="图层名"></el-input>
            <el-input v-model="formData.style" class="mg-r8" placeholder="样式"></el-input>
            <el-input v-model="formData.tile" placeholder="瓦片方案"></el-input>
          </div>
        </li>

        <li class="flex-box space-end mg-b16">
          <el-button @click="addToServiceList">
            添加到服务列表
          </el-button>
        </li>

        <li class="flex-box align-start mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务列表</div>
          <div style="width: 460px;">
            <el-table
              max-height="300"
              border
              style="width: 100%;"
              :data="formData.serviceList">
              <el-table-column width="100" fixed label="服务名称" align="center" prop="layerName"></el-table-column>
              <el-table-column label="服务URL" align="center" prop="url"></el-table-column>
              <el-table-column width="100" fixed="right" label="操作" align="right" prop="url">
                <div slot-scope="{row}">
                  <el-button
                    v-show="row.index"
                    @click="moveItem(row, true)"
                    style="width: 36px; text-align: center; padding-left: 0; padding-right: 0;" size="mini">上移</el-button>
                  <el-button
                    v-show="row.index + 1 !== formData.serviceList.length"
                    @click="moveItem(row, false)"
                    style="width: 36px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;" size="mini">下移</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务级别</div>
          <el-slider style="width: 460px;" :max="8" :min="1" v-model="formData.level"></el-slider>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >聚合服务名称</div>
          <el-input style="width: 460px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >关键字</div>
          <el-input style="width: 460px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务名称</div>
          <el-input style="width: 460px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div
            class="flex-1 mg-r16"
            style="font-size: 14px; color: #7f8fa4; text-align: right;"
          >服务摘要</div>
          <el-input style="width: 460px;" v-model="service_info.metadata.provider"></el-input>
        </li>

        <li class="flex-box mg-b16">
          <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要</div>
          <el-input style="width: 460px;" v-model="service_info.metadata.abstract"></el-input>
        </li>

        <li class="flex-box" style="justify-content: flex-end;">
          <el-button @click="dlg_service_aggrate=false">取消</el-button>
          <el-button type="primary">确定</el-button>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import api from "../../api";
// import { async } from "q";
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
  inject: ["reload"],
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
        url: '',
        group: [],
        layerName: '',
        style: '',
        tile: '',
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
    addToServiceList() {
      const {
        url,
        layerName,
        style,
        tile
      } = this.formData

      const len = this.formData.serviceList.length
      this.$set(this.formData.serviceList, len, {
        url,
        layerName,
        style,
        tile,
        index: len
      })
    },
    moveItem(row, type) {
      const { index } = row
      this.formData.serviceList.splice(index, 1)
      if (type) {
        this.formData.serviceList.splice(index - 1 > -1 ? index - 1 : 0, 0, row)
      } else {
        this.formData.serviceList.splice(index + 1, 0, row)
      }

      this.formData.serviceList = this.formData.serviceList.map((val, index) => {
        val.index = index
        return val
      })
    },
    async doPublish() {
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
  watch: {
    fileName(newVal, oldVal) {
      if (!this.service_info.name || this.service_info.name === oldVal) {
        this.service_info.name = newVal.substr(0, newVal.lastIndexOf("."));
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
