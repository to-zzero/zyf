<template>
  <div class="info-edit">
    <layout-header></layout-header>

    <div class="info-edit_content">
      <ul class="ul-reset">
        <li class="flex-box item">
          <div class="item-title">
            服务URL：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            服务名称：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            服务简介：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            关键字：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            服务类型：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            主题分类：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            覆盖区域：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            坐标系：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            投影类型：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            使用权限：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            服务预览：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            服务名称：
          </div>
          <el-input class="flex-1"></el-input>
        </li>

        <li class="flex-box item">
          <div class="item-title">
            所属分组：
          </div>
          <el-select multiple class="flex-1" v-model="value1" clearable placeholder="请选择">
            <template v-for="item in 3"> <!-- 循环template -->
              <div style="font-size: 12px; opacity: 0.5; color: #354052; padding: 8px 12px;">
                {{item}}-一级
              </div>
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </template>
          </el-select>
        </li>

        <li v-if="!customArr.length" class="item" style="text-align: right;">
          <el-button type="primary" v-if="index === customArr.length - 1 || !customArr.length" style="margin-left: 16px;" @click="add">添加自定义名称</el-button>
        </li>

        <li
          v-for="(item, index) in customArr"
          :key="index"
          class="flex-box item">
          <el-input style="width: 116px" placeholder="自定义名称"></el-input>
          <el-input class="flex-1" style="margin: 0 16px;"></el-input>
          <el-button v-if="index !== customArr.length - 1" @click="remove(index)">删除</el-button>
          <el-button v-else type="primary" @click="add">添加</el-button>
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
  import LayoutHeader from '../layout/header'
  export default {
    name: 'InfoEdit',
    components: {
      LayoutHeader
    },
    data () {
      return {
        value1: [],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        customArr: [
          {}
        ]
      }
    },
    methods: {
      add () {
        this.customArr.push({})
        console.log(this.customArr)
      },
      remove (index) {
        this.customArr.splice(index, 1)
      }
    }
  }
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
    width: 116px;
  }
</style>

