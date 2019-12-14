<template>
  <el-container class="login-container" id="login-container">
    <el-form
      class="login-from"
      ref="loginForm"
      :model="form"
      inline
      @keydown.enter.native="handleSubmit"
    >
      <el-form-item label prop="userName">
        <el-input
          size="mini"
          v-model="form.userName"
          placeholder="请输入用户名"
          prefix-icon="el-icon-user-solid"
        ></el-input>
      </el-form-item>
      <el-form-item label prop="password">
        <el-input
          type="password"
          size="mini"
          v-model="form.password"
          placeholder="请输入密码"
          prefix-icon="el-icon-key"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button id="btnLogin" @click="handleSubmit" type="primary" size="mini" width="150px">登录</el-button>
        <!-- <el-button @click="handleRegister">注册</el-button> -->
      </el-form-item>
    </el-form>
  </el-container>
</template>
<script>
import api from "../api";
import Cookies from "js-cookie";
import { mapMutations, mapActions, mapGetters } from "vuex";

const base_captcha_url = "api/admin/captcha?rnd=";
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
        password: "",
        captcha: ""
      },
      captchaUrl: base_captcha_url + Math.random()
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
      if (!this.form.userName) return this.$message.error("用户名不能为空");
      if (!this.form.password) return this.$message.error("密码不能为空");
      const loading = this.$loading({
        lock: true,
        text: "正在登录...",
        target: 'btnLogin'
      });
      api.admin
        .login(this.form.userName, this.form.password, this.form.captcha)
        .then(rlt => {
          loading.close();
          if (rlt.success) {
            Cookies.set("sid", rlt.sid);
            this.setUser({
              userName: this.form.userName,
              userId: "",
              userInfo: rlt.userInfo,
              sid: rlt.sid,
              access: JSON.parse(rlt.access || "[]")
            });
            if (this.$route.query.redirect) {
              this.$router.push({ path: this.$route.query.redirect });
            } else {
              this.$router.push({ name: "Home" });
            }
          }
        })
        .catch(err => {
          loading.close();
        });
    },
    handleRegister() {
      this.$router.push({
        name: "Register"
      });
    },
    changeCaptchaUrl() {
      this.captchaUrl = base_captcha_url + Math.random();
    }
  }
};
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  box-sizing: border-box;
  background-color: #095eaa;
  background-image: url("../assets/login_bg.jpg");
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
}

.login-from {
  width: 200px;
  margin: 0 auto;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -50px;
  margin-left: -100px;
}

.title {
  font-size: 24px;
  color: #fff;
  font-weight: bold;
  position: absolute;
  margin-top: 6px;
  margin-left: 12px;
}

.el-form-item {
  margin-bottom: 10px !important;
}

.el-form-item__error {
  padding-top: 0 !important;
  margin-top: -2px !important;
}
</style>


