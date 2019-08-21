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
      <el-form-item label="用户">
        <el-select v-model="cur_auth_oid" clearable>
          <el-option
            v-for="auth in auth_list"
            :key="auth.id"
            :label="auth.userName+(auth.islocked==1?'(锁定)':'')"
            :value="auth.oid"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="底图">
        <iframe
          v-if="mapUrl"
          style="border: 1px solid #ebeef5;"
          :src="mapUrl"
          width="500px"
          height="500px"
        ></iframe>
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
      cur_service_id: ""
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
    mapUrl() {
      if (!this.cur_auth_oid) return null;
      if (!this.cur_service_id) return null;
      var auth = this.auth_list.find(r => r.oid === this.cur_auth_oid);
      if (!auth) return null;

      var url = `./map.html?service=${this.cur_service_id}&token=${auth.token}`;
      return url;
    }
  },
  methods: {}
};
</script>

<style>
</style>