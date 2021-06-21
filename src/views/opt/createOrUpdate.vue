<template>
  <div class="app-container">
    <div style="text-align: center;"><h2>{{ dialogStatus }}</h2></div>
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="name" prop="name">
        <el-input v-model="temp.name" />
      </el-form-item>
      <el-form-item label="val" prop="val">
        <el-input v-model="temp.val" />
      </el-form-item>
      <el-form-item label="intro" prop="introduction">
        <el-input v-model="temp.introduction" type="textarea" />
      </el-form-item>
      <el-button @click="dialogFormVisible = false">
        Cancel
      </el-button>
      <el-button type="primary" @click="dialogStatus==='添加'?createData():updateData()">
        Confirm
      </el-button>
    </el-form>
  </div>
</template>

<script>
import { loadingFullScreen } from '@/utils/loading'
import { createOpt, fetchOpt, updateOpt } from '@/api/option'

export default {
  name: 'CreateOrUpdateVue',
  data() {
    return {
      options: [],
      temp: {
        id: undefined,
        name: undefined,
        val: undefined,
        introduction: undefined
      },
      dialogFormVisible: false,
      dialogStatus: '添加'
    }
  },
  mounted() {
    if (this.$route.query.id !== undefined) {
      this.dialogStatus = '修改'
      const id = this.$route.query.id
      fetchOpt(id).then(response => {
        this.temp = response.data
      })
    }
  },
  methods: {
    createData() {
      const loading = loadingFullScreen(this)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createOpt(this.temp).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Created Successfully',
              type: 'success',
              duration: 2000
            })
            loading.close()
          })
        }
      })
    },
    updateData() {
      const loading = loadingFullScreen(this)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateOpt(tempData).then(() => {
            this.$notify({
              title: 'Success',
              message: 'Update Successfully',
              type: 'success',
              duration: 2000
            })
            loading.close()
            // eslint-disable-next-line handle-callback-err
          }).catch(err => {
            loading.close()
          })
        }
      })
    }
  }
}
</script>
<style scoped>

</style>
