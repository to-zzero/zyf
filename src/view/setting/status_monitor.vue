<template>
  <div class="container">
    <h3 class="mg-t0">服务状态监控</h3>

    <div class="shadow pd-tb12 pd-lr12">
      <ul class="ul-reset">
        <li
          v-for="(item, index) in searchList"
          :key="item.id"
          :class="{
            'border-b': index !== searchList.length - 1
          }"
          style="position: relative; padding-left: 116px;"
          class="flex-box flex-wrap pd-tb8">
          <h4
            class="mg-tb0 ts-16"
            style="
              width: 100px;
              text-align: right;
              position: absolute;
              left: 0;
              top: 8px;
              padding: 2px 0;
            ">
            {{item.name}}：
          </h4>
          <div
            v-for="(i, index) in item.children"
            :key="i.id"
            :class="{
              'mg-r16': index !== item.children.length - 1,
              'is-active': i.id === selectId
            }"
            class="ts-14 cursor pd-tb4 pd-lr8"
            @click="changeSelect(i.id)">
            {{ i.name }}
          </div>
        </li>
      </ul>
    </div>

    <div class="shadow pd-lr12 pd-tb12 mg-t16 flex-box">
      <!-- 把这个div换成img 👇 -->
      <div
        class="mg-r16"
        style="width: 80px; height: 80px; background: #000;">
      </div>

      <div>
        <div class="mg-b8 ts-20 tw-b flex-box">
          服务名称
          <div class="is-active pd-tb4 pd-lr8 mg-l8 ts-12 tw-n">
            海图A服务
          </div>
        </div>

        <ul
          style="width: 600px;"
          class="ul-reset flex-box flex-wrap">
          <li
            class="ts-12 color-999 pd-b4"
            style="width: 200px;">
            关键字： WMTS
          </li>

          <li
            class="ts-12 color-999 pd-b4"
            style="width: 200px;">
            摘要： WMTS
          </li>

          <li
            class="ts-12 color-999 pd-b4"
            style="width: 200px;">
            发布时间： WMTS
          </li>

          <li
            class="ts-12 color-999 pd-b4"
            style="width: 200px;">
            服务状态： WMTS
          </li>

          <li
            class="ts-12 color-999 pd-b4"
            style="width: 200px;">
            提供单位： WMTS
          </li>
        </ul>
      </div>
    </div>

    <div class="shadow pd-lr12 pd-tb12 mg-t16">
      <h4 class="mg-t0 mg-b16">服务监控</h4>

      <ul class="flex-box ul-reset">
        <li style="border-right: 1px dashed #ccc; width: 150px; height: 400px;">
          <div class="ts-12 color-999">
            系统平均响应时间
          </div>
          <h5 class="ts-20 mg-t0 mg-b32">
            500 MS
          </h5>

          <div class="ts-12 color-999">
            峰值响应时间
          </div>
          <h5 class="ts-20 mg-tb0">
            5000 MS
          </h5>
        </li>

        <li
          style="min-height: 128px;"
          class="flex-1">
          <div style="height: 400px;" id="echart"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  import echarts from 'echarts'

  export default {
    name: 'status_monitor',
    data () {
      return {
        selectId: '',
        searchList: [
          {
            id: 1,
            name: '海图全图',
            children: [
              {
                id: '1-1',
                name: '海图A服务'
              },
              {
                id: '1-2',
                name: '海图B服务'
              },
              {
                id: '1-3',
                name: '海图C服务'
              },
              {
                id: '1-4',
                name: '海图D服务'
              }
            ]
          },
          {
            id: 2,
            name: '基础底图',
            children: [
              {
                id: '2-1',
                name: '基础A服务'
              },
              {
                id: '2-2',
                name: '基础B服务'
              },
              {
                id: '2-3',
                name: '基础C服务'
              },
              {
                id: '2-4',
                name: '基础D服务'
              }
            ]
          },
          {
            id: 3,
            name: '分要素',
            children: [
              {
                id: '3-1',
                name: '分要素A服务'
              },
              {
                id: '3-2',
                name: '分要素B服务'
              },
              {
                id: '3-3',
                name: '分要素C服务'
              },
              {
                id: '3-4',
                name: '分要素D服务'
              },
              {
                id: '3-5',
                name: '分要素A服务'
              },
              {
                id: '3-6',
                name: '分要素B服务'
              },
              {
                id: '3-7',
                name: '分要素C服务'
              },
              {
                id: '3-8',
                name: '分要素D服务'
              },
              {
                id: '3-9',
                name: '分要素A服务'
              },
              {
                id: '3-10',
                name: '分要素B服务'
              },
              {
                id: '3-11',
                name: '分要素C服务'
              },
              {
                id: '3-12',
                name: '分要素D服务'
              }
            ]
          }
        ]
      }
    },
    mounted() {
      this.draw(document.getElementById('echart'))
    },
    methods: {
      changeSelect(id) {
        this.selectId = id
      },
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
        const option = {
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xData // x轴名称
          },
          yAxis: {
            type: 'value',
            splitLine: {show: false}
          },
          tooltip: {
            trigger: 'axis'
          },
          series: [{
            data: yData, // 数据值
            type: 'line',
            smooth: true,
            lineStyle: {
              color: 'rgba(72, 116, 237, .6)'
            },
            areaStyle: {
              normal: {
                color: 'rgba(72, 116, 237, .2)'
              }
            },
            itemStyle: {
              color: 'rgba(72, 116, 237, .8)'
            }
          }],
          dataZoom: [
            {
              type: 'inside',
              minSpan: 6,
              start: 94,
              zoomLock: true
            }
          ]
        }

        myChart.setOption(option)
      }
    }
  }
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
</style>
