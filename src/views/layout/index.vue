<template>
  <el-container class="layoutContainer">
    <el-aside width="auto">
      <myAside class="asideMenu"
               :is-collapse="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header>
        <div>
          <i
            :class="{ 'el-icon-s-fold': isCollapse,'el-icon-s-unfold': !isCollapse}"
            @click="isCollapse = !isCollapse"></i>
          <span>1810609114</span>
        </div>
        <el-dropdown>
          <div class="avatarWrap">
            <img class="avatar" :src="user.photo" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>

import myAside from '@/views/layout/components/myaside'
import { getUserProfile } from '@/api/user'

export default {
  name: 'layoutIndex',
  components: { myAside },
  props: [
  ],
  data () {
    return {
      user: {
        name: '',
        photo: ''
      },
      isCollapse: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        console.log(res)
        this.user = res.data.data
        console.log(this.user.name)
      })
    },
    onLogout: function () {
      this.$confirm('确认退出吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }

}
</script>

<style scoped lang="less">
.layoutContainer{
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.el-aside{
  background-color: lightgreen;
  .asideMenu{
    height: 100%;
  }
}
.el-header{
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
}
.el-main{
  background-color: lightgray;
}
.avatarWrap{
  display: flex;
  align-items: center;
  .avatar{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
