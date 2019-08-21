<template>
  <div class="discharge-count">
    <h3 class="title">流量统计</h3>

    <div class="shadow pd-lr12 pd-tb12">
      <h4 class="mg-t0 mg-b16">概览</h4>

      <ul class="ul-reset flex-box space-between">
        <li class="view-item flex-box">
          <div class="single-text">今</div>

          <div class="mg-l8">
            <p class="mg-tb0 ts-14 color-999">今日</p>
            <h6 class="ts-20 mg-t0 mg-b0">{{ summaryToday }}</h6>
          </div>
        </li>

        <li class="view-item flex-box">
          <div class="single-text">昨</div>

          <div class="mg-l8">
            <p class="mg-tb0 ts-14 color-999">昨日</p>
            <h6 class="ts-20 mg-t0 mg-b0">{{summaryYesterday}}</h6>
          </div>
        </li>

        <li class="view-item flex-box">
          <div class="single-text">月</div>

          <div class="mg-l8">
            <p class="mg-tb0 ts-14 color-999">本月</p>
            <h6 class="ts-20 mg-t0 mg-b0">{{summaryMonth}}</h6>
          </div>
        </li>

        <li class="view-item flex-box">
          <div class="single-text">年</div>

          <div class="mg-l8">
            <p class="mg-tb0 ts-14 color-999">今年</p>
            <h6 class="ts-20 mg-t0 mg-b0">{{summaryYear}}</h6>
          </div>
        </li>
      </ul>
    </div>

    <div class="shadow pd-lr12 pd-tb12 mg-t16">
      <h4 class="mg-t0 mg-b16 border-bottom flex-box space-between">
        <span>分类统计</span>

        <ul class="flex-box ul-reset tw-n ts-14">
          <!-- 这些选中的时候 time 是字符串 D W M -->
          <li
            :class="{
              'time-active': time === 'today'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('today')"
          >今日</li>
          <li
            :class="{
              'time-active': time === 'yesterday'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('yesterday')"
          >昨日</li>
          <li
            :class="{
              'time-active': time === 'week'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('week')"
          >本周</li>
          <li
            :class="{
              'time-active': time === 'month'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('month')"
          >本月</li>
          <li>
            <!-- 这个选中的时候 time 是个数组 [startTime, endTime] -->
            <el-date-picker
              v-model="timeRange"
              :clearable="false"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            ></el-date-picker>
          </li>
        </ul>
      </h4>

      <ul class="ul-reset flex-box">
        <li class="pd-tb4 pd-r8 ts-14 color-999">图表类型：</li>
        <li
          :class="{
            'time-active': type === 'all'
          }"
          @click="changeType('all')"
          class="pd-lr8 pd-tb4 cursor ts-14 mg-r16"
        >全部</li>
        <li
          :class="{
            'time-active': type === 'user'
          }"
          @click="changeType('user')"
          class="pd-lr8 pd-tb4 cursor ts-14 mg-r16"
        >按授权用户</li>
        <li
          :class="{
            'time-active': type === 'service'
          }"
          @click="changeType('service')"
          class="pd-lr8 pd-tb4 cursor ts-14"
        >按服务</li>
      </ul>

      <div style="height: 280px;" id="echart"></div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import echarts from "echarts";
const UNITS = ["K", "M", "G", "T"];

export default {
  name: "discharge_count",
  data() {
    return {
      summary: {},
      time: "today",
      timeRange: [],
      type: "all",
      timer: ""
    };
  },
  watch: {
    timeRange(n, old) {
      this.time = null;
      this.time = "custom";
    },
    time() {
      if (this.time) {
        this.getData();
      }
    },
    type() {
      if (this.type) {
        this.getData();
      }
    }
  },
  mounted() {
    api.admin.getDiachargeSmmary().then(data => {
      this.summary = data;
    });

    this.getData();
    // this.timer = setInterval(() => {
    //   this.getData();
    // }, 10 * 1000);
  },
  beforeDestroy() {
    this.timer && clearInterval(this.timer);
  },
  methods: {
    draw(el, data) {
      console.log(data);
      const myChart = echarts.init(el);
      const xData = [];
      const yData = [];
      if (this.type == "all") {
        data.forEach((v, i) => {
          xData.push(
            // new Date(
            //   new Date(v.date_time).getTime() + i * 1000 * 60 * 60 * 24
            // ).getDate() + " 日"
            ["today", "yesterday"].includes(this.time)
              ? `${new Date(v.date_time).getHours()}:00`
              : `${new Date(v.date_time).getMonth() + 1}/${new Date(
                  v.date_time
                ).getDate()}`
          );
          yData.push(v.count);
        });
      } else {
        data.forEach((v, i) => {
          xData.push(v.name);
          yData.push(v.count);
        });
      }
      const option = {
        grid: {
          left: "5%",
          right: "5%",
          top: "24px",
          bottom: "24px"
        },
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
        //     type: 'inside',
        //     minSpan: 6,
        //     start: 94,
        //     zoomLock: true
        //   }
        // ]
      };

      myChart.setOption(option);
    },
    changeTime(time) {
      this.time = time;
    },
    changeType(type) {
      this.type = type;
    },
    getData() {
      var param = {
        time: this.time,
        type: this.type
      };
      if (
        this.timeRange &&
        this.timeRange.length > 0 &&
        this.time == "custom"
      ) {
        param.from = this.timeRange[0];
        param.to = this.timeRange[1];
      }

      return api.admin.getDiachargeAPI(param).then(res => {
        this.draw(document.getElementById("echart"), res.items);
      });
    },
    amount2unit(num_amount = 0, unit = "K") {
      num_amount = num_amount || 0;
      var unit_index = UNITS.indexOf(unit);
      if (num_amount > 1024) {
        return amount2unit(num_amount / 1024.0, UNITS[unit_index + 1]);
      } else {
        return `${num_amount.toFixed(1)} ${unit}`;
      }
    }
  },
  computed: {
    summaryToday() {
      return this.amount2unit(this.summary.today);
    },
    summaryYesterday() {
      return this.amount2unit(this.summary.yesterday);
    },
    summaryMonth() {
      return this.amount2unit(this.summary.month);
    },
    summaryYear() {
      return this.amount2unit(this.summary.year);
    }
  }
};
</script>

<style scoped lang="scss">
.view-item {
  border-radius: 4px;
  border: 1px solid #ccc;
  padding: 12px;
  flex: 1;
  &:not(:last-of-type) {
    margin-right: 16px;
  }
}
.time-active {
  background: rgb(72, 116, 237);
  color: #fff;
  border-radius: 4px;
}

.title {
  font-size: 20px;
  font-weight: 600;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
  color: #292929;
  margin-bottom: 24px;
}

.single-text {
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: #efefef;
  text-align: center;
  line-height: 48px;
  color: #5280ff;
  font-size: 35px;
}
</style>
