<template>
  <div class="container">
    <div class="title">服务状态监控</div>

    <div class="shadow pd-tb12 pd-lr12">
      <ul class="ul-reset">
        <li
          v-for="(item, index) in searchList"
          :key="item.id"
          :class="{
            'border-b': index !== searchList.length - 1
          }"
          style="position: relative; padding-left: 116px;"
          class="flex-box flex-wrap pd-tb8"
        >
          <h4
            class="mg-tb0 ts-16"
            style="
              width: 100px;
              text-align: right;
              position: absolute;
              left: 0;
              top: 8px;
              padding: 2px 0;
            "
          >{{item.name}}：</h4>
          <template v-if="item.children.length>0">
            <div
              v-for="(service, index) in item.children"
              :key="service.id"
              :class="{
              'mg-r16': index !== item.children.length - 1,
              'is-active': service.id === selectId
            }"
              class="ts-14 cursor pd-tb4 pd-lr8"
              @click="changeSelect(service)"
            >{{ service.name }}</div>
          </template>
          <div v-else class="ts-14 cursor pd-tb4 pd-lr8" style="height: 23px;"></div>
        </li>
      </ul>
    </div>
    <div v-if="currentService && currentService.id">
      <div class="shadow pd-lr12 pd-tb12 mg-t16 flex-box">
        <!-- 把这个div换成img 👇 -->
        <div class="mg-r16" style="width: 80px; height: 80px; background: #000;"></div>

        <div>
          <div class="mg-b8 ts-20 tw-b flex-box">
            <div class="is-active pd-tb4 pd-lr8 mg-l8 ts-12 tw-n">{{currentService.name}}</div>
          </div>

          <ul style="width: 600px;" class="ul-reset flex-box flex-wrap">
            <li class="ts-12 color-999 pd-b4" style="width: 200px;">
              服务状态：
              <span v-if="currentService.status" style="color:green">运行中</span>
              <span v-else style="color:red">已停止</span>
            </li>

            <li
              class="ts-12 color-999 pd-b4"
              style="width: 200px;"
            >关键字： {{ currentService.keyword }}</li>

            <li
              class="ts-12 color-999 pd-b4"
              style="width: 200px;"
            >发布时间： {{currentService.createAt}}</li>
          </ul>
        </div>
      </div>

      <div class="shadow pd-lr12 pd-tb12 mg-t16">
        <h4 class="mg-t0 mg-b16 flex-box space-between">
          <span>服务监控</span>

          <ul class="flex-box ul-reset tw-n ts-14">
            <!-- 这些选中的时候 time 是字符串 D W M -->
            <li
              :class="{
                'time-active': time === 'minute'
              }"
              class="mg-r16 pd-tb4 pd-lr8 cursor"
              @click="changeTime('minute')"
            >最近1小时</li>
            <li></li>
            <li
              :class="{
                'time-active': time === 'hour'
              }"
              class="mg-r16 pd-tb4 pd-lr8 cursor"
              @click="changeTime('hour')"
            >最近24小时</li>
          </ul>
        </h4>

        <ul class="flex-box ul-reset">
          <li style="border-right: 1px dashed #ccc; width: 150px; height: 280px;">
            <div class="ts-12 color-999">系统平均响应时间</div>
            <h5 class="ts-20 mg-t0 mg-b32">{{time_avg}} MS</h5>

            <div class="ts-12 color-999">峰值响应时间</div>
            <h5 class="ts-20 mg-tb0">{{time_max}} MS</h5>
          </li>

          <li style="min-height: 128px;" class="flex-1">
            <div style="height: 280px;" ref="echart" id="echart"></div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "../../api";
export default {
  name: "status_monitor",
  data() {
    return {
      time_avg: "--",
      time_max: "--",
      selectId: "",
      searchList: [],
      time: "minute",
      currentService: {
        id: "",
        name: "",
        keyword: "",
        status: 1,
        createAt: "",
        metadata: ""
      }
    };
  },
  watch: {
    time(v) {
      this.showStat();
      this.timer && clearInterval(this.timer);
      this.timer = setInterval(this.showStat, 10 * 1000);
    },
    // selectId(id) {
    //   this.showStat()
    // }
  },
  mounted() {
    api.catalog.catalog_services({ size: 1000 }).then(cataloglist => {
      for (const catalog of cataloglist) {
        var searchListItem = {
          id: catalog.id,
          name: catalog.name,
          children: catalog.items.filter(r => r)
        };
        searchListItem.children && searchListItem.children[0] && !this.selectId && (() => {
          this.selectId = searchListItem.children[0].id
          this.changeSelect(searchListItem.children[0])
        })()
        this.searchList.push(searchListItem);
      }
    });

    this.timer = setInterval(() => {
      this.showStat();
    }, 10 * 1000);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    changeTime(time) {
      this.time = time;
    },
    showStat() {
      api.admin
        .getStatusMonitorAPI({
          type: this.time,
          serviceId: this.selectId
        })
        .then(res => {
          this.time_avg = res.avg || "--";
          this.time_max = res.max || "--";
          this.draw(this.$refs.echart, res.items);
        });
    },
    changeSelect(service) {
      this.selectId = service.id || service;
      if (typeof service.metadata === "string" && service.metadata) {
        service.metadata = JSON.parse(service.metadata);
      }
      this.currentService = service;
      this.showStat();
    },
    draw(el, data) {
      const myChart = echarts.init(el);
      const xData = [];
      const yData = [];
      data.forEach((v, i) => {
        xData.push(
          time !== 'minute' ? `${new Date(v.date_time).getHours()}:00` : `${new Date(v.date_time).getMinutes()} 分`
        );
        yData.push(v.times);
      });
      const option = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: xData // x轴名称
        },
        yAxis: {
          type: "value",
          splitLine: { show: false }
        },
        tooltip: {
          trigger: "axis"
        },
        series: [
          {
            data: yData, // 数据值
            type: "line",
            smooth: true,
            lineStyle: {
              color: "rgba(72, 116, 237, .6)"
            },
            areaStyle: {
              normal: {
                color: "rgba(72, 116, 237, .2)"
              }
            },
            itemStyle: {
              color: "rgba(72, 116, 237, .8)"
            }
          }
        ]
        // dataZoom: [
        //   {
        //     type: "inside",
        //     minSpan: 1,
        //     start: 1,
        //     zoomLock: true
        //   }
        // ]
      };

      myChart.setOption(option);
    }
  }
};
</script>

<style scoped lang="scss">
.is-active {
  border-radius: 4px;
  background: #4874ed;
  color: #fff;
}
.border-b {
  border-bottom: 1px dashed #ccc;
}

.title {
  font-size: 20px;
  font-weight: 600;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
  color: #292929;
  margin-bottom: 24px;
}
.time-active {
  background: rgb(72, 116, 237);
  color: #fff;
  border-radius: 4px;
}
</style>
