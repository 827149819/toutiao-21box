<template>
  <div class="uploadCoverContainer" @click="showCoverSelect">
    <div class="coverWrap">
      <img :src="coverImage" class="coverImage" ref="coverImage" />
    </div>

    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      append-to-body>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="素材库" name="first">用户管理</el-tab-pane>
        <el-tab-pane label="上传图片" name="second">
          <input ref="file" type="file" @change="onFileChange" />
          <img src="" width="100" alt="" ref="previewImage" />
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="onCoverConfirm">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import { uploadImage } from '@/api/image'

export default {
  name: 'uploadCoverIndex',
  components: {},
  props: ['cover-image'],
  data () {
    return {
      dialogVisible: false,
      activeName: 'first'
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    showCoverSelect () {
      this.dialogVisible = true
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      const blob = window.URL.createObjectURL(file)
      this.$refs.previewImage.src = blob
      // this.$refs.file.value = ''
    },
    onCoverConfirm () {
      const file = this.$refs.file.files[0]
      if (this.activeName === 'second') {
        if (!this.$refs.file.files[0]) {
          this.$message.info('请选择文件')
          return
        }
        const fd = new FormData()
        fd.append('image', file)
        uploadImage(fd).then(res => {
          this.dialogVisible = false
          this.$refs.coverImage.src = res.data.data.url
          this.$emit('uploadCover', res.data.data.url)
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.coverWrap {
  width: 125px;
  height: 120px;
  border: 1px solid #000000;
  .coverImage {
    width: 100%;
    height: 120px;
  }
}
</style>
