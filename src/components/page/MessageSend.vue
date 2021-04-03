<template>
  <el-col>
    <h2>消息推送</h2>
    <el-form ref="form" v-model="message" status-icon label-width="100px" class="demo-ruleForm">
      <el-form-item label="内容" >
        <el-input type="textarea" v-model = "message.content" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="sendMessage">提交</el-button>
<!--        <el-button @click="">重置</el-button>-->
      </el-form-item>
    </el-form>
  </el-col>
</template>
<script>
import {URL_MESSAGE} from "../../assets/js/const"
import {checkResponse} from "../../assets/js/function"
import {errorMessage, successMessage} from "../util/messageUtil";
export default {
  data () {
    return {
      message:{
        content:''
      },
    };
  },
  methods:{
    sendMessage(){
      var data = this.$qs.parse({"content":this.message.content})
      var _this = this;
      this.$axios.post(URL_MESSAGE,data,).then(function (response){
        let [flag,data] = checkResponse(response,true,_this)
        if(flag){
          _this.$message(successMessage("send message success!"))
        }else{
          _this.$message(errorMessage(data))
        }
      })
    },
  }
}
</script>
