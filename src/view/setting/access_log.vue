<template>
  <div class="access-log">
    <div class="title">访问日志</div>
    <div class="shadow pd-lr12 pd-tb12 mg-t16" id='accesslog-main'>
      <h4 class="mg-t0 mg-b16 flex-box space-between">
        <div></div>
        <ul class="flex-box ul-reset tw-n ts-14">
          <!-- 这些选中的时候 time 是字符串 D W M -->
          <li
            :class="{
              'time-active': time === 'today'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('today')"
          >今日</li>
          <li></li>
          <li
            :class="{
              'time-active': time === 'week'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('week')"
          >本周</li>
          <li></li>
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

      <ul class="flex-box ul-reset">
        <li style="border-right: 1px dashed #ccc; width: 150px; height: 280px;">
          <div class="ts-12 color-999">访问累计数量</div>
          <h5 class="ts-20 mg-t0 mg-b0">{{total}} 次</h5>
        </li>

        <li style="min-height: 128px;" class="flex-1">
          <div style="height: 280px;" id="echart"></div>
        </li>
      </ul>
    </div>

    <div class="shadow mg-t16 pd-lr12 pd-tb12">
      <el-table :data="logList" size="mini">
        <el-table-column label="序号" widt="80" type="index"></el-table-column>
        <el-table-column label="服务" prop="serviceName" align="center"></el-table-column>
        <el-table-column label="用户" prop="userName" align="center"></el-table-column>
        <el-table-column label="IP地址" prop="ip" align="center"></el-table-column>
        <el-table-column label="操作时间" prop="createAt" align="right"></el-table-column>
      </el-table>
      <el-pagination
        class="mg-t8"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="page"
        :page-size="size"
        @current-change="query(true)"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import api from "../../api";

export default {
  name: "access_log",
  data() {
    return {
      timeRange: [undefined, undefined],
      time: "today",
      logList: [],
      total: 0,
      page: 1,
      size: 10
    };
  },
  mounted() {
    this.query();
  },
  watch: {
    timeRange() {
      if (this.time === "custom") {
        this.query();
      } else {
        this.changeTime("custom");
      }
    }
  },
  methods: {
    /**
     * @param {[{time:"2019-08-05 00:00:00",count:6}]} data
     */
    draw(el, data) {
      console.log(data);
      const myChart = echarts.init(el);
      const xData = [];
      const yData = [];
      data.sort((f, b) => new Date(f.time).getTime() - new Date(b.time).getTime()).forEach((v, i) => {
        xData.push(
          // new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24).getDay() +
          //   " 号"
          ['today', 'yesterday'].includes(this.time) ? `${new Date(v.time).getHours()}:00` : `${new Date(v.time).getMonth() + 1}/${new Date(v.time).getDate()}`
        );
        yData.push(v.count);
      })

      // const minSpan = xData.length > 7 ? 7 : 100
      const option = {
        color: ["rgba(72, 116, 237, 1)"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "line" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: xData,
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: { show: false }
          }
        ],
        series: [
          {
            name: "访问数量",
            type: "bar",
            barWidth: "60%",
            data: yData
          }
        ]
        // dataZoom: [
        //   {
        //     type: 'inside',
        //     minSpan: minSpan,
        //     start: 100 - minSpan,
        //     zoomLock: true
        //   }
        // ]
      };

      myChart.setOption(option);
    },
    query(logOnly) {
      var loading=this.$loading({text:'正在加载...',target:'#accesslog-main'})
      api.admin
        .getAccessLog({
          type: this.time,
          from: this.timeRange[0],
          to: this.timeRange[1],
          page: this.page,
          size: this.size,
          logOnly: !!logOnly
        })
        .then(data => {
          this.logList = data.list;
          this.page = data.page;
          this.size = data.size;
          this.total = data.total;
          if (!logOnly)
            this.draw(document.getElementById("echart"), data.stat_list);

          loading.close()
        }).catch(err=>{
          console.log(err)
          loading.close()
        });
    },
    changeTime(time) {
      this.time = time;
      this.query();
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
