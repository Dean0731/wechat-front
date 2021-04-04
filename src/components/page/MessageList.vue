<template>
  <el-row>
    <h1>消息查看</h1>
  <el-table
      :data="message"
      border
      style="width: 100%">
    <el-table-column
        label="序号"
        width="70%"
        type="index"
        align="center">
      <template slot-scope="scope">
        <span>{{(page.pageNumber - 1) * page.pageSize + scope.$index + 1}}</span>
      </template>
    </el-table-column>
    <el-table-column
        prop="msgType"
        width="100%"
        label="类型">
    </el-table-column>
    <el-table-column
        :show-overflow-tooltip="true"
        prop="content"
        width="200%"
        label="内容">
    </el-table-column>
    <el-table-column
        prop="picUrl"
        :show-overflow-tooltip="true"
        label="图片">
      <template slot-scope="scope">
        <a :href="scope.row.picUrl" target="_blank">{{scope.row.picUrl }}</a>
      </template>
    </el-table-column>
    <el-table-column
        prop="createTime"
        width="200%"
        label="时间">
      <template slot-scope="scope">
        {{dateFormat(scope.row.createTime)}}
      </template>
    </el-table-column>
    <el-table-column
        fixed="right"
        width="100%"
        label="操作">
      <template slot-scope="scope">
        <el-button type="text" @click="copyText(scope.row)" size="small">复制</el-button>
        <el-button type="text" @click="deleteRow(scope.$index)" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>

  <el-pagination
      background
      style="margin-top: 50px"
      @current-change="getMessageList"
      layout="prev, pager, next"
      :total="total">
  </el-pagination>
  </el-row>
</template>

<script>
import {URL_MESSAGE_COUNT,URL_MESSAGE} from "../../config/const"
import {checkResponse,urlJoinParam} from "../../config/function"
import {errorMessage, successMessage} from "../util/messageUtil";
export default {
  data(){
    return{
      message:[],
      page:1,
      total:0,
    }
  },
  created(){
    this.getMessageList(null)
    this.getTotal()
  },
  methods:{
    getTotal(){
      this.$axios.get(URL_MESSAGE_COUNT)
          .then(response=>{
                let[flag,data]  = checkResponse(response,true,this)
                if(flag){
                  this.total = data;
                }
              }
          )
    },
    getMessageList(pageNumber){
      if (pageNumber==null){
        pageNumber=1
      }
      this.$axios.get(urlJoinParam(URL_MESSAGE,{"pageNumber":pageNumber,}))
          .then(response=>{
                let [flag,data] = checkResponse(response,true,this)
                if(flag){
                  this.message = data.messageList;
                  this.page = data.page;
                }
              }
          ).catch(res=>{
        this.$message(errorMessage(res))
      })
    },
    deleteRow(row){
      var _this = this;
      var body = {params: {"msgId":this.message[row].msgId}}
      this.$axios.delete(URL_MESSAGE,body).then(res=>{
        let [flag,data] = checkResponse(res,true)
        if(flag){
          _this.message.splice(row,1);
          _this.$message(successMessage("delete success"))
        }else{
          _this.$message(errorMessage(data))
        }
      })
    },
    copyText(row) {
      let Url2 = row.content;  //每一行的某个值，如选中的当前行的url
      var oInput = document.createElement('input');     //创建一个隐藏input（重要！）
      oInput.value = Url2;    //赋值
      console.log(oInput.value);
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象
      document.execCommand("Copy"); // 执行浏览器复制命令
      oInput.className = 'oInput';
      oInput.style.display='none';
    }
  }
}
</script>
