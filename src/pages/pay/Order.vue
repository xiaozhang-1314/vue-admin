<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="用户管理"><headname></headname></el-tab-pane>
      <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
 import headname from "../pay/headname.vue"
 export default{
   name:"Order",
   data(){
      return {

      }
   },
   components:{headname}
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>