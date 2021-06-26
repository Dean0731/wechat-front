<template>
  <div>
    <el-row class="main">
      <el-row style="background-color: #A5A7AD;">
        <el-row style="height: 60px;padding: 20px 0px 20px 0px">
          <div v-for="i in list2" :key="i.id" style="float: left;margin:0px 0px 0px 20px;color: #fff;">
            <el-link
              :underline="false"
              style="color: #ffffff"
              :href="i.url"
              target="_blank"
            >
              {{ i.title }}
            </el-link>
          </div>
          <div style="float: right;margin-right: 50px">
            <div v-if="name!==''">
              <el-link :underline="false" @click="gohome">{{ name }}</el-link>
            </div>
            <el-link v-else @click="gohome()">Login</el-link>
          </div>
        </el-row>
      </el-row>
      <el-row>
        <el-col :offset="7" :span="10" style="margin-top: 50px;margin-bottom: 50px">
          <el-input v-model="listQuery.title" class="filter-item" @keyup.enter.native="handleFilter">
            <el-button slot="append" v-waves class="filter-item" icon="el-icon-search" style="background-color: #4E6EF2;color: #ffffff" @click="handleFilter">
              Search
            </el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-row v-if="list!=[]" v-loading="loading">
        <el-col :offset="6" :span="15">
          <div v-for="i in list" :key="i.id" style="">
            <div style="line-height: 50px">
              <el-link type="primary" style="font-size: 30px" :underline="true" :href="i.url" target="_blank">{{ i.title }}</el-link>
              <div v-if="i.tag !== null">
                标签：{{ i.tag }}
              </div>
              时间：{{ i.time }}
              链接：<span>{{ i.url }}</span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row style="height: 50px">
        <el-col :offset="12" :span="6">
          <span v-if="footerText!=null" style="color: gray">{{ footerText }}</span>
        </el-col>
      </el-row>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/site'
import { fetchList as fetchListSource } from '@/api/source'
import { mapGetters } from 'vuex'
import { type } from '@/utils/myutil'
import waves from '@/directive/waves'
export default {
  name: 'ComplexTable',
  directives: { waves },
  data() {
    return {
      type,
      loading: false,
      list: [],
      list2: [],
      footerText: null,
      listQuery: {
        current: 1,
        size: 10,
        title: undefined
      }
    }
  },
  computed: {
    ...mapGetters([
      'name',
      'avatar'
    ])
  },
  created() {
    this.getList2()
    this.handleFilter()
  },
  mounted() {
    const _this = this
    window.onscroll = function() {
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight

      if (scrollTop + windowHeight === scrollHeight) {
        _this.load()
      }
    }
  },
  methods: {
    load() {
      this.loading = true
      fetchListSource(this.listQuery).then(response => {
        if (response.data.records.length > 0) {
          this.list = this.list.concat(response.data.records)
          this.listQuery.current = this.listQuery.current + 1
        } else {
          this.footerText = '数据加载完毕'
        }
        this.loading = false
      }).catch(e => {
        this.loading = false
      })
    },
    handleFilter() {
      this.footerText = null
      this.list = []
      this.listQuery.current = 1
      this.load()
    },
    getList2() {
      fetchList({ size: -1 }).then(response => {
        this.list2 = response.data.records
      })
    },
    gohome() {
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style>
.main{
  margin: 0;
  padding: 0;
  /*background-image: url('https://dss1.bdstatic.com/kvoZeXSm1A5BphGlnYG/skin_zoom/896.jpg?2');*/
  width: 100%;
  position: relative;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  float: left;
}
</style>
