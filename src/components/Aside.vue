<template>
  <el-row class="tac">
  <el-col>
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        background-color="#304156"
        text-color="#fff"
        :router="isRouter"

        active-text-color="#ffd04b">
      <el-menu-item style="text-align: center;padding:10px 0px 10px 0px">
        <el-image src="/favicon.ico"/>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>导航一</span>
        </template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item :index="a">
        <i class="el-icon-menu"></i>
        <span slot="title">DASHBOARD</span>
      </el-menu-item>
      <el-menu-item :index="b">
        <i class="el-icon-document"></i>
        <span slot="title">MESSAGELIST</span>
      </el-menu-item>
      <el-menu-item :index="c">
        <i class="el-icon-setting"></i>
        <span slot="title">SENDMESSAGE</span>
      </el-menu-item>
    </el-menu>
  </el-col>
  </el-row>
</template>

<script>
import {URL_DASHBOARD, URL_MESSAGE_LIST, URL_MESSAGE_SEND} from "@/assets/js/const";
export default {
  name: "Aside",
  data(){
    return {
      isRouter:true, // 菜单index 作为 vuerouter path
      a:URL_DASHBOARD,
      b:URL_MESSAGE_LIST,
      c:URL_MESSAGE_SEND,
    }
  },
  methods: {
  }
}
</script>
<style scoped>
</style>
