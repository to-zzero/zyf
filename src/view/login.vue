<template>
  <el-form
    class="login-from"
    ref="loginForm"
    :model="form"
    :rules="rules"
    @keydown.enter.native="handleSubmit"
  >
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
    <el-form-item>
      <el-button @click="handleSubmit" type="primary">登录</el-button>
      <!-- <el-button @click="handleRegister">注册</el-button> -->
    </el-form-item>
  </el-form>
</template>
<script>
import api from "../api";
import Cookies from "js-cookie";
import { mapMutations, mapActions, mapGetters } from "vuex";
export default {
  name: "LoginForm",
  props: {
    userNameRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "用户名不能为空", trigger: "blur" }];
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [{ required: true, message: "密码不能为空", trigger: "blur" }];
      }
    }
  },
  data() {
    return {
      form: {
        userName: "",
        password: ""
      }
    };
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules
      };
    }
  },
  methods: {
    ...mapMutations(["setUser"]),
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          api.admin.login(this.form.userName, this.form.password).then(rlt => {
            if (rlt.success) {
              Cookies.set("sid", rlt.sid);
              this.setUser({
                userName: this.form.userName,
                userId: "",
                userInfo: rlt.userInfo,
                sid: rlt.sid,
                access: JSON.parse(rlt.access || "[]")
              });
              this.$router.push({ name: "Home" });
            }
          });
        }
      });
    },
    handleRegister() {
      this.$router.push({
        name: "Register"
      });
    }
  }
};
</script>

<style scoped>
.login-from {
  width: 400px;
  margin: 0 auto;
  margin-top: 100px;
}
</style>
