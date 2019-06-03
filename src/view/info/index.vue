<template>
  <div class="info-wrap">
    <el-header style="padding: 0;">
      <layout-header></layout-header>
    </el-header>

    <div class="content">
      <div class="basis style mg-b16">
        <div class="title">服务基本信息</div>

        <div style="padding: 0 16px; margin-top: 40px;" class="flex-box space-between">
          <ul class="ul-reset">
            <li class="flex-box item">
              <div class="inner-title">服务URL</div>
              <div class="inner-info">{{info.metadata.url}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务名称</div>
              <div class="inner-info">{{info.name}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务简介</div>
              <div class="inner-info">{{info.desc}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">关键字</div>
              <div class="inner-info">{{info.keyword.replace(';','、')}}</div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">主题分类</div>
              <div class="inner-info">基础地理框架数据</div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">坐标系</div>
              <div class="inner-info">{{info.metadata.coord}}</div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">投影类型</div>
              <div class="inner-info">{{info.metadata.proj}}</div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">发布机构</div>
              <div class="inner-info">{{info.metadata.provider}}</div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">联系人</div>
              <div class="inner-info">{{ info.metadata.contract_name}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">联系人电话</div>
              <div class="inner-info">{{ info.metadata.contract_num}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">联系人邮箱</div>
              <div class="inner-info">{{ info.metadata.contract_mail}}</div>
            </li>
          </ul>

          <div style="width: 574px; height: 370px; background-color: #d8d8d8;">
            <!-- iframe 直接放这里面 -->
          </div>
        </div>
      </div>

      <div class="connect style">
        <div class="title">服务其他信息</div>

        <ul class="ul-reset" style="padding: 0 16px; margin-top: 40px;">
          <li class="flex-box item" v-for="item in info.metadata.customize" :key="item.key">
            <div class="inner-title">{{item.key}}</div>
            <div class="inner-info">{{ item.value }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import LayoutHeader from "../layout/header";
export default {
  name: "info",
  data() {
    return {
      info: {
        keyword: "",
        metadata: {
          customize: []
        }
      }
    };
  },
  components: {
    LayoutHeader
  },
  async mounted() {
    const { id } = this.$route.query || {};
    const data = await api.service.get(id);
    data.metadata = JSON.parse(data.metadata || "{}");
    data.metadata.customize = data.metadata.customize || [];
    this.info = data;
  }
};
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

