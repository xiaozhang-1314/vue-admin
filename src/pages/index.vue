<template>
 <el-container class="index-con">
    <!-- 左侧 -->
    <el-aside :class="showclass">
      <leftnav></leftnav>
    </el-aside>
    <el-container class="main-con">
        <!-- 头部菜单 -->
      <el-header class="index-header">
        <navcon></navcon>
      </el-header>
      <el-main clss="index-main">
        <!-- 路由管理组件 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
  
</template>

<script>
import leftnav from '../components/leftnav.vue'//左侧
import navcon from '../components/navcon.vue'//头部
export default {
 name:"index",
 data(){
  return {
    showclass:'asideshow'
  }
 },
  // 注册组件
  components: {
    navcon,
    leftnav
  },
   created() {
    // 监听
    // this.$root.Bus.$on('toggle', value => {
    //   if (value) {
    //     this.showclass = 'asideshow'
    //   } else {
    //     setTimeout(() => {
    //       this.showclass = 'aside'
    //     }, 300)
    //   }
    // })
  },
}
</script>

<style>
.index-con {
  height: 100%;
  width: 100%;
  box-sizing: border-box;
}

.aside {
  width: 64px !important;
  height: 100%;
  background-color: #334157;
  margin: 0px;
}
.asideshow {
  width: 244px !important;
  height: 100vh;
  background-color: #334157;
  margin: 0px;
}
.index-header{
  height: 64px;
  padding: 0px;
  background-color: #334157;
}
.index-main{
    padding: 0;
    height: calc(100vh );
}
.main-con{
  height: 100vh;
}
</style>