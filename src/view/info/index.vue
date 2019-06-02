<template>
  <div class="info-wrap">
    <el-header style="padding: 0;">
      <layout-header></layout-header>
    </el-header>

    <div class="content">
      <div class="basis style mg-b16">
        <div class="title">
          服务基本信息
        </div>

        <div style="padding: 0 16px; margin-top: 40px;" class="flex-box space-between">
          <ul class="ul-reset">
            <li class="flex-box item">
              <div class="inner-title">
                服务URL
              </div>
              <div class="inner-info">
                http：//weizhiwangluo.com
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                服务名称
              </div>
              <div class="inner-info">
                全球影像地图服务
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                服务简介
              </div>
              <div class="inner-info">
                全球影像地图服务
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                关键字
              </div>
              <div class="inner-info">
                天地图 、 影像地图 、 经纬图 、 WMTS
              </div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">
                服务类型
              </div>
              <div class="inner-info">
                OGC WMTS
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                主题分类
              </div>
              <div class="inner-info">
                基础地理框架数据
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                覆盖区域
              </div>
              <div class="inner-info">
                全球
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                坐标系
              </div>
              <div class="inner-info">
                CGCS2000
              </div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">
                投影类型
              </div>
              <div class="inner-info">
                经纬度
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                使用权限
              </div>
              <div class="inner-info">
                公开
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                服务预览:
              </div>
              <div class="inner-info">
                http：//weizhiwangluo.com
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">
                更新周期
              </div>
              <div class="inner-info">
                一年
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div class="connect style">
        <div class="title">
          服务联系信息
        </div>

        <ul class="ul-reset" style="padding: 0 16px; margin-top: 40px;">
          <li class="flex-box item">
            <div class="inner-title">
              发布机构
            </div>
            <div class="inner-info">
              国家基础地理信息中心
            </div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">
              地址
            </div>
            <div class="inner-info">
              北京海淀区莲花池西路28号
            </div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">
              网站
            </div>
            <div class="inner-info">
              www.unkonwn.com
            </div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">
              联系人
            </div>
            <div class="inner-info">
              天地图工作部
            </div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">
              联系人电话
            </div>
            <div class="inner-info">
              010-68245584
            </div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">
              联系人邮箱
            </div>
            <div class="inner-info">
              tdt@ngcc.cn
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  import LayoutHeader from '../layout/header'
  export default {
    name: 'info',
    components: {
      LayoutHeader
    },
    async mounted () {
      const { id } = this.$route.query || {}
      const data = await api.service.getInfo(id)
      console.log(data)
    }
  }
</script>

<style lang="scss" scoped>
  .info-wrap {
    padding-bottom: 24px;
  }
  .content {
    width: 1200px;
    margin: 24px auto 0;
  }
  .style {
    border-radius: 4px;
    box-shadow: 1px 0 9px 0 rgba(78, 78, 78, 0.08);
    background-color: #ffffff;
    padding: 32px;
    box-sizing: border-box;
  }
  .title {
    font-size: 20px;
    font-weight: 600;
    color: #292929;
    padding-left: 12px;
    border-left: 4px solid #4874ed;
  }
  .inner-title {
    width: 100px;
    margin-right: 16px;
    color: #828282;
    font-size: 14px;
  }
  .inner-info {
    font-size: 14px;
    font-weight: 600;
    color: #292929;
  }
  .item {
    &:not(:last-of-type) {
      margin-bottom: 16px;
    }
  }
</style>

