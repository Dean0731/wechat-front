<template>
  <div class="app-container">
    <h2>消息推送</h2>
    <el-form v-model="temp" status-icon label-position="left" label-width="70px" style="width: 800px; margin-left:50px;" class="demo-ruleForm">
      <el-form-item label="内容">
        <el-upload
          class="upload-demo"
          :limit="2"
          name="FilePicture"
          :action="url"
          :on-exceed="onExceed"
          :on-success="onSuccess"
          :before-upload="onBefore"
          :file-list="fileList"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过10MB</div>
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
  </div>
</template>
<script>
import { createMessage } from '@/api/message'
// import JsonViewer from 'vue-json-viewer'
export default {
  components: {

  },
  data() {
    return {
      urls: ['https://api.kinh.cc/Picture/HuluXia.php', 'https://api.kinh.cc/Picture/AFDian.php', 'https://api.kinh.cc/Picture/Imgbb.php'],
      url: 'https://api.kinh.cc/Picture/Imgbb.php',
      fileList: [],
      temp: {
        content: ''
      },
      files: [],
      uploadData: {}
    }
  },
  methods: {
    onBefore: function(file) {
      const size = file.size
      if (size <= 5242880) {
        this.url = this.urls[0]
      } else if (size <= 10485760) {
        this.url = this.urls[1]
      } else if (size <= 33554432) {
        this.url = this.urls[2]
      } else {
        this.$message({
          message: '大小超出限制',
          type: 'error'
        })
        return false
      }
      return true
    },
    onExceed(files, fileList) {
      this.$message({
        message: '数量限制',
        type: 'success'
      })
    },
    onSuccess(response, file, fileList) {
      if (response.status !== 0) {
        fileList.pop()
        this.$message({
          message: '文件格式不对',
          type: 'error'
        })
        return
      }
      for (var i = 0; i < fileList.length; i++) {
        this.files[i] = { 'name': fileList[i].name, 'link': fileList[i].response.link }
      }
    },
    createData() {
      // eslint-disable-next-line no-unused-vars
      let k = ''
      for (let i = 0; i < this.files.length; i++) {
        k += this.files[i].name + ':' + this.files[i].link + '\n'
      }
      this.temp.content = k + this.temp.content
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
