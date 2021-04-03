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
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="30%"
        >
      <span>{{title}}</span>
      <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
    </el-dialog>
  </el-col>
</template>
<script>
import {URL_MESSAGE} from "../../assets/js/const"
import {checkResponse} from "../../assets/js/function"
export default {
  data () {
    return {
      message:{
        content:''
      },
      dialogVisible: false,
      title:"发送完成"
    };
  },
  methods:{
    sendMessage(){
      var data = this.$qs.parse({"content":this.message.content})
      var _this = this;
      this.$axios.post(URL_MESSAGE,data).then(function (response){
        let [flag,data] = checkResponse(response,true)
        if(flag){
          _this.dialogVisible = true;
        }else{
          _this.dialogVisible = true;
          _this.title = data;
        }
      })
    },
  }
}
</script>
