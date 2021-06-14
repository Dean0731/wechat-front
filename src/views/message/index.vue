<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <el-table-column label="Type" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.msgType }}
        </template>
      </el-table-column>
      <el-table-column label="Content" width="500" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Url" width="500" align="center">
        <template slot-scope="scope">
          <el-link type="primary" :underline="false" :href="scope.row.picUrl" target="_blank">{{ scope.row.picUrl | ellipsis }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="Time" align="center">
        <template slot-scope="scope">
          {{ scope.row.createTime | parseTime }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="{row,$index}">
          <el-button size="mini" type="success" @click="deleteHandler(row)">
            Delete
          </el-button>
          <el-button type="primary" size="mini" @click="handleCopy(row)">
            Copy
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete(row,$index)">
            Delete
          </el-button>

        </template>
      </el-table-column>
    </el-table>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
  </div>
</template>

<script>
import { deleteMessage, getList } from '@/api/message'
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination'
export default {
  components: { Pagination },
  filters: {
    ellipsis(value) {
      if (!value) return ''
      if (value.length > 50) {
        return value.slice(0, 50) + '...'
      }
      return value
    },
    parseTime(value) {
      return parseTime(Number(value))
    }
  },
  data() {
    return {
      list: null,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 10
      },
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    getList() {
      return getList(this.listQuery)
    },
    fetchData() {
      this.listLoading = true
      this.getList().then(response => {
        this.list = response.data.records
        this.total = response.data.total
        this.listQuery.page = response.data.current
        this.listLoading = false
      })
    },
    handleCopy(row) {
      var Url2 = row.content
      var oInput = document.createElement('input')
      oInput.value = Url2
      console.log(oInput.value)
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message.success(('复制成功'))
    },
    handleDelete(row, index) {
      this.$confirm('此操作将任务状态改为删除状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteMessage(row.msgId)
        this.list.splice(index, 1)
        this.$notify({
          title: 'Success',
          message: 'Delete Successfully',
          type: 'success',
          duration: 2000
        })
      }).catch(() => {
        this.$message.info('操作已取消！')
      })
    }
  }
}
</script>
