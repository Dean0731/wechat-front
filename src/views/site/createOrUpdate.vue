<template>
  <div class="app-container">
    <div style="text-align: center;"><h2>{{ dialogStatus }}</h2></div>
    <el-form ref="dataForm" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
      <el-form-item label="标题" prop="title">
        <el-input v-model="temp.title" />
      </el-form-item>
      <el-form-item label="链接" prop="url">
        <el-input v-model="temp.url" />
      </el-form-item>
      <el-form-item label="Logo" prop="ico">
        <el-input v-model="temp.ico" />
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
import { createSite, fetchSite, updateSite } from '@/api/site'
import { loadingFullScreen } from '@/utils/loading'

export default {
  name: 'CreateOrUpdateVue',
  data() {
    return {
      options: [],
      temp: {
        id: undefined,
        title: undefined,
        url: undefined,
        ico: undefined,
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
      fetchSite(id).then(response => {
        this.temp = response.data
      })
    }
  },
  methods: {
    createData() {
      const loading = loadingFullScreen(this)
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          createSite(this.temp).then(() => {
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
          updateSite(tempData).then(() => {
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
