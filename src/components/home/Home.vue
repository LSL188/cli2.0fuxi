<template>
  <el-container class="home-el-container">
    <el-header>
      <div class="left">
        <img src="../../assets/logo.png" alt="" />
        <span>后台管理系统</span>
      </div>
      <el-button type="info" size="small" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :width="collapse? '65px':'200px'">
        <div class="toggleBar" @click="collapse=!collapse">|||</div>
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409eff"
          :unique-opened="true" :collapse="collapse" :collapse-transition="false" router :default-active="saveClickPath"
        >
          <el-submenu :index="item.id + ''" v-for="(item, i) in menusList" :key="item.id" :style="collapse?'width:65px':'width:200px'">
            <template slot="title">
              <i :class="['iconfont', iconList[i]]"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+ subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="saveActivePath('/'+ subItem.path)">
              <i class="el-icon-menu"></i>
              <span slot="title">{{subItem.authName}}</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import mix from "./Home-mixins.js";
export default {
  mixins: [mix]
};
</script>

<style lang="less" scoped>
.home-el-container {
  height: 100%;
  .el-header {
    min-width: 300px;
    user-select: none;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      display: flex;
      align-items: center;
      img {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        border-radius: 50%;
        background-color: #fff;
      }
      span {
        color: #fff;
      }
    }
  }
  .el-aside {
    user-select: none;
    background-color: #333744;
    .iconfont {
        margin-right: 10px;
    }
    .toggleBar {
        background-color: #4a5064;
      text-align: center;
      line-height: 25px;
      color: #fff;
      font-size: 12px;
      letter-spacing: 0.1em;
      cursor: pointer;
    }
  }
  .el-main {
    background-color: #eaedf1;
  }
}
</style>
