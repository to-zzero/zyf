<template>
  <div>
    <dir class="title">服务授权</dir>
    <el-dialog :visible.sync="set_auth_dlg" title="服务授权" :close-on-click-modal="false">
      <el-form label-width="120px">
        <el-form-item label="启用IP限制">
          <el-checkbox v-model="current.enableIp"></el-checkbox>
        </el-form-item>
        <el-form-item>
            <el-input size="mini"></el-input>
            <el-button size="mini">添加</el-button>
            
        </el-form-item>
        <el-form-item label="启用范围限制">
          <el-checkbox v-model="current.enableExtent"></el-checkbox>
        </el-form-item>
        <el-form-item>
         Xmin <el-input size="mini"></el-input>
         Xmax <el-input size="mini"></el-input>
         Ymin <el-input size="mini"></el-input>
         Ymax <el-input size="mini"></el-input>
        </el-form-item>
      </el-form>
      
    </el-dialog>
    <el-table :data="authList" border>
      <el-table-column type="index" label="序号" width="60" header-align="center"></el-table-column>
      <el-table-column prop="name" label="用户" header-align="center"></el-table-column>
      <el-table-column prop="name" label="状态" width="60" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.islocked == 1" size="mini" type="danger">锁定</el-tag>
          <el-tag v-else size="mini" type="success">正常</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="token" label="令牌" width="280" header-align="center"></el-table-column>
      <el-table-column prop="authTime" label="更新时间" width="160" header-align="center"></el-table-column>
      <el-table-column prop="ip" label="IP限制" width="150">
        <template slot-scope="scope">
          <span v-if="scope.row.ip">{{scope.row.ip}}</span>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="范围限制" width="180" align="center" header-align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.extent" size="mini" type="danger">受限</el-tag>
          <el-tag v-else size="mini" type="success">不限</el-tag>
        </template>
      </el-table-column>

      <el-table-column width="100" fixed="right" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="editAuth(scope.row)">服务授权</el-button>
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
    api.serviceAuth.list().then(data => {
      this.authList = data.list;
    });
  },
  methods: {
    editAuth(auth) {
      this.current = JSON.parse(JSON.stringify(auth));
      this.set_auth_dlg = true;
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
