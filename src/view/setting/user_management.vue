<template>
  <div class="user-management">
    <div class="title">服务目录</div>

    <div class="flex-box add">
      <span @click="addList">
        <i class="el-icon-plus"></i>
        添加目录
      </span>
    </div>

    <div class="list mg-t40">
      <el-table
      :border="false"
        :data="tableData"
        row-class-name="custom-tr"
        :default-expand-all="true"
        style="width: 100%"
      >
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-table :show-header="false" :data="row.subject" style="width: 100%">
              <el-table-column type="index" width="80" class-name="subject-col" prop="count"></el-table-column>
              <el-table-column prop="name" width="180" class-name="subject-col"></el-table-column>
              <el-table-column prop="code" width="120" class-name="subject-col"></el-table-column>
              <el-table-column prop="desc" width="200" class-name="subject-col"></el-table-column>
              <el-table-column prop="order" width="120" class-name="subject-col"></el-table-column>
              <el-table-column fixed="right">
                <template slot-scope="scope">
                  <el-button @click="editItem(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="removeItem(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column label="序号" width="80" align="left" type="index" prop="id"></el-table-column>
        <el-table-column label="目录名称" width="180">
          <div slot-scope="props" style="font-weight: 600;">{{ props.row.name }}</div>
        </el-table-column>
        <el-table-column label="目录编码" prop="code" width="120"></el-table-column>
        <el-table-column label="描述" width="200" prop="desc"></el-table-column>
        <el-table-column label="排序" prop="order" width="120"></el-table-column>
        <el-table-column label="操作" >
          <template slot-scope="scope">
            <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import api from "@/api";
export default {
  name: "UserManagement",
  data() {
    return {
      tableData: []
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    addList() {
      this.$root.$emit("addList", true);
    },
    getList() {
      api.catalog.catalog_list().then(res => {
        this.tableData = res;
      });
    },
    edit(row) {
      this.$router.push({
        path: "/info_edit",
        query: {
          id: row.id
        }
      });
    }, // 编辑父级目录
    remove(row) {}, // 删除父集目录
    editItem(row) {}, // 编辑子目录
    removeItem(row) {} // 删除子目录
  }
};
</script>

<style lang="scss">
.user-management {
  border-radius: 4px;
  box-shadow: 0 -1px 0 0 #e6eaee;
  background-color: #ffffff;
  padding: 24px 32px;

  .custom-tr {
    background-color: #f6f6f6 !important;
  }

  .title {
    font-size: 20px;
    font-weight: 600;
    padding-left: 12px;
    border-left: 4px solid #4874ed;
    color: #292929;
    margin-bottom: 24px;
  }

  .add {
    text-align: center;
    justify-content: center;
    height: 52px;
    border-radius: 4px;
    border: dashed 1px #dfe3e9;
    span {
      cursor: pointer;
    }
  }

  .table-expand {
    font-size: 0;
  }
  .table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }

  .subject-col {
    padding-left: 24px;
  }
}
</style>
