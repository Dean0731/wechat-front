<template>
  <el-container ref="homePage">
    <el-aside width="250px">
      <Aside />
    </el-aside>
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view>
          <DashBoard />
        </router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/components/Aside";
import DashBoard from "@/components/page/DashBoard";
import {permssion} from "@/assets/js/function";
export default {
  name:"Home",
  components:{
    Aside, DashBoard
  },
  data(){
    return {
      clientHeight:null
    }
  },
  created() {
    permssion(this)
  },
  mounted(){
    // 获取浏览器可视区域高度
    this.clientHeight =   `${document.documentElement.clientHeight}`
    //document.body.clientWidth;
    //console.log(self.clientHeight);
    window.onresize = function temp() {
      this.clientHeight = `${document.documentElement.clientHeight}`;
    };
  },
  watch: {
    // 如果 `clientHeight` 发生改变，这个函数就会运行
    clientHeight: function () {
      this.changeFixed(this.clientHeight)
    }
  },

  methods:{

    changeFixed(clientHeight){ //动态修改样式
      // console.log(clientHeight);
      // console.log(this.$refs.homePage.$el.style.height);
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