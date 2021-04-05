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
import {sendMessage} from "../../config/service";
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
      sendMessage(data,this)
    },
  }
}
</script>
