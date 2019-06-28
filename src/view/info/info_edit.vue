<template>
  <div class="info-edit">
    <layout-header></layout-header>

    <div class="info-edit_content">
      <el-collapse v-model="actvieTab">
        <el-collapse-item title="基本信息" name="basic">
          <ul>
            <li class="flex-box item">
              <div class="item-title">服务名称：</div>
              <el-input class="flex-1" v-model="info.name"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">所属分组：</div>
              <el-select
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
              <el-input class="flex-1" placeholder="多个之间用;分隔" v-model="info.keyword"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">提供单位：</div>
              <el-input class="flex-1" v-model="info.metadata.provider"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">服务摘要：</div>
              <el-input class="flex-1" v-model="info.metadata.abstract"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">坐标系统：</div>
              <el-input class="flex-1" v-model="info.metadata.coord"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">投影类型：</div>
              <el-input class="flex-1" v-model="info.metadata.proj"></el-input>
            </li>
            <li class="flex-box item">
              <div class="item-title">范围范围：</div>
              <div>
                <label for="xmin">xmin:</label>
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
                ></el-input>
              </div>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="联系人信息" name="contact">
          <ul>
            <li class="flex-box item">
              <div class="item-title">发布机构：</div>
              <el-input class="flex-1" v-model="info.metadata.organization"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">地址：</div>
              <el-input class="flex-1" v-model="info.metadata.address"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人：</div>
              <el-input class="flex-1" v-model="info.metadata.contact"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人电话：</div>
              <el-input class="flex-1" v-model="info.metadata.contact_phone"></el-input>
            </li>

            <li class="flex-box item">
              <div class="item-title">联系人邮箱：</div>
              <el-input class="flex-1" v-model="info.metadata.contact_mail"></el-input>
            </li>
          </ul>
        </el-collapse-item>
        <el-collapse-item title="扩展信息" name="extend">
          <ul>
            <li v-for="(item, index) in customArr" :key="index" class="flex-box item">
              <el-input style="width: 116px;text-align:right" v-model="item.key"></el-input>
              <el-input class="flex-1" style="margin: 0 16px;" v-model="item.value"></el-input>
              <el-button type="warning" @click="remove(index)">删除</el-button>
            </li>

            <li class="flex-box item">
              <el-input
                style="width: 116px;text-align:right"
                v-model="editingPair.key"
                placeholder="自定义名称"
              ></el-input>
              <el-input class="flex-1" v-model="editingPair.value" style="margin: 0 16px;"></el-input>
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
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <img
          v-else-if="info.hasThunmbnail"
          :src="`/api/service/thumbnail/${info.id}`"
          class="avatar"
        >
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
      fileInfo: null
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

