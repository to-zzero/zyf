<template>
  <div class="layout-content_wrap">
    <div class="flex-box mg-b16">
      <basis-input
        class="flex-1"/>

      <basis-btn
        class="mg-l16"
        @click="openDialog('publish-service')">
        发布服务
      </basis-btn>
      <basis-btn
        class="mg-l16"
        @click="openDialog('service')">
        服务聚合
      </basis-btn>
    </div>
    <basis-scroll height="calc(100vh - 120px)">
      <ul class="layout-content pd-lr16 pd-tb16 ul-reset">
        <li
          class="list-item_wrap mg-r16">
          <div class="flex-box space-between item-header">
            <span> header </span>
            <a href="/">详细信息</a>
          </div>

          <div class="flex-box align-start">
            <div style="width: 100px; height: 100px; border: 1px solid #ccc;"></div>
            <ul class="ul-reset mg-l16 relative flex-1">
              <li class="flex-box mg-b8">
                <span>提供单位：</span
                >
              </li>
              <li class="flex-box mg-b8">
                <span>发布时间：</span>
              </li>
              <li class="flex-box mg-b8">
                <span>摘要信息：</span>
              </li>
              <li class="flex-box">
                <span>关键字：</span>
                <div class="tag-item">
                  11
                </div>
                <div class="tag-item">
                  22
                </div>
                <div class="tag-item">
                  33
                </div>
              </li>
              <li class="control-area flex-box">
                <span class="control-item" @click="itemAction('on')">开启</span>
                <span class="control-item" @click="openDialog('view')">查看</span>
                <span class="control-item" @click="itemAction('delete')">删除</span>
                <span class="control-item" @click="openDialog('edit')">编辑</span>
                <span class="control-item" @click="openDialog('setting')">配置</span>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </basis-scroll>

    <modal name="publish-service">
      publish-service
    </modal>

    <modal name="service">
      service
    </modal>

    <modal name="view">
      view
    </modal>

    <modal name="edit">
      edit
    </modal>

    <modal name="setting">
      setting
    </modal>
  </div>
</template>

<script>
  import { itemOperating } from '@/api'
  export default {
    name: 'LayoutContent',
    data () {
      return {
      }
    },
    mounted () {
    },
    methods: {
      openDialog (name) {
        this.$modal.show(name)
      },
      itemAction (action) {
        itemOperating(action).then(res => {
          console.log(res)
        })
      }
    }
  }
</script>

<style scoped lang="scss">
  .relative {
    position: relative;
  }

  .control-area {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .layout-content {
    min-height: calc(100vh - 120px);
    box-sizing: border-box;
  }

  .list-item_wrap {
    padding: 16px;
    border-radius: 4px;
    border: 1px solid #ccc; 
    margin-bottom: 16px;

    &:last-of-type {
      margin-bottom: 24px;
    }
  }

  .item-header{
    border-bottom: 2px solid #ccc;
    padding-bottom: 8px;
    margin-bottom: 8px;
  }

  .tag-item {
    border-radius: 4px;
    padding: 4px;
    background: #337ab7;
    color: #fff;
    font-size: 12px;
    &:not(:last-of-type) {
      margin-right: 16px;
    }
  }

  .control-item {
    margin-left: 16px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
