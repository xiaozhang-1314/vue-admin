
<template>
  <div>
   <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/goods/Goods' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>商品管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索筛选 -->
    <el-form :inline="true" :model="formInline" class="user-search">
        <el-form-item label="商品名称：">
          <el-input size="small"  v-model="formInline.deptName" placeholder="输入部门名称"></el-input>
        </el-form-item>
        <el-form-item label="商品代码：">
          <el-input size="small" v-model="formInline.deptNo"  placeholder="输入部门代码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" icon="el-icon-search" @click="search">搜索</el-button>
          <el-button size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
        </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="listData" :highlight-current-row="false"  v-loading="loading" border element-loading-text="拼命加载中" height="520px" style="width: 1200px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column align="center" label="操作" width="300">
        <template slot-scope="scope">
            <el-button size="mini" type="info" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="success" @click="examine(scope.$index, scope.row)"  v-if="scope.row.createBy=='lenovo-zhangrj5'">提交审核</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)" :disabled="scope.row.createBy!='lenovo-zhangrj5'">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column sortable prop="activityName" label="商品名称" width="100">
      </el-table-column>
      <el-table-column sortable prop="id" label="商品代码" width="280">
      </el-table-column>
      <el-table-column sortable prop="activityEndTimeStr" label="修改时间" width="200">
      </el-table-column>
      <el-table-column sortable prop="createBy" label="修改人" width="150">
      </el-table-column>
    </el-table>
    <Pagination :child-msg="pageparm" @callFather="callFather"></Pagination>

<!-- 弹框 -->
    <el-dialog :title="dialogform" :visible.sync="dialogFormVisible" width="620px">
      <el-form :model="form" :rules="rules" :inline="true" ref="form">
          <el-form-item label="商品名称" prop="deptName" >
            <el-input v-model="form.deptName" autocomplete="off" :disabled='itembled'></el-input>
          </el-form-item>
          <el-form-item label="商品代码" prop="deptNo">
            <el-input v-model="form.deptNo" autocomplete="off" :disabled="itembled"></el-input>
          </el-form-item>
          <el-form-item label="修改时间" prop="editTime">
            <!-- <el-input v-model="form.editTime" autocomplete="off"></el-input> -->
            <el-date-picker v-model="form.editTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="上传商品图片" style="display:block;">
                <el-upload
                  class="avatar-uploader"
                  :action="baseUrl + '/v1/addimg/shop'"
                  :show-file-list="false"
                  :on-success="handleServiceAvatarScucess"
                  :before-upload="beforeAvatarUpload">
                  <img v-if="form.catering_service_license_image" :src="baseImgPath + form.catering_service_license_image" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
          </el-form-item>
          <el-form-item>
            <h2 style="display: inline-block;">商品组：</h2>
            <el-button type="success" style="display: inline-block;" @click="tjBtn">添加</el-button>
            <el-table :data="activities" style="min-width: 600px;margin-bottom: 20px;" align="cneter"  :row-class-name="tableRowClassName">
              <el-table-column  prop="icon_name" label="活动标题" align="cneter" width="120"> </el-table-column>
                  <el-table-column prop="name" label="活动名称" align="cneter" width="120"></el-table-column>
                  <el-table-column prop="description" align="cneter" label="活动详情"></el-table-column>
                  <el-table-column label="操作"	width="120">
                  <template slot-scope="scope">
                      <el-button size="small" type="danger"
                        @click="handleDelete(scope.$index)" 
                        v-if="scope.row.icon_name!=''">删除</el-button>
                  </template>
                  </el-table-column>
            </el-table>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="headerBTN('form')">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="dialogform2" :visible.sync="dialogFormdescription" width="370px">
      <el-form :model="form2" :rules="rules" :inline="true" ref="form">
      <el-form-item label="活动标题" prop="icon_name" >
          <el-input v-model="form2.icon_name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="活动名称" prop="name" >
          <el-input v-model="form2.name" autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="活动信息" prop="description" >
          <el-input v-model="form2.description" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormdescription = false">取 消</el-button>
        <el-button type="primary" @click="elucBTN('form')">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {baseUrl, baseImgPath} from '../../core/comps/env.js'
import {deptSave,deptDelete,deptList}  from '../../api/userMG.js'
import Pagination from '../../components/Pagination.vue'
export default {
name:'Goods',
components:{
Pagination,
},
data(){
  return {
    handledata:true,
    baseUrl,
    baseImgPath,
    activities: [],
    pageparm: {
      currentPage: 1,
      pageSize: 10,
      total: 10
    },
    dialogform2:"添加商品",
    dialogform:'添加',
    formLabelWidth: '120px',
    form:{
      deptName:"",
      editTime:"",
      deptNo:"",
      catering_service_license_image:"",
    },
    form2:{
      icon_name: '',
      name: '',
      description: ''
    },
    listData: [], 
    loading: false, 
    itembled:false,
    dialogFormdescription:false,
    dialogFormVisible:false,
    formInline:{
      page: 1,
      deptName:"",
      deptNo:"",
    },
    editForm: {
      deptId: '',
      deptName: '',
      deptNo: '',
      token: localStorage.getItem('logintoken')
    },
    rules: {
        deptName: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        deptNo: [{ required: true, message: '请输入商品代码', trigger: 'blur' }],
        editTime: [{ required: true, message: '请输入修改时间', trigger: 'blur' }],
        icon_name:[{required:true,message:"请输入活动标题",trigger:'blur'}],
        name:[{required:true,message:"请输入活动名称",trigger:'blur'}],
        description:[{required:true,message:"请输入活动信息",trigger:'blur'}]
    }
  }
},
methods:{
      handleDelete(index){
              this.activities.splice(index, 1)
      },
      tableRowClassName(row, index) {
          if (index === 1) {
                  return 'info-row';
                } else if (index === 3) {
                  return 'positive-row';
                }
                return '';
      },
      handleServiceAvatarScucess(res, file) {
    console.log(res);
				if (res.status == 1) {
					this.form.catering_service_license_image = res.image_path;
				}else{
					this.$message.error('上传图片失败！');
				}
			},			
      beforeAvatarUpload(file) {
				const isRightType = (file.type === 'image/jpeg') || (file.type === 'image/png');
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isRightType) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isRightType && isLt2M;
			},
      tjBtn(){//添加
        this.dialogform2="添加商品",
        this.dialogFormdescription=true
        this.form2={
          icon_name: '',
          name: '',
          description: ''
        }
      },
      getdata(parameter) {// 获取公司列表
        this.loading = true
          // deptList(parameter)
          // .then(res => {
          //   console.log(res.data.data);
          //   if(res.data.status==200){
          //     this.listData=res.data.data.dataList
          //     this.pageparm.currentPage = res.data.data.curPage
          //     this.pageparm.pageSize = res.data.data.pageSize
          //     this.pageparm.total = res.data.data.count
          //     this.loading = false
          //   }
          // }).catch(err => {
          //     this.$message({
          //           type: 'info',
          //           message: '获取数据失败！'
          //         })
          // })
          let  data=[{activityName:"白夜行工作室",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20230306163748",createBy:"lenovo-zhangrj5",catering_service_license_image:"18764c43a79113995.png"},{activityName:"测试",activityEndTimeStr:"2013-02-09 09:17:40",id:"PF20221213155300",createBy:"lenovo-qing",catering_service_license_image:"18764c43a79113995.png"},{activityName:"白夜行工作室",activityEndTimeStr:"2023-04-07 09:17:40",id:"1",createBy:"lenovo-zhangrj5",catering_service_license_image:"18764c43a79113995.png"},{activityName:"测试一下",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF202212131599908",createBy:"lenovo-zhangrj6",catering_service_license_image:"18764c43a79113995.png"},{activityName:"很好的名字",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20201213155999",createBy:"lenovo-zhangrj5"},{activityName:"测测数据",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20001213155329",createBy:"lenovo-zhangrj5"},{activityName:"联想商城",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20216213155366",createBy:"lenovo-zhangrj5"},{activityName:"天天联想",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20222613135389",createBy:"lenovo-zhangrj5"},{activityName:"联想在线",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20222613135389",createBy:"lenovo-zhangrj5"},{activityName:"联想有礼",activityEndTimeStr:"2023-04-07 09:17:40",id:"PF20222613135389",createBy:"lenovo-zhangrj5"},]
          this.listData = data
          this.loading = false
      },
      search(){
        this.getdata(this.formInline)
      },
      handleEdit(index,row){//编辑
      this.dialogFormVisible = true
      if(row == 'undefined' || row == undefined){
        this.dialogform='添加'
        this.itembled=false
        this.form={
          deptName:'',
          editTime:'',
          deptNo:'',
          catering_service_license_image:''
        }
      }else{
          this.dialogform='编辑'
          this.itembled=true
          this.form={
              deptName:row.activityName,
              editTime:row.activityEndTimeStr,
              deptNo:row.id,
              catering_service_license_image:row.catering_service_license_image
          } 
      }
      },
      elucBTN(form){
      this.$refs[form].validate(valid => {
        if(valid){
          let appObj = {
            icon_name: this.form.icon_name,
            name: this.form.name,
            description: this.form.description,
          }
          this.activities.push(appObj)
          this.dialogFormdescription=false
        }else{
          this.$message({
            type: 'info',
            message: '商品添加失败！'
          })
        }
      })
      },
      headerBTN(form){//确定
        this.$refs[form].validate(valid => {
          if(valid){
            if(this.dialogform=='添加'){
              deptSave(this.form).then(r => {
                this.dialogFormVisible = true
                if(r.success==200){
                    this.search()
                    this.$message({
                      type: 'success',
                      message: '商品添加成功！'
                    })
                }else{
                  this.$message({
                      type: 'info',
                      message: '商品添加失败！'
                    })
                }
              })
            }else if(this.dialogform=="编辑"){
              console.log(form);
              let params = {
                deptNo:this.form.deptNo
              }
              deptSave(params).then(r => {
                this.dialogFormVisible = true
                if(r.success==200){
                    this.search()
                    this.$message({
                      type: 'success',
                      message: '商品编辑成功！'
                    })
                }else{
                  this.$message({
                      type: 'info',
                      message: '商品编辑失败！'
                    })
                }
              })
            }
          }else{
            return false
          }
        })
      },
      deleteUser(index,row){
        this.$confirm(`此操作将永久删除商品id为${row.id}文件, 是否继续?`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deptDelete(row.deptId).then(r =>{
                if(r.success==200){
                  this.$message({
                    type: 'success',
                    message: '删除成功!'
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
      },    
      callFather(parm) {// 分页插件事件
        console.log(parm,'EEEEEEEEEEEE');
        this.formInline.pageSize = parm.currentPage
        this.formInline.limit = parm.currentPage
        this.getdata(this.formInline)
      },
      examine(index,row){
        this.$confirm(`${row.activityName}的商品id为${row.id}提交审核！`, '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              deptDelete(row.deptId).then(r =>{
                if(r.success==200){
                  this.$message({
                    type: 'success',
                    message: '提交审核成功!'
                  });
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消提交审核'
              });          
            });
      }
},
  created() {
    this.getdata(this.formInline)
  },
}
</script>

<style lang="less" scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	}
	.avatar-uploader .el-upload:hover {
	    border-color: #20a0ff;
	}
	.avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 120px;
	    height: 120px;
	    line-height: 120px;
	    text-align: center;
	}
	.avatar {
	    width: 120px;
	    height: 120px;
	    display: block;
	}
  .el-table .info-row {
	    background: #c9e5f5;
	}
</style>
