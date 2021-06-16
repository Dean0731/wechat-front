<template>
  <div class="app-container" style="margin: 0 auto;width:80%">
    <el-row>
      <el-col :span="6">
        <el-input v-model="listQuery.title" placeholder="Please input the title" style="width:500px;margin-right: 10px" class="filter-item" @keyup.enter.native="handleFilter">
          <el-button slot="append" v-waves class="filter-item" icon="el-icon-search" @click="handleFilter">
            Search
          </el-button>
        </el-input>
      </el-col>
      <el-col :span="1" :offset="16">
        <el-link v-if="name!==''" href="/#/dashboard">{{ name }}</el-link>
        <el-link v-else href="/#/login">Login</el-link>
      </el-col>
    </el-row>
    <hr>
    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
    >
      <el-table-column label="ID" prop="id" align="center" width="60">
        <template slot-scope="{$index}">
          <span>{{ $index+1+listQuery.size*(listQuery.current-1) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Title" width="400">
        <template slot-scope="{row}">
          <span>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Tag" align="center">
        <template slot-scope="{row}">
          <div v-if="row.tag !== null">
            <el-tag
              v-for="item in row.tag.split(',')"
              :key="item"
              :type="type[Math.floor(Math.random()*5)]"
              effect="dark"
              style="margin-left: 2px"
            >
              {{ item }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="URL" align="center">
        <template slot-scope="{row}">
          {{ row.url }}
        </template>
      </el-table-column>
      <el-table-column label="Date" align="center" width="200">
        <template slot-scope="{row}">
          <span>{{ row.time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.current" :limit.sync="listQuery.size" @pagination="getList" />
  </div>
</template>

<script>
import { fetchList } from '@/api/source'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { type } from '@/utils/myutil'
import { mapGetters } from 'vuex'
export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  data() {
    return {
      type,
      username: null,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        current: 1,
        size: 10,
        title: undefined
      },
      dialogFormVisible: false
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
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.records
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    handleFilter() {
      this.listQuery.current = 1
      this.getList()
    }
  }
}

</script>
