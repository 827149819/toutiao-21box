<template>
  <div class="imageContainer">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>素材管理</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div style="padding-bottom: 20px;">
        <el-radio-group v-model="radid">
          <el-radio-button label="全部"></el-radio-button>
          <el-radio-button label="收藏"></el-radio-button>
        </el-radio-group>
        <el-row :gutter="10" style="margin-top: 20px">
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
          <el-col :lg="4" :sm="6" :xs="12" :md="6">
            <el-image
              style=" height: 100px"
              :src="url"
              fit="cover"></el-image>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: 'imageIndex',
  components: {},
  props: {},
  data () {
    return {
      radid: '全部',
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped>

</style>
