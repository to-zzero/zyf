<template>
  <el-container>
    <el-aside width="30%">
      <el-tree
        :data="catalog_data"
        ref="tree_catalog"
        node-key="id"
        :expand-on-click-node="false"
        @node-click="onNodeChange"
      >
        <span slot-scope="{node,data}">
          <span v-if="data.id">
            <span v-if="node.level>1">{{data.name}}({{data.count}})</span>
            <span v-else>{{data.name}}</span>
          </span>
          <span v-else>
            <input placeholder="输入名称" size="mini" v-model="data.name">
            <el-button
              slot="append"
              icon="el-icon-check"
              @click="()=>save_subject(data)"
              size="mini"
              style="height:23px"
            ></el-button>
          </span>
          <span v-if="node.level==1">
            <el-button type="text" size="mini" @click="$emit('add')">添加子目录</el-button>
            <!-- <el-button type="text" size="mini" @click="(evt) => append_subject(node,data,evt)">添加子目录</el-button> -->
          </span>
        </span>
      </el-tree>
    </el-aside>
    <el-aside width="60%">
      <el-transfer
        v-model="selected_services"
        :titles="['未选服务','已选服务']"
        :data="all_services"
        @change="service_change"
      ></el-transfer>
    </el-aside>
  </el-container>
</template>

<script>
// import {
//   catalog_list,
//   save_catalog,
//   servie_list,
//   add_services,
//   remove_services
// } from "../../api";

import api from '@/api'

export default {
  data() {
    return {
      catalog_data: [],
      selected_services: [],
      all_services: [],
      new_subject: {},
      currnet_data: null
    };
  },
  async mounted() {
    var list = await api.catalog.catalog_list();
    this.catalog_data = list.map(r => {
      r.label = r.name;
      r.children = r.subject;
      r.children.map(s => {
        s.label = s.name;
        return s;
      });
      return r;
    });
    var services = await api.service.servie_list();
    this.all_services = services.map(r => {
      r.key = r.id;
      r.label = r.name;
      return r;
    });
  },
  methods: {
    append_subject(node, data, e) {
      e.stopPropagation();
      this.currnet_data = data;
      data.children.push({
        id: null,
        pid: data.id,
        name: "",
        children: [],
        subject: []
      });
      node.expanded = true;
    },
    async save_subject(data) {
      var id = await api.catalog.save_catalog(data.name, data.pid);
      if (id) {
        data.id = id;
        data.label = data.name;
      }
    },
    async onNodeChange(data, node) {
      this.selected_services = [];
      if (data.id && node.level > 1) {
        var services = await api.service.servie_list(data.id);
        services = services.map(r=>r.id);
        this.selected_services=services
      }
    },
    async service_change(value, direction,keys) {      
      if (direction == "left") {
        //remove
        await api.service.remove_services(keys);
      } else {
        //add
        await api.service.add_services(keys);
      }
    }
  }
};
</script>

<style>
</style>
