<template>
  <div class="user-management">
    <div class="title">
      服务目录
    </div>

    <div class="flex-box add">
      <span @click="addList">
        <i class="el-icon-plus"></i>
        添加目录
      </span>
    </div>

    <div class="list mg-t40">
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="{row}">
            <el-table
              :data="row.subject"
              style="width: 100%">
              <el-table-column
                prop="count">
              </el-table-column>
              <el-table-column
                prop="name">
              </el-table-column>
              <el-table-column
                prop="province">
              </el-table-column>
              <el-table-column
                prop="city">
              </el-table-column>
              <el-table-column
                prop="address">
              </el-table-column>
              <el-table-column
                prop="zip">
              </el-table-column>
              <el-table-column
                fixed="right">
                <template slot-scope="scope">
                  <el-button @click="edit(scope.row)" type="text" size="small">编辑</el-button>
                  <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          prop="id">
        </el-table-column>
        <el-table-column
          label="目录名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="目录编码"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="描述"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="排序"
          prop="desc">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="desc">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import api from '@/api'
  export default {
    name: 'UserManagement',
    data () {
      return {
        tableData: [{
          id: '12987122',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987123',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987125',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }, {
          id: '12987126',
          name: '好滋好味鸡蛋仔',
          category: '江浙小吃、小吃零食',
          desc: '荷兰优质淡奶，奶香浓而不腻',
          address: '上海市普陀区真北路',
          shop: '王小虎夫妻店',
          shopId: '10333'
        }]
      }
    },
    mounted () {
      this.getList()
    },
    methods: {
      addList () {
        this.$root.$emit('addList', true)
      },
      getList () {
        api.catalog.catalog_list().then(res => {
          this.tableData = res
        })
      },
      edit (row) {},
      remove (row) {}
    }
  }
</script>

<style lang="scss">
  .user-management {
    border-radius: 4px;
    box-shadow: 0 -1px 0 0 #e6eaee;
    background-color: #ffffff;
    padding: 24px 32px;

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
  }
</style>
