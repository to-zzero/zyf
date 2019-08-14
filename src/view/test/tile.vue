<template>
  <el-container>
    <el-form label-width="150px">
      <el-form-item label="服务">
        <el-select v-model="cur_service_id">
          <el-option
            v-for="service in service_list"
            :key="service.id"
            :label="service.name"
            :value="service.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="级别">
        <el-input-number :min="0" :max="20" v-model="z"></el-input-number>
      </el-form-item>

      <el-form-item label="X">
        <el-input-number v-model="x"></el-input-number>
      </el-form-item>

      <el-form-item label="Y">
        <el-input-number v-model="y"></el-input-number>
      </el-form-item>

      <el-form-item label="用户">
        <el-select v-model="cur_auth_oid" clearable>
          <el-option
            v-for="auth in auth_list"
            :key="auth.id"
            :label="auth.name+(auth.islocked==1?'(锁定)':'')"
            :value="auth.oid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="内部访问地址">
        <el-link :href="url_admin" target="_blank" :underline="false">{{url_admin}}</el-link>
      </el-form-item>

      <el-form-item label="外部访问地址(KVP)">
        <el-link :href="url_kvp" target="_blank" :underline="false">{{url_kvp}}</el-link>
      </el-form-item>

      <el-form-item label="外部访问地址(REST)">
        <el-link :href="url_rest" target="_blank" :underline="false">{{url_rest}}</el-link>
      </el-form-item>

      <el-form-item>
        <el-image style="width:256px;height:256px;border:1px solid #dcdfe6;" :src="url_admin"></el-image>
        <el-image style="width:256px;height:256px;border:1px solid #dcdfe6;margin-left:12px;" :src="url_kvp"></el-image>
        <el-image style="width:256px;height:256px;border:1px solid #dcdfe6;margin-left:12px;" :src="url_rest"></el-image>
      </el-form-item>
    </el-form>
  </el-container>
</template>

<script>
import api from "../../api";

export default {
  data() {
    return {
      auth_list: [],
      cur_auth_oid: "",

      service_list: [],
      cur_service_id: "",
      z: 3,
      x: 74,
      y: 105
    };
  },
  mounted() {
    api.service.servie_list({ size: 1000 }).then(data => {
      this.service_list = data.list.filter(r => r.status == 1);
      if (this.service_list.length > 0) {
        this.cur_service_id = this.service_list[0].id;
      }
    });

    api.serviceAuth.list(1, 1000).then(data => {
      this.auth_list = data.list;
      for (let index = 0; index < this.auth_list.length; index++) {
        this.auth_list[index].oid = index + 1;
      }
      if (this.auth_list.length > 0) {
        this.cur_auth_oid = this.auth_list[0].oid;
      }
    });
  },
  computed: {
    url_admin() {
      if (this.cur_service_id) {
        //http://192.168.0.102:8081/api/service/dd8b3aea052c44a1975ffd52652f7a1b/MapServer/tile/3/74/105
        var url = `api/service/${this.cur_service_id}/MapServer/tile/${this.z}/${this.x}/${this.y}?token=`;
        var auth = this.auth_list.find(r => r.oid === this.cur_auth_oid);
        debugger;
        if (auth.token) {
          url += `${auth.token}`;
        }
        return url;
      } else {
        return "#";
      }
    },
    url_rest() {
      if (this.cur_service_id) {
        var url = `rest/services/${this.cur_service_id}/tile/${this.z}/${this.x}/${this.y}?token=`;
        var auth = this.auth_list.find(r => r.oid === this.cur_auth_oid);
        if (auth.token) {
          url += `${auth.token}`;
        }
        return url;
      } else {
        return "#";
      }
    },
    url_kvp() {
      if (this.cur_service_id) {
        var service = this.service_list.find(r => r.id === this.cur_service_id);
        var url = `rest/services/${this.cur_service_id}/wmts?REQUEST=GetTile&LAYER=${service.id}&TILEMATRIX=${this.z}&TILEROW=${this.x}&TILECOL=${this.y}&token=`;
        var auth = this.auth_list.find(r => r.oid === this.cur_auth_oid);
        if (auth.token) {
          url += `${auth.token}`;
        }
        return url;
      } else {
        return "#";
      }
    }
  },
  methods: {}
};
</script>

<style>
</style>