<template>
  <el-menu
    class="navMenu"
    default-active="/"
    background-color="#002033"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    :collapse="isCollapse">
    <div class="asideTitle">
      <img src="../../../assets/logo.png" width="30px" height="30px" alt="logo">
      <span>toutiao_M</span>
    </div>
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span slot="title">首页</span>
    </el-menu-item>
    <el-menu-item index="/article">
      <i class="el-icon-document"></i>
      <span slot="title">内容管理</span>
    </el-menu-item>
    <el-menu-item index="/image">
      <i class="iconfont icon-image"></i>
      <span slot="title">素材管理</span>
    </el-menu-item>
    <el-menu-item index="/publish">
      <i class="iconfont icon-publish"></i>
      <span slot="title">发布文章</span>
    </el-menu-item>
    <el-menu-item index="/comment">
      <i class="el-icon-s-comment"></i>
      <span slot="title">评论管理</span>
    </el-menu-item>
    <el-menu-item index="/fans">
      <i class="iconfont icon-fans"></i>
      <span slot="title">粉丝管理</span>
    </el-menu-item>
    <el-menu-item index="/settings">
      <i class="el-icon-setting"></i>
      <span slot="title">个人设置</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  name: 'myaside',
  components: {},
  props: [
    'is-collapse'
  ],
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  method: {}
}
</script>

<style scoped lang="less">
.asideTitle{
  font-style: oblique;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  img{
    padding-top: 5px;
    padding-left: 5px;
  }
}
.navMenu{
  .iconfont{
    margin-right: 7px;
    padding-left: 5px;
  }
}
</style>
