<template>
  <el-container ref="homePage">
    <el-aside width="250px">
      <Aside />
    </el-aside>
    <el-container>
          <el-header style="text-align: right; font-size: 12px;">
            <el-dropdown  @command="handleCommand">
              <i class="el-icon-setting" style="margin-right: 15px"></i>
              <span>{{nickname}} </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">注销</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
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
import {logout,permssion} from "../config/function";
import {NICK_NAME} from "../config/const";
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
    handleCommand(data){
      if(data=="a"){
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
  text-align: center;
  line-height: 60px;
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
