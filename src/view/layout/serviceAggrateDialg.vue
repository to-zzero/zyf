<template>
  <el-dialog width="600px" :visible.sync="dlg_service_aggrate" title="服务聚合" @close="handleClose">
    <ul class="ul-reset">
      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务类型</div>
        <el-select v-model="formData.type" style="width: 460px;" size="mini">
          <el-option label="系统服务" :value="0"></el-option>
          <el-option label="外部服务" :value="1"></el-option>
        </el-select>
      </li>

      <li class="flex-box mg-b16">
        <div
          class="flex-1 mg-r16"
          style="font-size: 14px; color: #7f8fa4; text-align: right;"
        >{{ formData.type ? '服务链接' : '选择服务' }}</div>
        <el-input v-if="formData.type === 1" style="width: 460px;" v-model="formData.url" size="mini"></el-input>
        <el-select v-else v-model="formData.group" style="width: 460px;" placeholder="请选择" size="mini">
          <template v-for="(catalog) in catalog_list" >
            <el-option
              v-for="subject in catalog.subject"
              :key="subject.id"
              :label="subject.name"
              :value="subject.id"
            ></el-option>
          </template>
        </el-select>
      </li>

      <li class="flex-box mg-b16" v-if="formData.type === 1">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务参数</div>
        <div style="width: 460px;" class="flex-box space-between">
          <el-input size="mini" v-model="formData.layerName" class="mg-r8" placeholder="图层名"></el-input>
          <el-input size="mini" v-model="formData.style" class="mg-r8" placeholder="样式"></el-input>
          <el-input size="mini" v-model="formData.tile" placeholder="瓦片方案"></el-input>
        </div>
      </li>

      <li class="flex-box space-end mg-b16">
        <el-button @click="addToServiceList" title="添加到服务列表" size="mini">添加</el-button>
      </li>

      <li class="flex-box align-start mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务列表</div>
        <div style="width: 460px;">
          <el-table
            size="mini"
            max-height="300"
            border
            style="width: 100%;"
            :data="formData.serviceList"
          >
            <el-table-column width="100" fixed label="服务名称"  align="center" prop="layerName"></el-table-column>
            <el-table-column label="服务URL" align="center" prop="url"></el-table-column>
            <el-table-column width="150" fixed="right" label="操作" align="right" prop="url">
              <div slot-scope="{row}">
                <el-button
                  v-show="row.index"
                  @click="moveItem(row, true)"
                  style="width: 36px; text-align: center; padding-left: 0; padding-right: 0;"
                  size="mini"
                >上移</el-button>
                <el-button
                  v-show="row.index + 1 !== formData.serviceList.length"
                  @click="moveItem(row, false)"
                  style="width: 36px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                  size="mini"
                >下移</el-button>
                <el-button
                  @click="removeItem(row)"
                  type="danger"
                  style="width: 36px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                  size="mini"
                >删除</el-button>
              </div>
            </el-table-column>
          </el-table>
        </div>
      </li>

      <li class="flex-box mg-b16">
        <div
          class="flex-1 mg-r16"
          style="font-size: 14px; color: #7f8fa4; text-align: right;"
        >瓦片级别范围</div>
        <el-slider
          style="width: 460px;"
          range
          :max="20"
          :min="1"
          :marks="tileRange"
          v-model="formData.level"
        ></el-slider>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务名称</div>
        <el-input style="width: 460px;" size="mini" v-model="service_info.name"></el-input>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">关键字</div>
        <el-input style="width: 460px;" size="mini" v-model="service_info.keyword"></el-input>
      </li>

      <!-- 
      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务摘要</div>
        <el-input style="width: 460px;" v-model="service_info.metadata.provider"></el-input>
      </li>-->
      <!-- 
      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">摘要</div>
        <el-input style="width: 460px;" v-model="service_info.metadata.abstract"></el-input>
      </li>-->

      <li class="flex-box" style="justify-content: flex-end;">
        <el-button @click="handleCancel">取消</el-button>
        <el-button type="primary" @click="handleOK">确定</el-button>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
const SERVIE_TYPE_SYSTEM = 0;
const SERVIE_TYPE_WMTS = 1;
export default {
  props: ["isOpen", "catalog_list"],
  data() {
    return {
      dlg_service_aggrate: this.isOpen,
      formData: {
        level: [10, 15],
        type: SERVIE_TYPE_SYSTEM,
        url: "",
        group: [],
        layerName: "",
        style: "",
        tile: "",
        serviceList: [],
        service_catalog: []
      },
      tileRange: {},
      service_info: {
        keyword: "",
        metadata: {
          provider: "",
          abstract: "",
          customize: []
        }
      }
    };
  },
  mounted() {
    for (let index = 1; index <= 20; index++) {
      this.tileRange[index] = index.toString();
    }
  },
  methods: {
    handleCancel() {
      this.dlg_service_aggrate = false;
    },
    handleOK() {
      this.dlg_service_aggrate = false;
    },
    handleClose() {
      this.$emit("change", false);
    },
    addToServiceList() {
      const { url, layerName, style, tile } = this.formData;

      const len = this.formData.serviceList.length;
      this.$set(this.formData.serviceList, len, {
        url,
        layerName,
        style,
        tile,
        index: len
      });
    },
    removeItem(row) {
      const { index } = row;
      this.formData.serviceList.splice(index, 1);
      this.formData.serviceList = this.formData.serviceList.map(
        (val, index) => {
          val.index = index;
          return val;
        }
      );
    },
    moveItem(row, type) {
      const { index } = row;
      this.formData.serviceList.splice(index, 1);
      if (type) {
        this.formData.serviceList.splice(
          index - 1 > -1 ? index - 1 : 0,
          0,
          row
        );
      } else {
        this.formData.serviceList.splice(index + 1, 0, row);
      }

      this.formData.serviceList = this.formData.serviceList.map(
        (val, index) => {
          val.index = index;
          return val;
        }
      );
    },
  },
  watch: {
    isOpen(oldVal, newVal) {
      this.dlg_service_aggrate = newVal;
    }
  }
};
</script>

<style>
</style>
