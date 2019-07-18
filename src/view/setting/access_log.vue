<template>
  <div class="access-log">
    <div class="title">访问日志</div>
    <h3 class="mg-t0 flex-box">
      <ul class="flex-box ul-reset tw-n ts-14">
        <!-- 这些选中的时候 time 是字符串 D W M -->
        <li
          :class="{
            'time-active': time === 'D'
          }"
          class="mg-r16 pd-tb4 pd-lr8 cursor"
          @click="changeTime('D')"
        >今日</li>
        <li></li>
        <li
          :class="{
            'time-active': time === 'W'
          }"
          class="mg-r16 pd-tb4 pd-lr8 cursor"
          @click="changeTime('W')"
        >本周</li>
        <li></li>
        <li
          :class="{
            'time-active': time === 'M'
          }"
          class="mg-r16 pd-tb4 pd-lr8 cursor"
          @click="changeTime('M')"
        >本月</li>
        <li>
          <!-- 这个选中的时候 time 是个数组 [startTime, endTime] -->
          <el-date-picker
            v-model="time"
            :clearable="false"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          ></el-date-picker>
        </li>
      </ul>
    </h3>

    <div class="shadow pd-lr12 pd-tb12 mg-t16">
      <h4 class="mg-t0 mg-b16">日志分析</h4>

      <ul class="flex-box ul-reset">
        <li style="border-right: 1px dashed #ccc; width: 150px; height: 400px;">
          <div class="ts-12 color-999">访问累计数量</div>
          <h5 class="ts-20 mg-t0 mg-b0">123123</h5>
        </li>

        <li style="min-height: 128px;" class="flex-1">
          <div style="height: 400px;" id="echart"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";

export default {
  name: "access_log",
  data() {
    return {
      time: "D",
      type: "all"
    };
  },
  mounted() {
    this.draw(document.getElementById("echart"));
  },
  methods: {
    draw(el) {
      const myChart = echarts.init(el);
      const xData = [];
      for (let i = 0; i < 100; i++) {
        xData.push(
          new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24).getDay() +
            " 号"
        );
      }
      const yData = [];
      for (let i = 0; i < 100; i++) {
        yData.push(Math.ceil(Math.random() * 10) * 111);
      }
      const option = {
        grid: {
          left: "10%",
          right: "10%",
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
        ],
        dataZoom: [
          {
            type: "inside",
            minSpan: 6,
            start: 94,
            zoomLock: true
          }
        ]
      };

      myChart.setOption(option);
    },
    changeTime(time) {
      this.time = time;
    }
  }
};
</script>

<style scoped lang="scss">
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
</style>
