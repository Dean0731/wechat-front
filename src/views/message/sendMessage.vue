<template>
  <div class="app-container">
    <h2>消息推送</h2>
    <el-form v-model="temp" status-icon label-position="left" label-width="70px" style="width: 800px; margin-left:50px;" class="demo-ruleForm">
      <el-form-item label="内容">
        <el-upload
          ref="upload"
          action="#"
          class="upload-demo"
          :limit="1"
          :file-list="fileList"
          :on-change="addFile"
          :auto-upload="false"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="temp.content" :rows="10" type="textarea" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="createData()">提交</el-button>
        <!--        <el-button @click="">重置</el-button>-->
      </el-form-item>
    </el-form>
    <json-viewer :value="uploadData" :expand-depth="4" copyable sort />
  </div>
</template>
<script>
import { createMessage } from '@/api/message'
import JsonViewer from 'vue-json-viewer'
import axios from 'axios'

export default {
  components: {
    JsonViewer
  },
  data() {
    return {
      fileList: [],
      filename: null,
      fileBase64: null,
      temp: {
        content: ''
      },
      uploadData: null
    }
  },
  methods: {
    addFile(file, fileList) {
      this.getBase64(file.raw).then(res => {
        const file_name = file.name.split('.')
        if (file_name.length === 1) {
          this.filename = this.guid()
        } else {
          this.filename = this.guid() + '.' + file_name[1]
        }
        this.fileBase64 = res.split(';')[1].split(',')[1]
      })
    },
    submitUpload() {
      const loading = this.$loading({
        lock: true,
        text: '正在上传',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      const url = 'https://api.github.com/repos/dean0731/File/contents/wechat/' + this.filename
      const headers = { 'Content-Type': 'application/json', 'Authorization': 'token ' + window.wechat.uploadToken }
      const data = { message: 'wechat_tmep提交', content: this.fileBase64 }
      axios.put(url, data, { headers: headers }).then(res => {
        loading.close()
        this.temp.content = '文件:https://cdn.jsdelivr.net/gh/Dean0731/File@main/wechat/' + this.filename + '\n' + this.temp.content
        this.$message.success('upload success!')
        this.uploadData = res.data
      }).catch(err => {
        loading.close()
        console.log(err)
        this.$message.success('upload failed,maybe file formate does not support ')
      })
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        let fileResult = ''
        reader.readAsDataURL(file)
        reader.onload = function() {
          fileResult = reader.result
        }
        reader.onerror = function(error) {
          reject(error)
        }
        reader.onloadend = function() {
          resolve(fileResult)
        }
      })
    },
    guid() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = Math.random() * 16 | 0; const v = c === 'x' ? r : (r & 0x3 | 0x8)
        return v.toString(16)
      })
    },
    createData() {
      createMessage(this.temp).then(() => {
        this.dialogFormVisible = false
        this.$notify({
          title: 'Success',
          message: 'Created Successfully',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
