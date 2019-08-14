<template>
  <div>
    <dir class="title">服务授权</dir>
    <el-dialog :visible.sync="set_auth_dlg" title="服务授权" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="启用IP限制">
          <el-checkbox v-model="current.enableIp"></el-checkbox>
        </el-form-item>
        <el-form-item :inline="true" label="IP地址">
          <el-row>
            <el-col :span="3">
              <el-input-number
                size="mini"
                :controls="false"
                :min="0"
                style="width:60px"
                :max="255"
                @change="ip_addr_change"
                v-model="ip_parts.part_1"
              ></el-input-number>-
            </el-col>
            <el-col :span="3">
              <el-input-number
                size="mini"
                :controls="false"
                @change="ip_addr_change"
                style="width:60px"
                v-model="ip_parts.part_2"
              ></el-input-number>-
            </el-col>
            <el-col :span="3">
              <el-input-number
                size="mini"
                :controls="false"
                @change="ip_addr_change"
                style="width:60px"
                v-model="ip_parts.part_3"
              ></el-input-number>-
            </el-col>
            <el-col :span="8">
              <el-tooltip content="任意地址:*, 地址区间:a-b, 多个IP:a,b,c">
                <el-input size="mini" v-model="ip_parts.part_4" @change="ip_addr_change"></el-input>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="启用范围限制">
          <el-checkbox v-model="current.enableExtent"></el-checkbox>
        </el-form-item>
        <el-form-item label="范围">
          <el-row>
            <el-col :span="2" :offset="7">ymax</el-col>
            <el-col :span="4">
              <el-input-number
                :controls="false"
                :min="-90"
                :max="90"
                v-model="extent_parts.ymax"
                size="mini"
              ></el-input-number>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="2">xmin</el-col>
            <el-col :span="4">
              <el-input
                size="mini"
                :controls="false"
                :min="-180"
                :max="180"
                v-model="extent_parts.xmin"
              ></el-input>
            </el-col>
            <el-col :span="2" :offset="5">xmax</el-col>
            <el-col :span="4">
              <el-input
                size="mini"
                :controls="false"
                :min="-180"
                :max="180"
                v-model="extent_parts.xmax"
              ></el-input>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2" :offset="7">ymin</el-col>
            <el-col :span="4">
              <el-input
                size="mini"
                :controls="false"
                :min="-90"
                :max="90"
                v-model="extent_parts.ymin"
              ></el-input>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button @click="set_auth_dlg=false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSetAuth">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="authList" border>
      <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
      <el-table-column prop="userName" label="用户" header-align="center"></el-table-column>
      <el-table-column label="状态" width="60" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.islocked == 1" size="mini" type="danger">锁定</el-tag>
          <el-tag v-else size="mini" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="token" label="令牌" width="280" header-align="center"></el-table-column>
      <el-table-column prop="authTime" label="更新时间" width="160" header-align="center"></el-table-column>
      <el-table-column prop="ip" label="IP限制" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.enableIp && scope.row.ip">{{scope.row.ip}}</span>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="范围限制" width="180" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enableExtent && scope.row.extent" size="mini" type="danger">受限</el-tag>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleOpenDlg(scope.row)">服务授权</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      set_auth_dlg: false,
      authList: [],
      current: {},
      formData: {
        ip_list: [],
        coord_list: []
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    loadData() {
      api.serviceAuth.list().then(data => {
        this.authList = data.list;
      });
    },
    handleOpenDlg(auth) {
      this.current = JSON.parse(JSON.stringify(auth));
      this.$set(this.current, "enableIp", !!this.current.enableIp);
      this.$set(this.current, "enableExtent", !!this.current.enableExtent);
      this.set_auth_dlg = true;
    },
    ip_addr_change(v) {
      debugger;
    },
    handleSetAuth() {
      var { xmin, xmax, ymin, ymax } = this.extent_parts;
      this.current.extent = `${xmin},${xmax},${ymin},${ymax}`;
      let { part_1, part_2, part_3, part_4 } = this.ip_parts;
      this.current.ip = `${part_1}.${part_2}.${part_3}.${part_4}`;
      delete this.current.authTime;
      delete this.current.islocked;

      api.serviceAuth
        .auth(this.current)
        .then(ok => {
          if (ok == true) {
            this.set_auth_dlg = false;
            this.$message({ message: "修改成功", type: "success" });
            this.loadData();
          }
        })
        .catch(err => {
          this.$message({ message: err, type: "error" });
        });
    }
  },
  computed: {
    ip_parts() {
      var ips = (this.current.ip || "0.0.0.0-0").split(".");
      var parts = {
        part_1: ips[0],
        part_2: ips[1],
        part_3: ips[2],
        part_4: ips[3]
      };
      return parts;
    },
    extent_parts() {
      var extent = (this.current.extent || "").split(",");
      var obj = {
        xmin: extent[0] || -180,
        xmax: extent[1] || 180,
        ymin: extent[2] || -90,
        ymax: extent[3] || 90
      };
      return obj;
    }
  }
};
</script>

<style>
.title {
  font-size: 20px;
  font-weight: 600;
  padding-left: 12px;
  border-left: 4px solid #4874ed;
  color: #292929;
  margin-bottom: 24px;
}
</style>
