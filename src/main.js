// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router/index.js';
import axios from 'axios';
Vue.prototype.$axios = axios;
import ElementUI from 'element-ui'; //引入js
import 'element-ui/lib/theme-chalk/index.css';//引入css
import * as custom from './utils/util'

Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
import VueCoreInstance from "./core/tool/vue-install";//封装请求

import store from "./store/index.js";
Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(ElementUI);
Vue.use(VueCoreInstance);

router.afterEach(function(to, from, next){
  let s = store.state;
});
// 路由拦截器
// router.beforeEach((to, from, next) => {
//   if (to.matched.length != 0) {
//       if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
//           if (Boolean(localStorage.getItem("userid"))) { // 通过vuex state获取当前的user是否存在
//               next();
//           } else {
//               next({
//                   path: '/goods/Goods',
//                   query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//               })
//           }
//       } else {
//           if (Boolean(localStorage.getItem("userid"))) { // 判断是否登录
//               if (to.path != "/" && to.path != "/login") { //判断是否要跳到登录界面
//                   next();
//               } else {
//                   /**
//                    * 防刷新，如果登录，修改路由跳转到登录页面，修改路由为登录后的首页 
//                    */
//                   next({
//                       path: '/goods/Goods'
//                   })
//               }
//           } else {
//               next();
//           }
//       }
//   } else {
//       next({
//           path: '/goods/Goods',
//           query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
//       })
//   }
// })

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  data: {
    // 空的实例放到根组件下，所有的子组件都能调用
    Bus: new Vue()
}
})
