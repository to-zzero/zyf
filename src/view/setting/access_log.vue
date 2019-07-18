<template>
  <div class="access-log">
    <h3 class="mg-t0">
      访问日志
    </h3>

    <div class="shadow pd-lr12 pd-tb12 mg-t16">
      <h4 class="mg-t0 mg-b16 flex-box space-between">
        <span>日志分析</span>

        <ul class="flex-box ul-reset tw-n ts-14">
          <!-- 这些选中的时候 time 是字符串 D W M -->
          <li
            :class="{
              'time-active': time === 'D'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('D')">今日</li>
          <li>
            <li
            :class="{
              'time-active': time === 'W'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('W')">本周</li>
          <li>
          <li
            :class="{
              'time-active': time === 'M'
            }"
            class="mg-r16 pd-tb4 pd-lr8 cursor"
            @click="changeTime('M')">本月</li>
          <li>
            <!-- 这个选中的时候 time 是个数组 [startTime, endTime] -->
            <el-date-picker
              v-model="time"
              :clearable="false"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </li>
        </ul>
      </h4>

      <ul class="flex-box ul-reset">
        <li style="border-right: 1px dashed #ccc; width: 150px; height: 400px;">
          <div class="ts-12 color-999">
            访问累计数量
          </div>
          <h5 class="ts-20 mg-t0 mg-b0">
            123123
          </h5>
        </li>

        <li
          style="min-height: 128px;"
          class="flex-1">
          <div style="height: 400px;" id="echart"></div>
        </li>
      </ul>
    </div>

    <div class="shadow mg-t16 pd-lr12 pd-tb12">
      <el-table :data="logList" size="mini">
        <el-table-column label="编号" widt="80" type="index"></el-table-column>
        <el-table-column label="日志名" prop="username" align="center"></el-table-column>
        <el-table-column label="用户" prop="function" align="center"></el-table-column>
        <el-table-column label="IP地址" prop="status" align="center"></el-table-column>
        <el-table-column label="操作时间" prop="createAt" align="right"></el-table-column>
      </el-table>
      <el-pagination
        class="mg-t8"
        background
        layout="prev, pager, next"
        :total="total"
        :current-page.sync="page"
        :page-size="size"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'access_log',
    data () {
      return {
        time: 'D',
        type: 'all',
        logList: [],
        total: 0,
        page: 1,
        size: 10
      }
    },
    mounted() {
      this.draw(document.getElementById('echart'))
    },
    methods: {
      draw(el) {
        const myChart = echarts.init(el)
        const xData = []
        for (let i = 0; i < 100; i++) {
          xData.push(new Date(new Date().getTime() + i * 1000 * 60 * 60 * 24).getDay() + ' 号')
        }
        const yData = []
        for (let i = 0; i < 100; i++) {
          yData.push(Math.ceil(Math.random() * 10) * 111)
        }

        const minSpan = xData.length > 7 ? 7 : 100
        const option = {
          color: ['rgba(72, 116, 237, 1)'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'line'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : xData,
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value',
              splitLine: {show: false}
            }
          ],
          series : [
            {
              name: '访问数量',
              type: 'bar',
              barWidth: '60%',
              data: yData
            }
          ],
          dataZoom: [
            {
              type: 'inside',
              minSpan: minSpan,
              start: 100 - minSpan,
              zoomLock: true
            }
          ]
        };

        myChart.setOption(option)
      },
      changeTime(time) {
        this.time = time
      }
    }
  }
</script>

<style scoped lang="scss">
  .time-active {
    background: rgb(72, 116, 237);
    color: #fff;
    border-radius: 4px;
  }
</style>
