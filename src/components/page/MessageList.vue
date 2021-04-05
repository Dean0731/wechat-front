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
import {deleteMessage, getMessage, getMessageTotal} from "../../config/service";
export default {
  data(){
    return{
      message:[],
      page:1,
      total:0,
    }
  },
  created(){
    getMessage(1,this)
    getMessageTotal(this)
  },
  methods:{
    getMessageList(pageNumber){
      getMessage(pageNumber,this)
    },
    deleteRow(row){
      var data = {params: {"msgId":this.message[row].msgId}}
      deleteMessage(row,data,this)
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
