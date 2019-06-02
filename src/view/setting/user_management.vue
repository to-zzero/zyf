<template>
  <div class="user-management">
    <div class="title">
      服务目录
    </div>

    <div class="flex-box add">
      <span>
        <i class="el-icon-plus"></i>
        添加目录
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'UserManagement'
  }
</script>

<style lang="scss" scoped>
  .user-management {
    border-radius: 4px;
    box-shadow: 0 -1px 0 0 #e6eaee;
    background-color: #ffffff;
    padding: 24px 32px;
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
</style>
