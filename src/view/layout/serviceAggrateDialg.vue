<template>
  <el-dialog
    width="600px"
    :visible.sync="dlg_service_aggrate"
    title="服务聚合"
    :close-on-click-modal="false"
    @close="handleClose"
  >
    <ul class="ul-reset">
      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">服务类型</div>
        <el-select v-model="layerInfo.type" style="width: 460px;" size="mini">
          <el-option label="系统服务" :value="0"></el-option>
          <el-option label="外部服务" :value="1"></el-option>
        </el-select>
      </li>

      <li class="flex-box mg-b16">
        <div
          class="flex-1 mg-r16"
          style="font-size: 14px; color: #7f8fa4; text-align: right;"
        >{{ layerInfo.type ? '服务链接' : '选择服务' }}</div>
        <el-input
          v-if="layerInfo.type === 1"
          style="width: 460px;"
          v-model="layerInfo.url"
          size="mini"
          @change="readMapInfo"
        ></el-input>
        <el-select
          v-else
          v-model="layerInfo.id"
          style="width: 460px;"
          placeholder="请选择"
          size="mini"
        >
          <el-option
            v-for="subject in system_layers"
            :key="subject.id"
            :label="subject.name"
            :value="subject.id"
          ></el-option>
        </el-select>
      </li>

      <li class="flex-box space-end mg-b16">
        <el-button @click="addToServiceList" title="添加到服务列表" size="mini">添加</el-button>
      </li>

      <li class="flex-box align-start mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">
          服务列表
          <span style="color:red">*</span>
        </div>
        <div style="width: 80%">
          <el-table size="mini" max-height="300" border style="width: 100%;" :data="layer_list">
            <el-table-column label="服务" align="left" header-align="center" prop="title"></el-table-column>
            <el-table-column width="100" fixed="right" label="操作" align="right" prop="url">
              <span slot-scope="{row}">
                <el-button
                  v-show="row.index"
                  @click="moveItem(row, true)"
                  style="width: 20px; text-align: center; padding-left: 0; padding-right: 0;"
                  size="mini"
                >↑</el-button>
                <el-button
                  v-show="row.index + 1 !== layer_list.length"
                  @click="moveItem(row, false)"
                  style="width: 20px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                  size="mini"
                >↓</el-button>
                <el-button
                  @click="removeItem(row)"
                  type="danger"
                  style="width: 20px; text-align: center; padding-left: 0; padding-right: 0; margin-left: 4px;"
                  size="mini"
                >X</el-button>
              </span>
            </el-table-column>
          </el-table>
        </div>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">
          服务名称
          <span style="color:red">*</span>
        </div>
        <el-input style="width: 460px;" size="mini" v-model="service_info.name"></el-input>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">所属分组</div>
        <el-select size="mini" multiple style="width: 460px;" v-model="subjects" placeholder="请选择">
          <template v-for="(catalog, index) in catalog_list">
            <!-- 循环template -->
            <div :key="index" style="padding: 8px 12px;">{{catalog.name}}</div>
            <el-option
              v-for="subject in catalog.subject"
              :key="subject.id"
              :label="subject.name"
              :value="subject.id"
            ></el-option>
          </template>
        </el-select>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">瓦片级别</div>
        <el-slider
          style="width: 460px;"
          range
          :max="20"
          :min="1"
          v-model="level"
          :show-stops="true"
        ></el-slider>
      </li>

      <li class="flex-box mg-b16">
        <div class="flex-1 mg-r16" style="font-size: 14px; color: #7f8fa4; text-align: right;">关键字</div>
        <el-input
          style="width: 460px;"
          size="mini"
          placeholder="(可选)多个之间分号分隔;"
          v-model="service_info.keyword"
        ></el-input>
      </li>

      <li class="flex-box" style="justify-content: flex-end;">
        <el-button @click="handleCancel" size="mini">取消</el-button>
        <el-button type="primary" :loading="bntOKLoading" @click="handleOK">发布</el-button>
      </li>
    </ul>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations } from "vuex";

import api from "../../api";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import http from "axios";
const SERVIE_TYPE_SYSTEM = 0;
const SERVIE_TYPE_WMTS = 1;
export default {
  props: ["isOpen", "cur_catalog"],
  data() {
    return {
      dlg_service_aggrate: this.isOpen,
      level: [0, 20],
      layerInfo: {
        type: SERVIE_TYPE_SYSTEM,
        id: "", //系统服务ID
        url: "" //wmts地址
      },
      layer_list: [],
      catalog_list: [],
      system_layers: [],
      tileRange: {},
      bntOKLoading: false,
      subjects: this.cur_catalog || [],
      service_info: {
        keyword: "",
        name: "",
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
    api.service.servie_list({ size: 1000, aggrate: false }).then(services => {
      this.$set(this, "system_layers", services.list);
    });

    api.catalog.catalog_list().then(data => {
      this.catalog_list = data;
    });
  },
  methods: {
    ...mapActions(["queryService"]),
    ...mapMutations(["setQueryFilter"]),
    handleCancel() {
      this.dlg_service_aggrate = false;
    },
    async handleOK() {
      if (this.layer_list.length === 0) {
        this.$message({ message: "服务列表为空，不能进行聚合", type: "error" });
        return;
      }

      if (this.layer_list.length < 2) {
        this.$message({ message: "至少需要添加2个服务", type: "error" });
        return;
      }

      if (!this.service_info.name) {
        this.$message({ message: "请输入服务名称", type: "error" });
        return;
      }
      try {
        this.bntOKLoading = true;
        var nameOk = await api.service.checkname(this.service_info.name);
        if (nameOk == false) {
          this.$message({
            message: "服务名称已被使用，请输入其他名称",
            type: "error"
          });
          return;
        }
        var createOk = await api.service.create_aggrate_service(
          this.service_info,
          this.layer_list,
          this.subjects,
          this.level[0],
          this.level[1]
        );

        if (createOk == true) {
          this.$message({
            message: "服务创建成功",
            type: "success"
          });
          this.queryService();
          this.dlg_service_aggrate = false;
        } else {
          this.$message({
            message: "服务创建失败",
            type: "error"
          });
          return;
        }
      } catch (error) {
        console.error(error);
      } finally {
        this.bntOKLoading = false;
      }
    },
    handleClose() {
      this.$emit("change", false);
    },
    addToServiceList() {
      var obj = {};
      if (this.layerInfo.type === SERVIE_TYPE_SYSTEM) {
        //系统服务
        var lyr = this.system_layers.find(r => r.id == this.layerInfo.id);
        if (lyr) {
          if (this.layer_list.find(r => r.id === lyr.id)) {
            this.$message({ message: "服务已在列表中", type: "error" });
            return;
          }
          obj.type = SERVIE_TYPE_SYSTEM;
          obj.title = lyr.name;

          obj.id = lyr.id;
        } else {
          this.$message({ message: "请先选择服务", type: "error" });
          return;
        }
      } else {
        //外部wmts服务
        obj.type = SERVIE_TYPE_WMTS;
        obj.title = this.layerInfo.url;

        obj.url = obj.title;
      }
      const len = this.layer_list.length;
      obj.index = len;
      this.$set(this.layer_list, len, obj);
    },
    removeItem(row) {
      const { index } = row;
      this.layer_list.splice(index, 1);
      this.layer_list = this.layer_list.map((val, index) => {
        val.index = index;
        return val;
      });
    },
    moveItem(row, type) {
      const { index } = row;
      this.layer_list.splice(index, 1);
      if (type) {
        this.layer_list.splice(index - 1 > -1 ? index - 1 : 0, 0, row);
      } else {
        this.layer_list.splice(index + 1, 0, row);
      }

      this.layer_list = this.layer_list.map((val, index) => {
        val.index = index;
        return val;
      });
    },
    readMapInfo() {
      var mapInfo = {
        tileInfo: {
          origin: {
            x: -400,
            y: 400
          },
          spatialReference: {
            wkt: "4326"
          },
          lods: [
            {
              level: 0,
              resolution: 0.15228550437313793,
              scale: 64000000
            }
          ]
        },
        fullExtent: {
          xmin: 73.49896224071769,
          ymin: 3.83384347545325,
          xmax: 135.087387119284,
          ymax: 53.5584983458525,
          spatialReference: {
            wkt: "4326"
          }
        }
      };
      var wmts_url = this.layerInfo.url;
      http
        .get(`${wmts_url}?SREVICE=wmts&REQUEST=GetCapabilities`)
        .then(resp => {
          var wmts = new WMTSCapabilities().read(resp.data);
          mapInfo.tileInfo.origin.x =
            wmts.Contents.TileMatrixSet[0].TileMatrix[0].TopLeftCorner[0];
          mapInfo.tileInfo.origin.y =
            wmts.Contents.TileMatrixSet[0].TileMatrix[0].TopLeftCorner[1];
          // mapInfo.tileInfo.lods=
        });
    }
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
