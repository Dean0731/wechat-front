<template>
  <div class="app-container">
    <el-col>
      <h2>消息推送</h2>
      <el-form ref="form" v-model="temp" status-icon label-width="100px" class="demo-ruleForm">
        <el-form-item label="内容">
          <el-input v-model="temp.content" type="textarea" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="createData">提交</el-button>
          <!--        <el-button @click="">重置</el-button>-->
        </el-form-item>
      </el-form>
    </el-col>
  </div>
</template>
<script>
import { createMessage } from '@/api/message'

export default {
  data() {
    return {
      temp: {
        content: undefined
      }
    }
  },
  methods: {
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
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
      })
    }
  }
}
</script>
