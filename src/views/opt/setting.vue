<template>
  <div class="app-container">
    <div v-if="title==''">
      <json-viewer :value="list" :expand-depth="4" copyable sort />
    </div>
    <div v-else>
      <div style="text-align: center;font-size: 25px;color: rgba( 0,0,0,0.1);font-family: 'Helvetica Neue',Helvetica,'PingFang SC','Hiragino Sans GB','Microsoft YaHei','微软雅黑',Arial,sans-serif;">{{ title }}</div>
    </div>
  </div>
</template>

<script>

import { getSetting } from '@/api/option'
import JsonViewer from 'vue-json-viewer'

export default {
  name: 'ComplexTable',
  filters: {},
  components: {
    JsonViewer
  },
  data() {
    return {
      title: '',
      list: ''
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

