<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <github-corner class="github-corner" />
    <panel-group @handleSetLineChartData="handleSetLineChartData" />
    <el-card v-if="visible" class="box-card">
      <div slot="header" class="clearfix">
        <span>{{ obj.name }}</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
      </div>
      <div v-for="(value, key) in obj.item" :key="key" class="text item">
        {{ key + ':'+ value }}
      </div>
    </el-card>

  </div>
</template>

<script>
import GithubCorner from '@/components/GithubCorner'
import PanelGroup from './components/PanelGroup'
import { mapGetters } from 'vuex'
export default {
  name: 'Dashboard',
  components: {
    GithubCorner,
    PanelGroup
  },
  data() {
    return {
      visible: false,
      obj: {
        name: '',
        item: {}
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  methods: {
    handleSetLineChartData(type, obj) {
      this.visible = !this.visible
      if (type === 'messages') {
        this.obj.name = 'lastest message'
        this.obj.item['message'] = obj.lastest.content
        this.obj.item['url'] = obj.lastest.picUrl
        this.obj.item['type'] = obj.lastest.msgType
        console.log(obj)
      } else {
        this.visible = !this.visible
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.dashboard-container {
  padding: 32px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .github-corner {
    position: absolute;
    top: 0px;
    border: 0;
    right: 0;
  }

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}
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
  width:100%;
}
</style>
