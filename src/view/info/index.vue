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
              <div class="inner-info">
                <a :href="GetCapabilitiesUrl" target="about_blank">{{serviceUrl}}</a>
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务名称：</div>
              <div class="inner-info">{{info.name}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">关键字：</div>
              <div class="inner-info">{{info.keyword.replace(/;|；/g,'、')}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务摘要：</div>
              <div class="inner-info">{{info.desc}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务类型：</div>
              <div class="inner-info">{{info.metadata.type|| 'OGC WMTS'}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">坐标系统：</div>
              <div class="inner-info">{{info.metadata.coord}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">投影类型：</div>
              <div class="inner-info">{{info.metadata.proj}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">服务范围：</div>
              <div class="inner-info">
                <div class="inner-info">左上角经度：{{initExtent.xmin}}</div>
                <div class="inner-info">左上角纬度：{{initExtent.ymax}}</div>
                <div class="inner-info">右下角经度：{{initExtent.xmax}}</div>
                <div class="inner-info">右下角纬度：{{initExtent.ymin}}</div>
              </div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">发布时间：</div>
              <div class="inner-info">{{pubdate}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">提供单位：</div>
              <div class="inner-info">{{info.metadata.provider}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">预览图：</div>
              <img class="inner-info" :src="`/api/service/thumbnail/${info.id}`">
            </li>
          </ul>

          <div style="width: 574px; height: 370px; background-color: #d8d8d8;">
            <!-- iframe 直接放这里面 -->
            <iframe
              :src="`./map.html?proxy=${proxy}&service=${info.id}`"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="connect style">
        <div class="title">服务联系信息</div>
        <ul>
          <li class="flex-box item">
            <div class="inner-title">发布机构：</div>
            <div class="inner-info">{{info.metadata.organization}}</div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">地址：</div>
            <div class="inner-info">{{info.metadata.address}}</div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">联系人：</div>
            <div class="inner-info">{{info.metadata.contact}}</div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">联系人电话：</div>
            <div class="inner-info">{{info.metadata.contact_phone}}</div>
          </li>
          <li class="flex-box item">
            <div class="inner-title">联系人邮箱：</div>
            <div class="inner-info">{{info.metadata.contact_mail}}</div>
          </li>
        </ul>
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
import dayjs from "dayjs";
// import api from "@/api";
import api from "../../api";
import LayoutHeader from "../layout/header";

export default {
  name: "info",
  data() {
    return {
      proxy: "",
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
      return `/rest/services/${this.info.id}`;
    },
    GetCapabilitiesUrl() {
      return `/api/service/GetCapabilities/${this.info.id}`;
    },
    initExtent() {
      if (this.info && this.info.metadata)
        return this.info.metadata.init_extent || {};
      return {};
    },
    pubdate() {
      if (this.info) return dayjs(this.info.createdAt).format("YYYY-MM-DD");
      return "--";
    }
  },
  async mounted() {
    const { id } = this.$route.query || {};

    const [data, capabilities, proxy] = await Promise.all([
      api.service.get(id),
      api.service.getCapabilities(id),
      api.service.getProxy()
    ]);
    this.proxy = proxy;
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
  width: 100px;
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

