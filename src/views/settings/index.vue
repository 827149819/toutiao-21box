<template>
  <div class="settingSContainer">
    <el-card>
      <div slot="header" class="clearfix">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>个人设置</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <el-row>
        <el-col :span="15">
          <el-form ref="userFormRef" :rules="userFormRules" :model="user" label-width="80px">
            <el-form-item label="编号">
              {{ user.id }}
            </el-form-item>
            <el-form-item label="手机">
              {{ user.mobile }}
            </el-form-item>
            <el-form-item label="媒体名称" prop="name">
              <el-input v-model="user.name"></el-input>
            </el-form-item>
            <el-form-item label="媒体介绍" prop="intro">
              <el-input type="textarea" v-model="user.intro"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="user.email"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSaveSettings" :loading="updateProfileLoading">保 存</el-button>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="4" :offset="2">
          <el-avatar
            shape="square"
            :size="150"
            fit="cover"
            :src="user.photo"
            style="border: lightgreen 10px solid"
          ></el-avatar>
          <el-button
            type="success"
            @click="$refs.file.click()"
            style="margin-top: 20px"
          >修改头像</el-button>
          <input
            type="file"
            ref="file"
            @change="onFileChange"
            hidden/>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog
      title="修改头像"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      @opened="onDialogOpened"
      @closed="onDialogClosed">
      <div class="preview-image-wrap">
        <img
          class="preview-image"
          :src="previewImage"
          ref="previewImage"
          alt=""
        />
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onUpdatePhoto" :loading="updatePhotoLoading">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserProfile, updateUserPhoto, updateUserProfile } from '@/api/user'
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import globalBus from '@/utils/global-bus'

export default {
  name: 'settingsIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        email: '',
        id: null,
        intro: '',
        mobile: '',
        name: '',
        photo: ''
      },
      dialogVisible: false,
      previewImage: '',
      cropper: '',
      updatePhotoLoading: false,
      updateProfileLoading: false,
      userFormRules: {
        name: [
          { required: true, message: '请输入媒体名称', trigger: 'blur' },
          { max: 20, message: '长度不能超过 20 个字符', trigger: 'blur' }
        ],
        intro: [
          { required: true, message: '请输入媒体介绍', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮 箱', trigger: 'blur' },
          { pattern: /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/, message: '请输入正确的邮箱格式' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUser()
  },
  mounted () {},
  methods: {
    onSaveSettings () {
      this.$refs.userFormRef.validate(valid => {
        if (!valid) {
          return
        }
        this.updateProfileLoading = true
        const { name, intro, email } = this.user
        updateUserProfile({
          name,
          intro,
          email
        }).then(res => {
          this.$message.success('更新成功')
          this.updateProfileLoading = false
          // 监听事件
          globalBus.$emit('updateUser', this.user)
        })
      })
    },
    loadUser () {
      getUserProfile().then(res => {
        this.user = res.data.data
      })
    },
    onFileChange () {
      // 处理图片预览
      const file = this.$refs.file

      const blobData = window.URL.createObjectURL(file.files[0])

      this.previewImage = blobData

      // 展示弹出层，展示预览图片
      this.dialogVisible = true

      // 防止选择相同文件，change事件不触发
      this.$refs.file.value = ''
    },
    onDialogOpened () {
      // 图片裁切器必须基于 img 进行初始化
      // img 必须是可见状态才能正常完成初始化

      // 获取图片 DOM
      const image = this.$refs.previewImage
      // 预览裁切的图片发生变化，裁切器默认不会更新
      // 如果想要预览图片发生变化后，更新裁切器图片
      //   方式1：裁切器.replace方法
      //   方式2：销毁裁切器，重新初始化
      // 初始化裁切器
      if (this.cropper) {
        this.cropper.replace(this.previewImage)
        return
      }
      this.cropper = new Cropper(image, {
        aspectRatio: 1,
        viewMode: 1,
        dragMode: 'none',
        cropBoxResizable: false
        // crop (event) {
        //   console.log(event.detail.x)
        //   console.log(event.detail.y)
        // }
      })
    },
    onDialogClosed () {
      // this.cropper.destroy()
    },
    onUpdatePhoto () {
      this.updatePhotoLoading = true
      // 获取裁剪的图片对象
      this.cropper.getCroppedCanvas().toBlob(file => {
        const fd = new FormData()
        fd.append('photo', file)
        updateUserPhoto(fd).then(res => {
          this.dialogVisible = false
          // this.loadUser()

          // 把服务器端返回的图片进行展示---慢
          // this.user.photo = res.data.data.photo

          // 直接把裁切结果的文件都西昂转为blob数据本地预览
          this.user.photo = window.URL.createObjectURL(file)

          this.updatePhotoLoading = false

          this.$message.success('更新头像成功')

          // 监听事件
          globalBus.$emit('updateUser', this.user)
        })
      })
    }
  }
}
</script>

<style scoped lang="less">
.preview-image-wrap{
  .preview-image{
    display: block;
    max-width: 100%;
  }
}
</style>
