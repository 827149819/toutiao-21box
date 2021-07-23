/**
 * 项目的启动入口
 * */

import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import './styles/index.less'

import JSONbig from 'json-bigint'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(JSONbig)

// 创建 Vue 根实例
// 把router配置到根实例中
// 通过render方法把App根组件渲染到 #app 入口节点
new Vue({
  router,
  render: h => h(App)
  // el:‘#app’ 等价于 $mount('#app')
}).$mount('#app')
