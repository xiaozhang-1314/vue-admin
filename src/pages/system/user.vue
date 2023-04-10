<template>
  <div class="search-dv" style = "min-width:1200px;">   
      <el-container >
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/goods/Goods' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>用户管理</el-breadcrumb-item>
          </el-breadcrumb>
    <!-- 搜索 -->
        <el-form :inline="true" :model="formInline" class="demo-ruleForm" >
          <div  class="oper-box" >
                <el-form-item label="活动名称：" >
                    <el-input size="small"  v-model="formInline.activityName" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="活动ID：">
                    <el-input size="small" v-model="formInline.activityCode"  placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="奖励类型：">
                    <el-select v-model="formInline.rewardType" placeholder="请选择">
                        <el-option v-for="type in paydataList.rewardType" :label="type.key" :value="type.value" :key="type.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="助力条件：">
                    <el-select v-model="formInline.helpCondition" placeholder="请选择">
                        <el-option v-for="type in paydataList.helpCondType" :label="type.key" :value="type.value" :key="type.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="审核状态：">
                    <el-select v-model="formInline.status" placeholder="请选择">
                        <el-option v-for="type in paydataList.statusType" :label="type.key" :value="type.value" :key="type.value"></el-option>
                    </el-select>
                </el-form-item>
        <div>
        </div>
          </div>
          <el-form-item >
            <el-button size="small" type="primary" icon="el-icon-search" @click="search">查询</el-button>
            <el-button size="small" type="success" icon="el-icon-plus" @click="plussearch">新建</el-button>
          </el-form-item>

          <!-- 列表数据 -->
      <el-table size="small" :data="listData" :highlight-current-row="false" v-loading="loading" border  element-loading-text="拼命加载中" height="450px" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
        <el-table-column align="center" label="操作" width="350">
      <template slot-scope="scope">
          <el-button size="mini" type="warning" @click="handleEdit(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="dangerUser(scope.$index, scope.row)">复制</el-button>
          <el-button size="mini" type="info" @click="infoeUser(scope.$index, scope.row)">详情</el-button>
          <el-button size="mini" type="primary" @click="primaryUser(scope.$index, scope.row)">提交审核</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable prop="shopID" label="商城" width="100" :formatter="shopData">
      </el-table-column>
      <el-table-column sortable prop="activityName" label="活动名称" width="100">
      </el-table-column>
      <el-table-column sortable prop="iD" label="地址配置" width="200">
      </el-table-column>
      <el-table-column sortable prop="activityCode" label="活动ID" width="100">
      </el-table-column>
      <el-table-column sortable prop="status" label="审核状态" width="100"  :formatter="logisticData">
      </el-table-column>
      <el-table-column sortable prop="rewardType" label="奖励类型" width="100" :formatter="rewardData">
      </el-table-column>
      <el-table-column sortable prop="helpCondition" label="助力条件" width="200" :formatter="helpCondData">
      </el-table-column>
      <el-table-column sortable prop="total" label="总量" width="200">
      </el-table-column>
      <el-table-column sortable prop="teamMember" label="成团人数" width="200">
      </el-table-column>
      <el-table-column sortable prop="activityStartTime" label="活动开始时间" width="200">
      </el-table-column>
      <el-table-column sortable prop="activityEndTime" label="结束开始时间" width="200">
      </el-table-column>
      <el-table-column sortable prop="updateBy" label="操作人" width="200">
      </el-table-column>
      </el-table>
          <!-- 分页组件 -->
    <!-- <Pagination v-bind:child-msg="pageparm" @callFather="callFather"></Pagination> -->
        </el-form>
        </el-main>
      </el-container> 
  </div>
</template>

<script>
import KEYS from "../../constant/index.js";
// import Pagination from '../../components/Pagination.vue'
import {GetPage} from "../../api/userMG.js"
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('user_list');
export default {
  name:"",
    // 注册组件
  // components: {
  //   Pagination
  // },
  computed:{
    ...mapState(['paydataList'])
  },
  data(){
    return{
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      loading:false,
      listData:[],//列表数据
      formInline:{
        activityName:"",
        activityCode:"",
        rewardType:"",
        helpCondition:"",
        status:""
      },
    }
  },
  methods:{
       ...mapActions(["getPrizeList"]),
       search(){//查询
         //  this.getdata(this.formInline)
       },
       plussearch(){//新建
          this.$router.push({
        path: "/system/seva",
        query: {
          tag: KEYS.GOLBAL.ACTION.CREATE,
          route: "user",
        },
      });
       },
       handleEdit(index,row){//修改
        console.log(row);

       },
       dangerUser(index,row){//复制
         
       },
       infoeUser(index,row){//详情
        console.log(row);
       },
       primaryUser(index,row){

       },
       logisticData(row){
        let _par = ''
        this.paydataList.statusType.forEach(e =>{
          if(row.status==e.value){
            _par = e.key
          }
        })
        return _par
       },
       rewardData(row){
        let _par = ""
        this.paydataList.rewardType.forEach(e => {
          if(row.rewardType==e.value){
            _par = e.key
          }
        })
        return _par
       },
       helpCondData(row){
        let _par = ""
        this.paydataList.helpCondType.forEach(e =>{
          if(row.helpCondition==e.value){
            _par = e.key
          }
        })
        return _par
       },
      shopData(row){
          let _par = ""
          this.paydataList.shopType.forEach(e => {
            if(row.shopID==e.value){
              _par = e.key
            }
          })
          return _par
      },
          
  },
  mounted(){
    
   this.getPrizeList
   GetPage().then(r => {
      let res = r.data.data
      if(res.status==0){
        this.loading=false
        this.listData=res.dataList
      }
  })
  },
  /**
   * 创建完毕
   */
  created() {
    
  },
}
</script>

<style>

</style>