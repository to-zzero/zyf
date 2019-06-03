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
          <el-select multiple class="flex-1" v-model="value1" clearable placeholder="请选择">
            <template v-for="item in 3">
              <!-- 循环template -->
              <div
                style="font-size: 12px; opacity: 0.5; color: #354052; padding: 8px 12px;"
              >{{item}}-一级</div>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </template>
          </el-select>
        </li>
        <!-- 
        <li v-if="!customArr.length" class="item" style="text-align: right;">
          <el-button
            type="primary"
            v-if="index === customArr.length - 1 || !customArr.length"
            style="margin-left: 16px;"
            @click="add"
          >添加自定义名称</el-button>
        </li>-->

        <li v-for="(item, index) in customArr" :key="index" class="flex-box item">
          <el-input style="width: 116px;text-align:right" v-model="item.key"></el-input>
          <el-input class="flex-1" style="margin: 0 16px;" v-model="item.value"></el-input>
          <el-button v-if="index !== customArr.length - 1" @click="remove(index)">删除</el-button>
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

        <li class="flex-box item mg-t40">
          <el-button type="primary" class="flex-1" style="margin-left: 116px;" @click="update">更新</el-button>
          <!-- <el-button style="margin-left: 16px;">取消</el-button> -->
        </li>
      </ul>

      <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="imageUrl" :src="imageUrl" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
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
      customArr: [],
      editingPair: { key: "", value: "" },
      imageUrl: ''
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      return isJPG && isLt2M;
    },
    add() {
      this.customArr.push({
        ...this.editingPair
      });
      this.editingPair.key = "";
      this.editingPair.value = "";
    },
    methods: {
      add() {
        this.customArr.push({});
        console.log(this.customArr);
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
        var success = await api.service.update(info);
        if (success) {
          this.$message({
            message: "保存成功",
            type: "success"
          });
        } else {
          this.$message({
            message: "保存失败",
            type: "error"
          });
        }
      }
    }
  },
  mounted() {
    const { id } = this.$route.query || {};
    api.service.get(id).then(data => {
      data.metadata = JSON.parse(data.metadata || "{}");
      this.info = data;
      this.customArr = data.metadata.customize || [];
    });

    api.catalog.catalog_list().then(data => {
      this.options = data;
    });
  }
};
</script>

<style lang="scss">
  .info-edit_content {
    position: relative;
    .avatar-uploader {
      position: absolute;
      right: 16px;
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
      border-color: #409EFF;
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
    margin-bottom: 24px;
  }
}

.item-title {
  text-align: right;
  font-size: 14px;
  color: #696969;
  margin-right: 16px;
  width: 116px;
}
</style>

