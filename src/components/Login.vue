<template>
  <div class="login-container">
    <div class="avatar">
      <img src="../assets/logo.png" alt="" />
    </div>
    <el-form :model="loginForm" :rules="LoginRules" ref="LoginFormRef">
      <el-form-item prop="username">
        <el-input v-model="loginForm.username">
            <i slot="prefix" class="iconfont icon-bussiness-man"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" type="password">
            <i slot="prefix" class="iconfont icon-password"></i>
        </el-input>
      </el-form-item>
      <el-form-item class="btns">
       <el-button type="primary" @click="login">登录</el-button>
       <el-button type="info" @click="resetLogin">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import mix from './Login-mixins.js'
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.login-container {
  width: 450px;
  height: 304px;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  .avatar {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    width: 130px;
    height: 130px;
    padding: 10px;
    border: 1px solid #eee;
    border-radius: 50%;
    box-shadow: 0 0 10px #ccc;
    img {
      border-radius: 50%;
      background-color: #eee;
      width: 100%;
      height: 100%;
    }
  }
  .el-form {
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
    position: absolute;
    bottom: 0;
    .btns {
        display: flex;
        justify-content: flex-end;
    }
  }
}
</style>
