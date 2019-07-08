<template>
  <el-form class="register-from" ref="loginForm" :model="form" :rules="rules">
    <el-form-item label="用户名" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入用户名" prefix-icon="el-icon-user-solid"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        type="password"
        v-model="form.password"
        placeholder="请输入密码"
        prefix-icon="el-icon-key"
      ></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input
        type="password"
        v-model="form.password2"
        placeholder="再次输入密码"
        prefix-icon="el-icon-key"
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button @click="handleSubmit" type="primary" long>注册</el-button>
      <el-button @click="handleLogin" long>登录</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import api from "../api";
export default {
  name: "RegisterForm",
  data() {
    return {
      form: {
        userName: "",
        userId: "",
        password: "",
        password2: "",
        userInfo: null
      },
      rules: {
        userName: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, message: "内容长度不小于3", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 10,
            message: "长度 6-10个字母数字下划线的组合",
            trigger: "blur"
          }
        ],
        password2: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs["loginForm"].validate(valid => {
        if (!valid) return;
        if (this.form.password != this.form.password2) {
          this.$message({ type: "error", message: "两次密码不一致" });
        } else {
          api.admin
            .register(this.form.userName, this.form.password, null, null)
            .then(() => {
              //ok
              this.$router.push("/");
            });
        }
      });
    },
    handleLogin() {
      this.$router.push({
        name: "login",
        query: { userName: this.form.userName }
      });
    }
  }
};
</script>

<style>
.register-from {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
