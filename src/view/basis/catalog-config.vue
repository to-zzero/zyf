<template>
  <el-container>
    <el-aside width="30%">
      <el-tree :data="catalog_data" node-key="id">
        <span slot-scope="{node,data}">
          <span v-if="data.id">{{data.name}}</span>
          <span v-else>
            <input placeholder="输入名称" size="mini" v-model="data.name">
            <el-button slot="append" icon="el-icon-check" @click="()=>save_subject(data)" size="mini" style="height:23px"></el-button>
          </span>
          <span v-if="node.level==1">
            <el-button type="text" size="mini" @click="() => append_subject(node,data)">添加子目录</el-button>
          </span>
        </span>
      </el-tree>
    </el-aside>
    <el-aside width="60%">
      <el-transfer></el-transfer>
    </el-aside>
  </el-container>
</template>

<script>
import { catalog_list } from "../../api";
export default {
  data() {
    return {
      catalog_data: [],
      new_subject: {},
      currnet_data: null
    };
  },
  async mounted() {
    var list = await catalog_list();
    this.catalog_data = list.map(r => {
      r.label = r.name;
      r.children = r.subject;
      r.children.map(s => {
        s.label = s.name;
        return s;
      });
      return r;
    });
  },
  methods: {
    append_subject(node, data) {
      this.currnet_data = data;
      data.children.push({
        id: null,
        pid: data.id,
        name: "",
        children: [],
        subject: []
      });
    },
    save_subject(data) {
      
    }
  }
};
</script>

<style>
</style>
