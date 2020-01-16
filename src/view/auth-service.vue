<template>
  <div>
    <dir class="title">服务授权</dir>
    <el-dialog :visible.sync="set_auth_dlg" title="服务授权" :close-on-click-modal="false">
      <el-tabs>
        <el-tab-pane label="基本设置">
          <el-form label-width="120px">
            <el-form-item label="启用IP限制" style="height:20px">
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
                <el-col :span="5">
                  <el-tooltip content="任意地址:*, 地址区间:a-b, 多个IP:a,b,c">
                    <el-input size="mini" v-model="ip_parts.part_4" @change="ip_addr_change"></el-input>
                  </el-tooltip>
                </el-col>
                <el-col :span="2">
                  <el-button size="mini" @click="ip_addr_new">新建</el-button>
                </el-col>
              </el-row>
              <el-row v-if="ip_parts_list.length>0">
                <ul class="ul-ip-list">
                  <li
                    v-for="(part,index) in ip_parts_list"
                    @click="ip_parts=(part)"
                    v-bind:key="index"
                  >
                    <span>
                      {{part.part_1}}.{{part.part_2}}.{{part.part_3}}.{{part.part_4}}
                      <el-button
                        size="mini"
                        type="danger"
                        round
                        icon="el-icon-close"
                        style="float: right;margin: 6px;"
                        @click="removePart(part)"
                      ></el-button>
                    </span>
                  </li>
                </ul>
              </el-row>
            </el-form-item>
            <el-form-item label="启用范围限制" style="height:20px">
              <el-checkbox v-model="current.enableExtent"></el-checkbox>
            </el-form-item>
            <el-form-item label="范围">
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
                <el-col :span="2" :offset="2">xmax</el-col>
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
                <el-col :span="2" :offset="2">ymin</el-col>
                <el-col :span="4">
                  <el-input
                    size="mini"
                    :controls="false"
                    :min="-90"
                    :max="90"
                    v-model="extent_parts.ymin"
                  ></el-input>
                </el-col>

                <el-col :span="2" :offset="2">ymax</el-col>
                <el-col :span="4">
                  <el-input-number
                    style="width:100%"
                    :controls="false"
                    :min="-90"
                    :max="90"
                    v-model="extent_parts.ymax"
                    size="mini"
                  ></el-input-number>
                </el-col>
              </el-row>
            </el-form-item>
            <el-form-item label="过期时间">
              <el-date-picker
                v-model="current.expiresAt"
                type="date"
                clearable
                :picker-options="expiresAtOpts"
                placeholder="永不过期"
              ></el-date-picker>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="授权列表" style="text-align:center;">
          <el-transfer
            style="text-align: left; display: inline-block"
            v-model="authed_servies"
            :data="system_layers"
            :titles="['所有服务','授权服务']"
            :props="{key:'id',label:'name'}"
            :button-texts="['移除','授权']"
          ></el-transfer>
        </el-tab-pane>
      </el-tabs>

      <div slot="footer">
        <el-button @click="set_auth_dlg=false" size="mini">取 消</el-button>
        <el-button type="primary" @click="handleSetAuth">确 定</el-button>
      </div>
    </el-dialog>
    <el-table :data="authList.list" border>
      <el-table-column type="index" label="序号" width="60" align="center"></el-table-column>
      <el-table-column prop="userName" label="授权用户" width="150" header-align="center">
        <template slot-scope="scope">{{scope.row.userName_real||scope.row.userName}}</template>
      </el-table-column>
      <el-table-column prop="authorizer" label="授权人" width="150" header-align="center">
        <template slot-scope="scope">{{scope.row.authorizer_real||scope.row.authorizer}}</template>
      </el-table-column>
      <el-table-column label="用户状态" width="60" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.islocked == 1" size="mini" type="danger">锁定</el-tag>
          <el-tag v-else size="mini" type="success">正常</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="state" label="授权状态" width="150" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state==1" size="mini" type="success">通过</el-tag>
          <el-tag v-else-if="scope.row.state==2" size="mini" type="danger">未通过</el-tag>
          <!-- <el-tag v-else size="mini" type="info">申请中</el-tag> -->
          <span v-else>
            <el-button type="success" size="mini" @click="handleApprove(scope.row.id,true)">同意</el-button>
            <el-button type="danger" size="mini" @click="handleApprove(scope.row.id,false)">拒绝</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="token" label="令牌" width="320" header-align="center"></el-table-column>
      <el-table-column prop="updateAt" label="更新时间" width="160" header-align="center"></el-table-column>
      <el-table-column prop="expiresAt" label="到期时间" width="280" header-align="center">
        <template slot-scope="scope">
          <el-tag type="success" v-if="scope.row.expiresAt">{{date2str(scope.row.expiresAt,false)}}</el-tag>
          <el-tag v-else size="mini" type="success">长期有效</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="ip" label="IP限制" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.enableIp && scope.row.ip" v-html="ip2rows(scope.row.ip)"></span>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="范围限制" width="180" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.enableExtent && scope.row.extent" size="mini" type="danger">受限</el-tag>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="comment" label="备注" width="280" header-align="center"></el-table-column>
      <el-table-column width="100" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            v-if="scope.row.state == 1"
            style="padding:6px"
            @click="handleOpenDlg(scope.row)"
          >服务授权</el-button>
        </template>
      </el-table-column>
    </el-table>
    <li class="flex-box" style="justify-content: flex-end;">
      <el-pagination
        background
        layout="prev, pager, next,sizes"
        :total="authList.total"
        :page-size="authList.size"
        :page-sizes="[20,50,100]"
        @current-change="currentChange"
        @size-change="sizeChange"
      ></el-pagination>
    </li>
  </div>
</template>

<script>
import api from "../api";
export default {
  data() {
    return {
      authed_servies: [],
      system_layers: [],
      set_auth_dlg: false,
      authList: { list: [] },
      current: {},
      ip_parts_list: [],
      ip_parts: {
        part_1: 0,
        part_2: 0,
        part_3: 0,
        part_4: "0-0"
      },
      expiresAtOpts: {
        disabledDate(time) {
          return false;
          return time.getTime() < Date.now() + 8.64e7 * 0;
        }
      }
    };
  },
  mounted() {
    this.loadData();
    api.service.servie_list({ size: 1000, aggrate: true }).then(services => {
      this.system_layers = services.list.filter(r=>r.status==1);
    });
  },
  methods: {
    loadData(page = 1, size = 20) {
      api.serviceAuth.list(page, size).then(data => {
        this.authList = data;
      });
    },
    handleOpenDlg(auth) {
      this.current = JSON.parse(JSON.stringify(auth));
      this.authed_servies = [];
      if (this.current.services) {
        this.authed_servies = this.current.services
          .split(",")
          .filter(r => this.system_layers.find(q => q.id === r));
      }
      this.$set(this.current, "enableIp", !!this.current.enableIp);
      this.$set(this.current, "enableExtent", !!this.current.enableExtent);
      this.set_auth_dlg = true;
    },
    currentChange(page) {
      this.loadData(page);
    },
    sizeChange(size) {
      this.loadData(1, size);
    },
    ip_addr_change() {
      // console.log(v);
    },
    removePart(part) {
      var idx = this.ip_parts_list.indexOf(part);
      this.ip_parts_list.splice(idx, 1);
    },
    ip_addr_new() {
      var newItem = {
        part_1: 0,
        part_2: 0,
        part_3: 0,
        part_4: "0"
      };
      this.ip_parts_list.push(newItem);
      this.ip_parts = newItem;
    },
    handleApprove(id, approved) {
      api.serviceAuth.approve(id, approved).then(() => {
        this.loadData();
      });
    },
    ip2rows(ip) {
      return ip.split("|").join("</br>");
    },
    date2str(d, long = true) {
      if (!(d instanceof Date)) {
        d = new Date(d);
      }
      var str = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
      if (long) str += ` ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`;
      return str;
    },
    handleSetAuth() {
      var { xmin, xmax, ymin, ymax } = this.extent_parts;
      this.current.extent = `${xmin},${xmax},${ymin},${ymax}`;
      this.current.ip = this.ip_parts_list
        .map(r => {
          let { part_1, part_2, part_3, part_4 } = r;
          var ip = `${part_1}.${part_2}.${part_3}.${part_4}`;
          return ip;
        })
        .join("|");
      if (this.current.expiresAt) {
        this.current.expiresAt = this.date2str(this.current.expiresAt);
      }
      delete this.current.authTime;
      delete this.current.islocked;
      this.current.services = this.authed_servies.join(",");

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
  },
  watch: {
    "current.ip"(val) {
      if (val) {
        this.ip_parts_list = val.split("|").map(r => {
          var ips = r.split(".");
          var parts = {
            part_1: ips[0],
            part_2: ips[1],
            part_3: ips[2],
            part_4: ips[3]
          };
          return parts;
        });
        if (this.ip_parts_list.length > 0) {
          this.ip_parts = this.ip_parts_list[0];
        }
      }
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

.el-form-item {
  margin-bottom: 6px;
}
.ul-ip-list li {
  list-style-type: none;
  border: 1px solid #409eff;
  background-color: #ecf5ff;
  width: 220px;
  border-radius: 10px;
  padding-left: 12px;
  margin: 3px;
  cursor: pointer;
}
</style>
