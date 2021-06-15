<template>
  <div class="app-container" align="center">
    <h2>消息推送</h2>
    <el-form v-model="temp" status-icon label-position="left" label-width="70px" style="width: 800px; margin-left:50px;" class="demo-ruleForm">
      <el-form-item label="内容">
        <el-upload
          ref="upload"
          class="upload-demo"
          :limit="1"
          name="smfile"
          action="https://sm.ms/api/v2/upload"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :on-success="handleSuccess"
          :file-list="fileList"
          :auto-upload="false"
          :headers="headers"
          :with-credentials="true"
        >
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="temp.content" type="textarea" autocomplete="off" />
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

export default {
  data() {
    return {
      fileList: [],
      headers: { 'Content-Type': 'multipart/source-data', 'Authorization': 'obtZ7JN2uDrm1IaL4zAZYSY845PpwAIS' },
      temp: {
        content: ''
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePreview(file) {
      console.log(file)
    },
    handleSuccess() {
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
