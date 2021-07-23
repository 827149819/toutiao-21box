<template>
  <div class="login-container">
    <el-form :rules="myRules" ref="loginForm" :model="loginForm" class="loginContainer">
      <h3 class="loginTitle">系统登录</h3>
      <el-form-item prop="mobile">
        <el-input auto-complete="false" v-model="loginForm.mobile" type="text" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="code">
        <el-input type="password" auto-complete="false" v-model="loginForm.code" placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item prop="agree">
        <el-checkbox v-model="loginForm.agree" class="loginRemember">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button :loading="loginLoading" type="primary" style="width: 100%;" @click="submitLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        mobile: '13911111111',
        code: '246810',
        agree: false
      },
      loginLoading: false,
      myRules: {
        mobile: [{ required: true, message: '请输入电话号码', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式' }
        ],
        code: [{ required: true, message: '请输入验证码', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码格式' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    async submitLogin () {
      await this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.login()
        } else {
          this.$message.error('验证未通过！')
          return false
        }
      })
    },
    login () {
      // 获取表单数据 (根据接口要求绑定数据)
      const user = this.loginForm
      this.loginLoading = true
      login(user).then(res => {
        // console.log(res)
        this.$message.success('登录成功')
        this.loginLoading = false
        // 如果需要存储对象、数组类型的数据。则把他们转化为JSON格式字符串进行存储
        window.localStorage.setItem('user', JSON.stringify(res.data.data))
        this.$router.push('/')
      }).catch(err => {
        console.log('登录失败！', err)
        this.$message.error('登录失败，手机号或验证码错误！')
        this.loginLoading = false
      })
    }
  }
}
</script>

<style scoped>
.login-container{
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("./login_bg.jpg") no-repeat;
  background-size:100% 100%;
}
.loginContainer{
  width: 350px;
  border-radius: 15px;
  background-clip: padding-box;
  margin: 100px auto;
  padding: 15px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.loginTitle{
  margin: 8px auto 40px auto;
  text-align: center;
}
.loginRemember{
  text-align: left;
  margin: 8px 8px 0 8px;
}
</style>
