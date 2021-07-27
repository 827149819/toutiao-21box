<template>
 <div class="publishContainer">
   <el-card style="width: 800px">
     <div slot="header" class="clearfix">
       <el-breadcrumb separator-class="el-icon-arrow-right">
         <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
         <el-breadcrumb-item>{{ $route.query.id ? '修改文章' : '发布文章' }}</el-breadcrumb-item>
       </el-breadcrumb>
     </div>
     <el-form ref="publishFormRef" :model="article"
              label-width="60px" :rules="formRules">
       <el-form-item label="标题" prop="title">
         <el-input v-model="article.title"></el-input>
       </el-form-item>
       <el-form-item label="内容" prop="content">
         <el-tiptap v-model="article.content" :extensions="extensions" height="350" placeholder="请输入文章内容"></el-tiptap>
       </el-form-item>
       <el-form-item label="封面">
         <el-radio-group v-model="article.cover.type">
           <el-radio :label="1">单图</el-radio>
           <el-radio :label="3">三图</el-radio>
           <el-radio :label="0">无图</el-radio>
           <el-radio :label="-1">自动</el-radio>
         </el-radio-group>
         <!--$event：事件本身的参数-->
         <template v-if="article.cover.type > 0">
           <upload-cover
             v-for="(cover, index) in article.cover.type"
             :key="cover"
             :cover-image="article.cover.images[index]"
             @uploadCover="onUploadCover(index, $event)"
           />
         </template>
       </el-form-item>
       <el-form-item label="频道" prop="channel_id">
         <el-select v-model="article.channel_id" placeholder="请选择频道">
           <el-option
             :label="channel.name"
             :value="channel.id"
             v-for="(channel, index) in channels"
             :key="index"
           ></el-option>
         </el-select>
       </el-form-item>
       <el-form-item>
         <el-button type="primary" @click="onPublish()">发表</el-button>
         <el-button @click="onPublish(true)" :disabled="$route.query.id ? true : false">存入草稿</el-button>
       </el-form-item>
     </el-form>
   </el-card>
 </div>
</template>

<script>
import { getArticleChannels, addArticle, getArticle, updArticle } from '@/api/article'
import { uploadImage } from '@/api/image'
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  Image,
  HorizontalRule,
  TodoItem,
  TodoList,
  Fullscreen,
  Preview,
  TextColor,
  ElementTiptapPlugin
} from 'element-tiptap'
import 'element-tiptap/lib/index.css'
import Vue from 'vue'
import uploadCover from '@/views/publish/components/uploadCover'
Vue.use(ElementTiptapPlugin, {
  lang: 'zh'
})
export default {
  name: 'publishIndex',
  components: {
    'el-tiptap': ElementTiptap,
    uploadCover
  },
  props: {},
  data () {
    return {
      article: {
        title: '',
        content: '',
        cover: {
          type: 0,
          images: []
        },
        channel_id: null
      },
      channels: [],
      // 编辑器的 extensions
      // 他们将会按照你生命的顺序被添加到菜单栏和气泡菜单中
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 5 }),
        new Bold({ bubble: true }),
        new TextColor(),
        new Image({
          // 自定义图片上传,避免base64
          uploadRequest (file) {
            const fd = new FormData()
            fd.append('image', file)
            return uploadImage(fd).then(res => {
              return res.data.data.url
            })
          }
        }),
        new Underline(),
        new Italic(),
        new Strike(),
        new HorizontalRule(),
        new ListItem(),
        new BulletList(),
        new OrderedList(),
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview()
      ],
      formRules: {
        title: [
          { required: true, message: '请输入文章标题', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        content: [
          // { required: true, message: '请输入文章标题', trigger: 'change' }
          {
            validator (rule, value, callback) {
              if (value === '<p></p>') {
                callback(new Error('请输入文章内容'))
              } else {
                callback()
              }
            }
          },
          { required: true, message: '请输入文章内容', trigger: 'blur' }
        ],
        channel_id: [
          { required: true, message: '请选择文章频道', trigger: 'change' }
        ]
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()

    if (this.$route.query.id) {
      this.loadArticle()
    }
  },
  mounted () {},
  methods: {
    onPublish (draft = false) {
      this.$refs.publishFormRef.validate(valid => {
        // 表单验证失败
        if (!valid) {
          return
        }
        // 表单验证通过
        if (this.$route.query.id) {
          updArticle(this.$route.query.id, this.article, draft).then(res => {
            this.$message.success('修改文章成功')
            this.$router.push('/article')
          })
        } else {
          addArticle(this.article, draft).then(res => {
            console.log(this.article)
            this.$message.success(`${draft ? '存入草稿' : '发布文章'}成功`)
            this.$router.push('/article')
          })
        }
      })
    },
    loadChannels () {
      getArticleChannels().then(res => {
        this.channels = res.data.data.channels
      })
    },
    loadArticle () {
      getArticle(this.$route.query.id).then(res => {
        console.log(res)
        this.article = res.data.data
      })
    },
    onUploadCover (index, url) {
      console.log(url)
      this.article.cover.images[index] = url
    }
  }
}
</script>

<style scoped>
</style>
