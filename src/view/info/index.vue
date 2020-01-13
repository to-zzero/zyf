<template>
  <div class="info-wrap">
    <el-header style="padding: 0;">
      <layout-header></layout-header>
    </el-header>

    <div class="content" v-if="map_load">
      <div class="basis style mg-b16">
        <div class="title">
          服务基本信息
          <el-button
            type="warning"
            size="small"
            :loading="deleting_cache"
            @click="deleteCache"
            v-if="info.type ==1"
          >清空缓存</el-button>
        </div>

        <div style="padding: 0 16px; margin-top: 40px;" class="flex-box space-between">
          <ul class="ul-reset">
            <li class="flex-box item">
              <div class="inner-title">服务地址：</div>
              <div class="inner-info">
                <span :href="GetCapabilitiesUrl" target="about_blank">{{GetCapabilitiesUrl}}</span>
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
              <div class="inner-info">{{info.metadata.abstract}}</div>
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
              <div class="inner-title">发布人：</div>
              <div class="inner-info">{{info.publisher}}</div>
            </li>
            <li class="flex-box item">
              <div class="inner-title">预览图：</div>
              <img class="inner-info" :src="`./api/service/thumbnail/${info.id}`" />
            </li>
          </ul>

          <div class="map-container">
            <!-- iframe 直接放这里面 -->
            <iframe
              style="border: 1px solid #ebeef5;"
              v-if="map_load"
              :src="`./map.html?service=${info.id}`"
              width="100%"
              height="100%"
            ></iframe>
          </div>
        </div>
      </div>
      <div class="connect style" v-if="info.aggregate">
        <div class="title">聚合信息</div>
        <div style="padding: 0 16px; margin-top: 40px;" class="flex-box space-between">
          <ul class="ul-reset">
            <li class="flex-box item">
              <div class="inner-title">服务列表：</div>
              <div class="inner-info">
                <el-table :data="info.aggregate.layers" border :show-header="false">
                  <el-table-column prop="title" width="400px"></el-table-column>
                </el-table>
              </div>
            </li>

            <li class="flex-box item">
              <div class="inner-title">瓦片级别：</div>
              <div class="inner-info">
                <span>{{info.aggregate.minZoom}}级 - {{info.aggregate.maxZoom}}级</span>
              </div>
            </li>
          </ul>
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
      <div class="connect style" v-if="info.type!=1">
        <div class="title">
          缓存状态信息
          <el-button size="mini" type="primary" @click="loadCacheStatus">刷新</el-button>
          <el-button size="mini" type="danger" @click="rebuildCache">重建</el-button>
          <el-tag v-if="cacheStatus">{{ cacheStatus }}</el-tag>
        </div>
        <el-table
          :data="cacheInfo.lodInfos"
          v-loading="cache_loading"
          element-loading-text="正在加载缓存信息..."
        >
          <el-table-column label="级别" width="60" align="center" prop="levelID"></el-table-column>
          <el-table-column label="比例尺" prop="scale"></el-table-column>
          <el-table-column label="大小" prop="tilesSize">
            <template slot-scope="scope">{{((scope.row.tilesSize||0)/1024/1024).toFixed(2)}} MB</template>
          </el-table-column>
          <el-table-column label="预期切片" prop="expectedTileCount"></el-table-column>
          <el-table-column label="完成的切片" prop="tileCount"></el-table-column>
          <el-table-column label="百分比" prop="percent">
            <template slot-scope="scope">{{scope.row.percent }}%</template>
          </el-table-column>
          <el-table-column label="状态" prop="status">
            <template slot-scope="scope">
              <el-tag type="success" v-if="scope.row.status==='Complete'">完成</el-tag>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
// import api from "@/api";
import api from "../../api";
import LayoutHeader from "../layout/header";
import { type } from "os";
// import Map from "../map";

export default {
  name: "info",
  data() {
    return {
      id: "",
      info: {
        keyword: "",
        metadata: {
          customize: []
        }
      },
      cacheInfo: {
        cacheExecutionStatus: "NONE",
        lodInfos: [],
        status: "EXISTS"
      },
      cache_loading: false,
      map_load: false,
      siteInfo: null,
      deleting_cache: false
    };
  },
  components: {
    LayoutHeader
    // Map
  },
  computed: {
    serviceUrl() {
      return `/rest/services/${this.info.id}`;
    },
    GetCapabilitiesUrl() {
      console.log(this.siteInfo.addr);
      if (this.siteInfo)
        return (
          this.siteInfo.addr +
          `/rest/services/${this.info.id}/wmts/tile/1.0.0/default/default028mm/{level}/{row}/{col}.png?token=`
        );
      return `/rest/services/${this.info.id}/wmts/tile/1.0.0/default/default028mm/{level}/{row}/{col}.png?token=`;
    },
    initExtent() {
      if (this.info && this.info.metadata)
        return this.info.metadata.init_extent || {};
      return {};
    },
    pubdate() {
      if (this.info) return dayjs(this.info.createdAt).format("YYYY-MM-DD");
      return "--";
    },
    cacheStatus() {
      if (!this.cacheInfo || !this.cacheInfo.cacheExecutionStatus) return null;
      switch (this.cacheInfo.cacheExecutionStatus) {
        case "PROCESSING":
          return "处理中...";
          break;

        default:
          break;
      }
    }
  },
  async mounted() {
    const { id } = this.$route.query || {};
    this.id = id;

    this.siteInfo = await api.service.getSiteInfo();
    const data = await api.service.get(id);
    data.aggregate = JSON.parse(data.aggregate);
    data.metadata = JSON.parse(data.metadata || "{}");
    data.metadata.customize = data.metadata.customize || [];
    // api.service.visit(id);
    this.map_load = true;
    this.info = data;

    if (this.info.type === 0) {
      this.loadCacheStatus();
    }
  },
  methods: {
    loadCacheStatus() {
      this.cache_loading = true;
      api.service
        .getTileCacheStatus(this.id)
        .then(data => {
          this.cacheInfo = data;
          this.cache_loading = false;
        })
        .catch(err => {
          this.cache_loading = false;
        });
    },

    rebuildCache() {
      this.$confirm("重建索引需要较长实际，是否继续?", "提示", {
        confirmButtonText: "继续",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        return api.service
          .rebuildCache(this.id)
          .then(() => {
            setTimeout(() => {
              this.loadCacheStatus();
            }, 1000);
          })
          .catch(err => {
            this.$message(err);
          });
      });
    },
    async deleteCache() {
      this.$confirm("确定要清除本服务缓存？", "清空缓存").then(() => {
        try {
          this.deleting_cache = true;
          api.service.deleteAggrateCache(this.id);
          this.$message({ type: "success", message: "缓存已清空" });
        } catch (error) {
          this.$message({ type: "error", message: "清空缓存失败，请稍后重试" });
        }
        this.deleting_cache = false;
      });
    }
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
  margin-bottom: 6px;
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
  white-space: nowrap;
}
.inner-info {
  font-size: 14px;
  font-weight: 600;
  color: #292929;
  word-break: break-all;
}
.item {
  &:not(:last-of-type) {
    margin-bottom: 16px;
  }
}

.map-container {
  min-width: 500px;
  height: 400px;
  background-color: rgb(216, 216, 216);
  right: 180px;
  top: 230px;
  flex: 1;
}
</style>

