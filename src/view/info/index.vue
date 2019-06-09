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
              <div class="inner-title">服务地址：</div>
              <div class="inner-info">{{serviceUrl}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务名称：</div>
              <div class="inner-info">{{info.name}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务摘要：</div>
              <div class="inner-info">{{info.desc}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">关键字：</div>
              <div class="inner-info">{{info.keyword.replace(/;|；/g,'、')}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">提供单位：</div>
              <div class="inner-info">{{info.metadata.provider}}</div>
            </li>
          </ul>

          <div style="width: 574px; height: 370px; background-color: #d8d8d8;">
            <!-- iframe 直接放这里面 -->
            <iframe src="./map.html" width="100%" height="100%"></iframe>
          </div>
        </div>
      </div>

      <div class="connect style">
        <div class="title">服务其他信息</div>

        <ul class="ul-reset" style="padding: 0 16px; margin-top: 40px;">
          <li class="flex-box item" v-for="item in info.metadata.customize" :key="item.key">
            <div class="inner-title">{{item.key}}：</div>
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
  computed: {
    serviceUrl() {
      return `${location.protocol}//${location.host}/rest/services/${
        this.info.id
      }/wmts`;
    }
  },
  async mounted() {
    const { id } = this.$route.query || {};
    const data = await api.service.get(id);
    data.metadata = JSON.parse(data.metadata || "{}");
    data.metadata.customize = data.metadata.customize || [];
    api.service.visit(id);
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
  width: 80px;
  // margin-right: 8px;
  color: #828282;
  font-size: 14px;
  text-align: right;
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

