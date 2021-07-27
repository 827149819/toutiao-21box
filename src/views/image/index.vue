<template>
  <div class="imageContainer">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="actionHead" >
        <el-radio-group
          v-model="collect"
          size="mini"
          @change="loadImages(1)">
          <el-radio-button
            :label="false">全部</el-radio-button>
          <el-radio-button
            :label="true">收藏</el-radio-button>
        </el-radio-group>
        <el-button
          size="mini" type="success" @click="uploadVisibleDialog=true">
          上传素材
        </el-button>
      </div>
        <el-row :gutter="10" style="margin-top: 20px">
          <el-col
            :lg="4" :sm="6" :xs="12" :md="6"
            v-for="(image, index) in images"
            :key="index"
            class="imageItem"
          >
            <el-image
              style="height: 200px;"
              :src="image.url"
              fit="cover"></el-image>
            <div class="imageAction">
              <el-button
                :icon="image.is_collected ? 'el-icon-star-on': 'el-icon-star-off'"
                @click="onCollect(image)"
                :loading="image.loading"
                circle size="big" type="warning"
              ></el-button>
              <el-button
                size="big"
                icon="el-icon-delete-solid"
                circle
                type="danger"
                @click="onDelete(image)"
              ></el-button>
<!--              <i-->
<!--                :class="{-->
<!--                  'el-icon-star-on' : image.is_collected,-->
<!--                  'el-icon-star-off' : !image.is_collected-->
<!--                }"-->
<!--                @click="onCollect(image)"-->
<!--              ></i>-->
<!--              <i class="el-icon-delete-solid"></i>-->
            </div>
          </el-col>
        </el-row>
        <el-pagination
          background
          layout="prev, pager, next"
          :total="totalCount"
          :page-size="pageSize"
          :current-page.sync="pagenum"
          @current-change="onPageChange">
        </el-pagination>
    </el-card>
    <el-dialog
      width="440px" height="310px"
      title="上传素材"
      :visible.sync="uploadVisibleDialog"
      :append-to-body="true"
      >
      <el-upload
        class="upload-demo"
        drag name="image"
        action="http://127.0.0.1/mp/v1_0/user/images"
        :headers="uploadHeaders"
        multiple :show-file-list="false"
        :on-success="onUploadSuccess">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-dialog>
  </div>
</template>

<script>
import { getImages, collectImage, delImage } from '@/api/image'
export default {
  name: 'imageIndex',
  components: {},
  props: {},
  data () {
    const user = JSON.parse(window.localStorage.getItem('user'))
    return {
      collect: false,
      images: [],
      uploadVisibleDialog: false,
      uploadHeaders: {
        Authorization: `Bearer ${user.token}`
      },
      totalCount: 0,
      pageSize: 10,
      pagenum: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadImages(1)
  },
  mounted () {},
  methods: {
    loadImages (page) {
      this.pagenum = page
      getImages({
        collect: this.collect,
        page: page,
        per_page: this.pageSize
      }).then(res => {
        // console.log(res)
        const results = res.data.results
        results.forEach(image => {
          image.loading = false
        })
        this.images = results
        this.totalCount = res.data.total_count
      })
    },
    onUploadSuccess () {
      this.uploadVisibleDialog = false
      this.loadImages(this.pagenum)
      this.$message.success('上传素材成功')
    },
    onPageChange (page) {
      this.loadImages(page)
    },
    onCollect (image) {
      image.loading = true
      collectImage(image.id, !image.is_collected).then(res => {
        image.is_collected = !image.is_collected
        image.loading = false
      })
      // // 如果已收藏，取消收藏
      // if (image.is_collected) {
      //   collectImage(image.id, false)
      // } else {
      //   // 如果未收藏，则收藏
      //   collectImage(image.id, true)
      // }
    },
    onDelete (image) {
      image.loading = true
      delImage(image.id).then(res => {
        this.loadImages(this.pagenum)
        image.loading = false
      })
    }
  }
}
</script>

<style scoped lang="less">
.actionHead{
  padding-bottom: 20px;
  display: flex;
  justify-content: space-between;
}
.imageAction{
  height: 40px;
  background-color: rgba(204, 204, 204, .5);
  position: absolute;
  bottom: 3px;
  left: 5px;
  right: 5px;
  font-size: 25px;
  display: flex;
  justify-content: space-evenly;
  color: white;
}
.imageItem{
  position: relative;
}
</style>
