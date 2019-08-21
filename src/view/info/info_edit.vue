<template>
  <div class="info-edit">
    <layout-header></layout-header>

    <div class="info-edit_content">
      <el-collapse v-model="actvieTab">
        <el-collapse-item title="基本信息" name="basic">
          <ul>
            <li class="flex-box item">
              <div class="item-title">服务名称：</div>
              <el-input size="mini" :disabled="true" class="flex-1" v-model="info.name"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">所属分组：</div>
              <el-select
                size="mini"
                multiple
                class="flex-1"
                v-model="selected_subjects"
                clearable
                placeholder="请选择"
              >
                <template v-for="item in catalog">
                  <!-- 循环template -->
                  <div
                    :key="item.id"
                    style="font-size: 12px; opacity: 0.5; color: #354052; padding: 8px 12px;"
                  >{{item.name}}</div>
                  <el-option
                    v-for="subject in item.subject"
                    :key="subject.id"
                    :label="subject.name"
                    :value="subject.id"
                  ></el-option>
                </template>
              </el-select>
            </li>

            <li class="flex-box item">
              <div class="item-title">关键字：</div>
              <el-input size="mini" class="flex-1" placeholder="多个之间用;分隔" v-model="info.keyword"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">提供单位：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.provider"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">服务摘要：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.abstract"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">坐标系统：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.coord"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">投影类型：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.proj"></el-input>
            </li>
            <li class="flex-box item">
              <div class="item-title">初始范围：</div>
              <div style="width: 300px;">
                <el-row>
                  <el-col :span="4" :offset="10">
                    <el-input
                      style="width:120px"
                      size="mini"
                      v-model="info.metadata.init_extent.ymax"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" :offset="0">
                    <el-input
                      size="mini"
                      style="width:120px"
                      v-model="info.metadata.init_extent.xmin"
                    ></el-input>
                  </el-col>
                  <el-col :span="4" :offset="16">
                    <el-input
                      size="mini"
                      style="width:120px"
                      v-model="info.metadata.init_extent.xmax"
                    ></el-input>
                  </el-col>
                </el-row>
                <el-row>
                  <el-col :span="4" :offset="10">
                    <el-input
                      size="mini"
                      style="width:120px"
                      v-model="info.metadata.init_extent.ymin"
                    ></el-input>
                  </el-col>
                </el-row>
                <!-- <label for="xmin">xmin:</label>
                <el-input
                  id="xmin"
                  style="width:80px"
                  class="flex-1"
                  v-model="info.metadata.init_extent.xmin"
                ></el-input>
                <label for="xmax">xmax:</label>
                <el-input
                  style="width:80px"
                  class="flex-1"
                  v-model="info.metadata.init_extent.xmax"
                ></el-input>
                <label for="ymin">ymin:</label>
                <el-input
                  style="width:80px"
                  class="flex-1"
                  v-model="info.metadata.init_extent.ymin"
                ></el-input>
                <label for="ymax">ymax:</label>
                <el-input
                  style="width:80px"
                  class="flex-1"
                  v-model="info.metadata.init_extent.ymax"
                ></el-input>-->
              </div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="聚合信息" v-if="info.type == 1">
          <ul>
            <li class="flex-box item">
              <div class="item-title">服务类型</div>
              <el-select v-model="layerInfo.type" style="width: 460px;" size="mini">
                <el-option label="系统服务" :value="0"></el-option>
                <el-option label="外部服务" :value="1"></el-option>
              </el-select>
            </li>

            <li class="flex-box item">
              <div class="item-title">{{ layerInfo.type ? '服务链接' : '选择服务' }}</div>
              <el-input
                v-if="layerInfo.type === 1"
                style="width: 460px;"
                v-model="layerInfo.url"
                size="mini"
              ></el-input>
              <!-- @change="readMapInfo" -->
              <el-select
                v-else
                v-model="layerInfo.id"
                style="width: 460px;"
                placeholder="请选择"
                size="mini"
              >
                <el-option
                  v-for="subject in system_layers"
                  :key="subject.id"
                  :label="subject.name"
                  :value="subject.id"
                ></el-option>
              </el-select>
            </li>

            <li class="flex-box item">
              <el-button @click="addToServiceList" title="添加到服务列表" size="mini">添加</el-button>
            </li>

            <li class="flex-box item">
              <div class="item-title">服务列表</div>
              <div style="width: 80%">
                <el-table
                  size="mini"
                  max-height="300"
                  border
                  style="width: 100%;"
                  :data="layer_list"
                >
                  <el-table-column label="服务" align="left" header-align="center" prop="title"></el-table-column>
                  <el-table-column width="100" fixed="right" label="操作" align="right" prop="url">
                    <span slot-scope="{row}">
                      <el-button
                        v-show="row.index"
                        @click="moveItem(row, true)"
                        style="width: 20px; text-align: center; padding-left: 0; padding-right: 0;"
                        size="mini"
                      >↑</el-button>
                      <el-button
                        v-show="row.index + 1 !== layer_list.length"
                        @click="moveItem(row, false)"
                        style="width: 20px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                        size="mini"
                      >↓</el-button>
                      <el-button
                        @click="removeItem(row)"
                        type="danger"
                        style="width: 20px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                        size="mini"
                      >X</el-button>
                    </span>
                  </el-table-column>
                </el-table>
              </div>
            </li>

            <li class="flex-box item">
              <div class="item-title">瓦片级别</div>
              <el-slider
                style="width: 460px;"
                range
                :max="20"
                :min="1"
                v-model="level"
                :show-stops="true"
              ></el-slider>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="联系人信息" name="contact">
          <ul>
            <li class="flex-box item">
              <div class="item-title">发布机构：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.organization"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">地址：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.address"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.contact"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人电话：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.contact_phone"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人邮箱：</div>
              <el-input size="mini" class="flex-1" v-model="info.metadata.contact_mail"></el-input>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="扩展信息" name="extend">
          <ul>
            <li v-for="(item, index) in customArr" :key="index" class="flex-box item">
              <el-input size="mini" style="width: 116px;text-align:right" v-model="item.key"></el-input>
              <el-input size="mini" class="flex-1" style="margin: 0 16px;" v-model="item.value"></el-input>
              <el-button size="mini" type="warning" @click="remove(index)">删除</el-button>
            </li>

            <li class="flex-box item">
              <el-input
                size="mini"
                style="width: 116px;text-align:right"
                v-model="editingPair.key"
                placeholder="自定义名称"
              ></el-input>
              <el-input
                size="mini"
                class="flex-1"
                v-model="editingPair.value"
                style="margin: 0 16px;"
              ></el-input>
              <el-button type="primary" @click="add">添加</el-button>
            </li>
          </ul>
        </el-collapse-item>
      </el-collapse>
      <div class="flex-box item mg-t40">
        <el-button type="primary" class="flex-1" style="margin-left: 116px;" @click="update">更新</el-button>
      </div>

      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <img
          v-else-if="info.hasThunmbnail"
          :src="`/api/service/thumbnail/${info.id}`"
          class="avatar"
        />
        <span v-else>
          <i class="el-icon-plus avatar-uploader-icon"></i>
          <span style="position: absolute;left:37%;top:60%">预览图</span>
        </span>
      </el-upload>
    </div>
  </div>
</template>

<script>
// import api from '@/api'
import api from "../../api";
import LayoutHeader from "../layout/header";

const MIME = ["image/png", "image/jpg", "image/jpeg"];
const SERVIE_TYPE_SYSTEM = 0;
const SERVIE_TYPE_WMTS = 1;

export default {
  name: "InfoEdit",
  components: {
    LayoutHeader
  },
  data() {
    return {
      actvieTab: "basic",
      info: { keyword: "", metadata: { abstract: "", init_extent: {} } },
      selected_subjects: [],
      catalog: [],
      customArr: [],
      editingPair: { key: "", value: "" },
      imageUrl: "",
      fileInfo: null,
      system_layers: [],
      level: [0, 20],
      layer_list: [],
      layerInfo: {
        type: SERVIE_TYPE_SYSTEM,
        id: "", //系统服务ID
        url: "" //wmts地址
      },
      subjects: this.cur_catalog || []
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = MIME.indexOf(file.type) >= 0;
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG/JPEG/PNG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }

      if (isJPG && isLt2M) {
        var fr = new FileReader();
        fr.readAsDataURL(file);
        this.fileInfo = file;
        fr.onload = data => {
          this.imageUrl = data.currentTarget.result;
        };
      }

      return false;
    },
    addToServiceList() {
      var obj = {};
      if (this.layerInfo.type === SERVIE_TYPE_SYSTEM) {
        //系统服务
        var lyr = this.system_layers.find(r => r.id == this.layerInfo.id);
        if (lyr) {
          if (this.layer_list.find(r => r.id === lyr.id)) {
            this.$message({ message: "服务已在列表中", type: "error" });
            return;
          }
          obj.type = SERVIE_TYPE_SYSTEM;
          obj.title = lyr.name;

          obj.id = lyr.id;
        } else {
          this.$message({ message: "请先选择服务", type: "error" });
          return;
        }
      } else {
        //外部wmts服务
        obj.type = SERVIE_TYPE_WMTS;
        obj.title = this.layerInfo.url;

        obj.url = obj.title;
      }
      const len = this.layer_list.length;
      obj.index = len;
      this.$set(this.layer_list, len, obj);
    },
    removeItem(row) {
      const { index } = row;
      this.layer_list.splice(index, 1);
      this.layer_list = this.layer_list.map((val, index) => {
        val.index = index;
        return val;
      });
    },
    moveItem(row, type) {
      const { index } = row;
      this.layer_list.splice(index, 1);
      if (type) {
        this.layer_list.splice(index - 1 > -1 ? index - 1 : 0, 0, row);
      } else {
        this.layer_list.splice(index + 1, 0, row);
      }

      this.layer_list = this.layer_list.map((val, index) => {
        val.index = index;
        return val;
      });
    },
    add() {
      this.customArr.push({
        ...this.editingPair
      });
      this.editingPair.key = "";
      this.editingPair.value = "";
    },
    remove(index) {
      this.customArr.splice(index, 1);
    },
    async update() {
      var info = {
        ...this.info
      };
      info.metadata.customize = this.customArr;
      info.metadata = JSON.stringify(info.metadata);
      info.groupIdList = this.selected_subjects.join(",");
      info.file = this.fileInfo;
      var success = await api.service
        .update(info)
        .then(() => {
          this.fileInfo = null;
          this.$message({
            message: "保存成功",
            type: "success"
          });
        })
        .catch(err => {
          this.$message({
            message: "保存失败。" + err,
            type: "error"
          });
        });
    }
  },
  mounted() {
    api.service.servie_list({ size: 1000, aggrate: false }).then(services => {
      this.$set(this, "system_layers", services.list);
    });

    const { id } = this.$route.query || {};

    api.catalog.catalog_list().then(data => {
      this.catalog = data;
    });

    api.service.get(id).then(data => {
      data.metadata = JSON.parse(data.metadata || "{}");
      this.info = data;
      if (!this.info.metadata.init_extent) {
        this.$set(this.info.metadata, "init_extent", {
          xmin: "",
          ymin: "",
          xmax: "",
          ymax: ""
        });
      }
      this.customArr = data.metadata.customize || [];
      this.selected_subjects = (data.groupIdList || "").split(",");
    });

    // api.service.getThumbnail(id).then(buffer => {
    //   console.log(buffer);
    // });
  }
};
</script>

<style lang="scss">
.info-edit_content {
  position: relative;
  .avatar-uploader {
    position: absolute;
    right: 50px;
    top: 32px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>

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
    margin-bottom: 12px;
  }
}

.item-title {
  text-align: right;
  font-size: 14px;
  color: #696969;
  margin-right: 16px;
  width: 116px;
}

.el-collapse-item__header {
  padding-left: 50% !important;
}
</style>

