<template>
  <Form :model="formItem" :label-width="80" style="text-align: center">
    <h1>消息推送</h1>
    <FormItem label="Text">
      <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
    </FormItem>
    <FormItem>
      <Button type="primary">Submit</Button>
      <Button style="margin-left: 8px">Cancel</Button>
    </FormItem>
  </Form>
</template>
<script>
import QueryString from 'qs'
import axios from 'axios'
import {URL_MESSAGE} from "../assets/js/const"
import {checkResponse} from "../assets/js/function"
export default {
  data () {
    return {
      dialogVisible:false,
      formItem: {
        textarea: 'input your content'
      }
    }
  },
  methods:{
    sendMessage(){
      var data = QueryString.stringify({"content":this.message.content})
      var _this = this;
      axios.post(URL_MESSAGE,data).then(function (response){
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
