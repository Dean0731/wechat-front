<template>
  <div class="app-container">
    <div v-if="title==''">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>Settings</span>
          <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
          <div v-for="(value,key) in list" :key="key" class="text item">
            {{ key.toLowerCase() + ':' }}
            <el-tooltip class="item" effect="dark" :content="value" placement="top-start">
              <span>{{ value | ellipsis(150) }}</span>
            </el-tooltip>
          </div>
        </div>
      </el-card>
    </div>
    <div v-else>
      <div style="text-align: center;font-size: 25px;color: rgba( 0,0,0,0.1);font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;">{{ title }}</div>
    </div>
  </div>
</template>

<script>

import { getSetting } from '@/api/option'

export default {
  name: 'ComplexTable',
  filters: {},
  data() {
    return {
      title: '',
      list: []
    }
  },
  created() {
    getSetting().then(res => {
      this.list = res.data
      // eslint-disable-next-line handle-callback-err
    }).catch(error => {
      this.title = error.toString().split(':')[1]
    })
  }
}
</script>
<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>
