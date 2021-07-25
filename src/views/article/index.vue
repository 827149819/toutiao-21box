<template>
  <div class="articleContainer">
    <el-card class="filterCard">
      <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 数据筛选表单 -->
      <el-form style="margin-top: 10px"  size="mini" label-width="45px">
        <el-form-item label="状态">
          <el-radio-group v-model="status">
            <el-radio :label="null">全部</el-radio>
            <el-radio :label="0">草稿</el-radio>
            <el-radio :label="1">待审核</el-radio>
            <el-radio :label="2">审核通过</el-radio>
            <el-radio :label="3">审核失败</el-radio>
            <el-radio :label="4">已删除</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="channelId" placeholder="请选择查询频道">
            <el-option label="全部" :value="null">
            </el-option>
            <el-option
              v-for="(channel, index) in articleChannel" :key="index"
              :label="channel.name" :value="channel.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            :default-time="['12:00:00']"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :disabled="loading" @click="loadArticles(1)">查询</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="contentCard">
      <div slot="header" class="clearfix">
        <span>根据筛选条件共查询带到 {{ totalCount }} 条结果</span>
      </div>
      <el-table
        :data="articles" v-loading="loading"
        style="width: 100%"
        stripe border size="mini">
        <el-table-column
          label="封面">
          <template slot-scope="scope">
            <el-image :src="scope.row.cover.images[0]" lazy
                      style="width: 90px; height: 100px" fit="cover">
              <div slot="error" class="image-slot" style="position:absolute; top:50%; left:50%;">
                <i class="el-icon-picture-outline" style="font-size: 50px"></i>
              </div>
            </el-image>
<!--            <img v-if="scope.row.cover.images[0]" :src="scope.row.cover.images[0]" alt="" class="articleCover">-->
<!--            <img v-else src="./noCover.jpg" alt="" class="articleCover">-->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{articleStatus[scope.row.status].text}}</el-tag>
<!--            <el-tag v-if="scope.row.status === 0">草稿</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 2" type="success">审核通过</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 4" type="info">已删除</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 1" type="warning">待审核</el-tag>-->
<!--            <el-tag v-else-if="scope.row.status === 3" type="danger">审核失败</el-tag>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="pubdate"
          label="发布时间">
        </el-table-column>
        <el-table-column
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" circle type="primary"
                       icon="el-icon-edit" @click="$router.push('/publish?id=' + scope.row.id)"></el-button>
            <el-button size="mini" type="danger" circle
                       icon="el-icon-delete" @click="onDeleteArticle(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background :page-size="pageSize"
        layout="prev, pager, next" :disabled="loading"
        @current-change="onCurrentChange"
        :total="totalCount"
        style="margin-top: 20px; margin-bottom: 20px; float: right"
        :current-page.sync="page">
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels, delArticle } from '@/api/article'
export default {
  name: 'index',
  components: {},
  props: {},
  data () {
    return {
      articles: [],
      articleStatus: [
        { status: 0, text: '草稿', type: '' },
        { status: 1, text: '待审核', type: 'warning' },
        { status: 2, text: '审核通过', type: 'success' },
        { status: 3, text: '审核失败', type: 'danger' },
        { status: 4, text: '已删除', type: 'info' }
      ],
      totalCount: 0,
      pageSize: 10,
      status: null, // 查询文章，文章状态参数
      articleChannel: [],
      channelId: null,
      dateRange: null,
      loading: true,
      page: 1/* 当前页码 */
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadArticles()
    this.loadChannels()
  },
  mounted () {},
  methods: {
    loadArticles (page) {
      this.loading = true
      getArticles({
        page: page,
        per_page: this.pageSize,
        status: this.status,
        channel_id: this.channelId,
        begin_pubdate: this.dateRange ? this.dateRange[0] : null,
        end_pubdate: this.dateRange ? this.dateRange[1] : null
      }).then(res => {
        const { results, total_count: totalCount } = res.data.data
        this.articles = results
        this.totalCount = totalCount

        this.loading = false
      })
    },
    onCurrentChange (page) {
      this.loadArticles(page)
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.articleChannel = res.data.data.channels
      })
    },
    onDeleteArticle (articleId) {
      this.$confirm('确认删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delArticle(articleId.toString()).then(res => {
          this.loadArticles(this.page)
          console.log(res)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>
.filterCard {
  width: 800px;
}
.contentCard{
  margin-top: 20px;
}
.articleCover{
  width: 100px;
  background-size: cover;
}
</style>
