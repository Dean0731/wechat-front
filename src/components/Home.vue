<template>
  <el-container ref="homePage">
    <el-aside width="250px">
      <Aside />
    </el-aside>
    <el-container>
          <el-header style="padding: 0px;margin-left: -1px;">
            <el-menu
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">

              <el-submenu index="2" style="float: right">
                <template slot="title">{{nickname}}</template>
                <el-menu-item index="2-1">注销</el-menu-item>
                <el-menu-item index="2-2">选项2</el-menu-item>
                <el-menu-item index="2-3">选项3</el-menu-item>
              </el-submenu>
              <el-menu-item index="1" style="float: right">处理中心</el-menu-item>
            </el-menu>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import {permssion} from "../config/function";
import {NICK_NAME} from "../config/const";
import {logout} from "../config/service";
export default {
  name:"Home",
  components:{
    Aside,
  },
  data(){
    return {
      clientHeight:null,
      nickname:this.$cookies.get(NICK_NAME)
    }
  },
  created() {
    permssion(this)
  },
  mounted(){
    this.clientHeight =   `${document.documentElement.clientHeight}`
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },

  methods:{
    handleSelect(data){
      if(data=="2-1"){
        logout(this)
      }
    },
    changeFixed(clientHeight){ //动态修改样式
      this.$refs.homePage.$el.style.height = clientHeight+'px';
    },
  },
}
</script>


<style>
.el-header, .el-footer {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  text-align: center;
}

.el-aside {
  background-color: #304156;
  color: #333;
  text-align: left;
  line-height: 200px;

}

.el-main {
  background-color: #F0F2F5;
  color: #333;
  text-align: center;
}

body > .el-container {

}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
