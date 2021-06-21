<template>
  <div class="app-container">
    <el-row>
      <el-col :span="1" :offset="16">
        <el-link v-if="name!==''" :underline="false" @click="gohome">{{ name }}</el-link>
        <el-link v-else @click="gohome()">Login</el-link>
      </el-col>
    </el-row>
    <el-row style="margin: 5% 0 2% 0">
      <el-col :span="1" :offset="12"><h1>导航</h1></el-col>
    </el-row>
    <el-row>
      <el-col :span="8" :offset="7">
        <el-row v-for="i in 8" :key="i" class="box">
          <el-col v-for="j in 8" :key="j">
            <el-row v-if="list[(i-1)*8+j-1] != null">
              <el-tooltip :content="list[(i-1)*8+j-1].introduction || list[(i-1)*8+j-1].url" placement="bottom" effect="light">
                <el-link
                  :type="type[Math.floor(Math.random()*6)]"
                  :underline="false"
                  style="width: 100px"
                  :href="list[(i-1)*8+j-1].url"
                  target="_blank"
                >
                  <el-row class="avatar-wrapper">
                    <img v-if="list[(i-1)*8+j-1].ico!=null" :src="list[(i-1)*8+j-1].ico+'?imageView2/1/w/80/h/80'" class="user-avatar">
                    <img v-else :src="'https://api.xinac.net/icon/?url='+list[(i-1)*8+j-1].url+'?imageView2/1/w/80/h/80'" class="user-avatar">
                  </el-row>
                  {{ list[(i-1)*8+j-1].title }}
                </el-link>
              </el-tooltip>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { fetchList } from '@/api/site'
import { mapGetters } from 'vuex'
import { type } from '@/utils/myutil'
export default {
  name: 'ComplexTable',
  data() {
    return {
      type,
      list: []
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      fetchList({ size: -1 }).then(response => {
        this.list = response.data.records
      })
    },
    gohome() {
      this.$router.push('/dashboard')
    }
  }
}
</script>
<style>
.box{
  display: flex;
  flex-warp: wrap;
  line-height: 40px;
}
.avatar-wrapper {
  margin-top: 5px;
  position: relative;
}
.user-avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 10px;
}
</style>
