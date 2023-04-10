<template>
  <el-menu class="el-menu-demo" mode="horizontal" background-color="#334157" text-color="#fff" active-text-color="#fff">
    <el-submenu index="1" class="submenu">
      <template slot="title">{{lastname}}</template>
      <el-menu-item @click="exit()" index="2">退出</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
name:'leftnav',
data(){
  return {
      collapsed: true,
      lastname: window.sessionStorage.getItem("token")
      // imgshow: require('../assets/img/show.png'),
      // imgsq: require('../assets/img/sq.png'),
    //  user:getCookie("userid")
  }
},
methods:{
     getCookie(name) {
      let cookie = document.cookie;
      let cookieName = encodeURIComponent(name) + "=",
        cookieStart = cookie.indexOf(cookieName),
        cookieValue = null;
      if (cookieStart > -1) {
        let cookieEnd = cookie.indexOf(";", cookieStart);
        if (cookieEnd == -1) {
          cookieEnd = cookie.length;
        }
        cookieValue = decodeURIComponent(
          cookie.substring(cookieStart + cookieName.length, cookieEnd)
        );
      }
      return cookieValue;
    },
    exit(){//退出
       this.$confirm('退出登录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setTimeout(() => {
            this.$store.commit('logout', 'false')
            this.$router.push({ path: '/' })
            this.$message({
              type: 'success',
              message: '已退出登录!'
            })
          }, 1000)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          })
        })
    },
    // toggle(showtype){
    //   this.collapsed = !showtype
    //   this.$root.Bus.$emit('toggle', this.collapsed)
    // }
},
  // 创建完毕状态(里面是操作)
  created() {
    this.getCookie("userid")
  },
}
</script>

<style scoped>
.el-menu-demo{
  float:right;
  width: 220px;
}

</style>