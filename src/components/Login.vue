<template>
  <el-container ref="app">
    <el-main class="main">
      <!--            <el-row :gutter="20">-->
      <el-col :span="3" :offset="16">
        <el-row class="login_box">
          <!-- 头像 -->
          <el-row class="avatar_box">
            <img class="avatar_img" src="/favicon.png" alt="">
          </el-row>
          <!-- 表单 -->
          <el-form ref="LoginFormRef" :model="loginForm" label-width="0" :rules="LoginFormRules" class="login_form">
            <el-form-item prop="username">
              <!-- 用户名-->
              <el-input v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
            </el-form-item>
            <!-- 密码-->
            <el-form-item prop="password">
              <el-input v-model="loginForm.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>
            <el-form-item class="btns">
              <el-button type="primary" @click="login" v-bind:disable="dis">登录</el-button>
              <el-button type="info" @click="resetLoginForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-row>
      </el-col>
      <!--            </el-row>-->
    </el-main>
  </el-container>
</template>
<script>
import { URL_TOKEN} from '@/assets/js/const'
import {checkResponse, updateCookies} from "@/assets/js/function"
import {URL_HOME, URL_MESSAGE_LIST} from "../assets/js/const";
export default {
  name: "Login",
  data() {
    return {
      clientHeight: null,
      dis: false,
      // 登录的初始化数据：备注默认应该是空
      loginForm: {
        username: '',
        password: ''
      },
      // 正则表达式的相关校验
      LoginFormRules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
        ]
      }
    }
  },
  mounted() {
    // 获取浏览器可视区域高度
    this.clientHeight = `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },
  methods: {
    changeFixed(clientHeight) { //动态修改样式
      this.$refs.app.$el.style.height = clientHeight + 'px';
    },
    // 清空表单的校验
    resetLoginForm() {
      this.$refs.LoginFormRef.resetFields()
    },
    //登录的方法：登录逻辑写里面
    login() {
      //首先是校验如果正则的校验通过 -->> 执行数据传输
      this.$refs['LoginFormRef'].validate(async (valid) => {
        if (valid) {
          this.$refs.dis = true;
          let _this = this
          let data = this.$qs.stringify({
            nickname: this.loginForm.username,
            password: this.loginForm.password,
          })
          this.$axios.post(URL_TOKEN, data,).then(res => {
            let [flag, data] = checkResponse(res, true)
            if (flag) {
              updateCookies(data)
              this.$router.push(URL_HOME)
            } else {
              this.$message({
                message: data,
                type: 'error'
              })
              _this.$refs.dis = false;
            }
          })
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  background: url("bg.jpg") no-repeat;
  background-size: cover
}

.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  transform: translate(20%, 100%)
}

.avatar_box {
  width: 130px;
  height: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  text-align: center;
  vertical-align: center;
}

.avatar_img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-color: #eee;
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
