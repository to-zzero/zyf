<template>
  <div class="safety-warning">
    <h3 class="title">安全警告</h3>

    <div class="shadow pd-lr12 pd-tb12">
      <h4 class="mg-t0 mg-b16 border-bottom flex-box space-between pd-b8">
        <span>新增非法访问IP</span>

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

      <div style="height: 280px;" id="echart"></div>
    </div>

    <div class="shadow mg-t16 pd-lr12 pd-tb12">
      <el-table :data="tableData">
        <el-table-column align="left" type="index" width="80" label="序号"></el-table-column>

        <el-table-column align="center" prop="createAt" label="时间"></el-table-column>

        <el-table-column align="center" prop="ip" label="IP地址"></el-table-column>

        <!-- <el-table-column align="right" label="访问次数"></el-table-column> -->
      </el-table>

      <div class="mg-t8">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page.sync="page"
          :page-size="size"
        ></el-pagination>
        <!-- @current-change="handlePageChange" -->
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api";
import echarts from "echarts";

export default {
  name: "safety_warning",
  data() {
    return {
      tableData: [],
      total: 0,
      page: 0,
      size: 10,
      time: "today",
      timeRange: [undefined, undefined]
    };
  },
  watch: {
    time(v) {
      if (!v) {
        return;
      }
      this.getData();
    },
    timeRange() {
      if (this.time == "custom") {
        this.getData();
      } else {
        this.time = "custom";
      }
    }
  },
  mounted() {
    this.getData();
  },
  methods: {
    draw(el, data) {
      const myChart = echarts.init(el);
      const xData = [];
      const yData = [];
      data.forEach((v, i) => {
        xData.push(
          new Date(
            new Date(v.date_time).getTime() + i * 1000 * 60 * 60 * 24
          ).getDate() + " 日"
        );
        yData.push(v.ip_number);
      });
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
    getData() {
      var param = { type: this.time };
      if (this.time === "custom") {
        param.from = this.timeRange[0];
        param.to = this.timeRange[1];
      }
      return api.admin.getSafetyWarningAPI(param).then(res => {
        this.total = res.total;
        this.page = res.page;
        this.size = res.size;
        this.tableData = res.list;
        this.draw(document.getElementById("echart"), res.stat_list);
      });
    }
  }
};
</script>

<style scoped lang="scss">
.border-bottom {
  border-bottom: 1px solid #ccc;
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
</style>
