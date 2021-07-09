<template>
  <el-row :gutter="40" class="panel-group">
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('sources', source)">
        <div class="card-panel-icon-wrapper icon-people">
          <svg-icon icon-class="URL" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Sources
          </div>
          <count-to :start-val="0" :end-val="source.toatl" :duration="2600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('messages', message)">
        <div class="card-panel-icon-wrapper icon-message">
          <svg-icon icon-class="message" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Messages
          </div>
          <count-to :start-val="0" :end-val="message.toatl" :duration="3000" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('userinfo')">
        <div class="card-panel-icon-wrapper icon-money">
          <svg-icon icon-class="peoples" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Users
          </div>
          <count-to :start-val="0" :end-val="user.toatl" :duration="3200" class="card-panel-num" />
        </div>
      </div>
    </el-col>
    <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel" @click="handleSetLineChartData('site')">
        <div class="card-panel-icon-wrapper icon-shopping">
          <svg-icon icon-class="site" class-name="card-panel-icon" />
        </div>
        <div class="card-panel-description">
          <div class="card-panel-text">
            Other
          </div>
          <count-to :start-val="0" :end-val="site.total" :duration="3600" class="card-panel-num" />
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import CountTo from 'vue-count-to'
import { getList } from '@/api/message'
import { fetchList } from '@/api/source'
import { fetchList as fetchSiteList } from '@/api/site'
import { countUserInfo } from '@/api/userinfo'

export default {
  components: {
    CountTo
  },
  data() {
    return {
      visible: false,
      message: {
        lastest: undefined,
        toatl: undefined
      },
      source: {
        toatl: undefined
      },
      user: {
        toatl: undefined
      },
      site: {
        total: undefined
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      getList().then(response => {
        this.message.lastest = response.data.records[0]
        this.message.toatl = response.data.total
      })
      fetchList().then(response => {
        this.source.toatl = response.data.total
      })
      fetchSiteList().then(response => {
        this.site.total = response.data.total
      })
      countUserInfo(1).then(response => {
        this.user.toatl = response.data
      })
    },
    handleSetLineChartData(type, obj) {
      this.$emit('handleSetLineChartData', type, obj)
    }
  }
}
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;

  .card-panel-col {
    margin-bottom: 32px;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
    position: relative;
    overflow: hidden;
    color: #666;
    background: #fff;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
    border-color: rgba(0, 0, 0, .05);

    &:hover {
      .card-panel-icon-wrapper {
        color: #fff;
      }

      .icon-people {
        background: #40c9c6;
      }

      .icon-message {
        background: #36a3f7;
      }

      .icon-money {
        background: #f4516c;
      }

      .icon-shopping {
        background: #34bfa3
      }
    }

    .icon-people {
      color: #40c9c6;
    }

    .icon-message {
      color: #36a3f7;
    }

    .icon-money {
      color: #f4516c;
    }

    .icon-shopping {
      color: #34bfa3
    }

    .card-panel-icon-wrapper {
      float: left;
      margin: 14px 0 0 14px;
      padding: 16px;
      transition: all 0.38s ease-out;
      border-radius: 6px;
    }

    .card-panel-icon {
      float: left;
      font-size: 48px;
    }

    .card-panel-description {
      float: right;
      font-weight: bold;
      margin: 26px;
      margin-left: 0px;

      .card-panel-text {
        line-height: 18px;
        color: rgba(0, 0, 0, 0.45);
        font-size: 16px;
        margin-bottom: 12px;
      }

      .card-panel-num {
        font-size: 20px;
      }
    }
  }
}

@media (max-width:550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
