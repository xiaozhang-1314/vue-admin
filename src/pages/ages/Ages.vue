<template>
  <div class="user-search">
      <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/goods/Goods' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      </el-breadcrumb>
    <!-- 搜索 -->
    <el-form :inline="true" :model="formInline" class="demo-ruleForm" label-position="left">
      <div  class="oper-box" style="">
          <el-form-item label="商品编号：" >
            <el-input size="small"  v-model="formInline.deptName" placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="物料编号：">
            <el-input size="small" v-model="formInline.id"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="商品名称：">
          <el-input size="small" v-model="formInline.deptNo"  placeholder="请输入"></el-input>
          </el-form-item>
          <el-form-item label="活动区域：">
            <el-select v-model="formInline.region" placeholder="请选择">
              <el-option v-for="(item,index) in payType" :label="item.key" :value="item.value" :key="index"></el-option>
            </el-select>
          </el-form-item>
     <div>
     </div>
      </div>
      <el-form-item >
        <el-button size="small" type="primary" icon="el-icon-edit" @click="search">查询</el-button>
        <el-button size="small" type="primary" icon="el-icon-edit" @click="resetForm">重置</el-button>
        <el-button size="small" type="success" icon="el-icon-check" @click="newbuilt">新建</el-button>
        <el-button size="small" type="warning" icon="el-icon-edit" @click.stop="handleEdit(true)">修改</el-button>
        <el-button size="small" type="danger" icon="el-icon-delete-solid" @click="deupleEdit(1)">删除</el-button>
        <el-button size="small" type="info" icon="el-icon-message" @click="handleEdit(false)">详情</el-button>
        <el-button size="small" type="primary" icon="el-icon-success" @click="deupleEdit(2)">启用</el-button>
        <el-button size="small" type="success" icon="el-icon-remove" @click="deupleEdit(3)">停用</el-button>
        <el-button size="small" type="warning" icon="el-icon-upload" @click="exportTable()">导出</el-button>
        <el-button size="small" type="warning" icon="el-icon-upload" @click="exporttoTable()">导入</el-button>
      </el-form-item>
      <!-- <table-list ref="luckyDrawTable" :options="optionsTable" class="bgcheid"></table-list> -->
      <el-table size="small" :data="listsdata" ref="luckyDrawTable" :highlight-current-row="false" v-loading="loading" border element-loading-text="拼命加载中" height="420px" style="width: 1200px;" @selection-change="handleSelectionChange">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="name" label="活动名称" width="150">
      </el-table-column>
      <el-table-column sortable prop="id" label="物料编号" width="100">
      </el-table-column>
      <el-table-column sortable prop="fullPayGoodsPic" label="商品图片" width="90">
        <template slot-scope="scope">
          <img :src="scope.row.fullPayGoodsPic" height="50px" width="50px" />
        </template>
      </el-table-column>
      <el-table-column sortable prop="crowdGoodsName" label="商品名称" width="150">
      </el-table-column>
      <el-table-column sortable prop="targetAmount.cent" label="购买价" width="150">
      </el-table-column>
      <el-table-column sortable prop="crowdAmount.centFactor" label="运费" width="150" >
      </el-table-column>
      <el-table-column sortable prop="bussinessFinish" label="商城" width="150" :formatter="lenovofrom">
      </el-table-column>
      <el-table-column sortable prop="careNum" label="购买平台" width="150">
      </el-table-column>
      <el-table-column sortable prop="faname" label="返现" width="150" :formatter="appfromnum">
      </el-table-column>
      <el-table-column sortable prop="status" label="状态" width="150" :formatter="logisticData">
      </el-table-column>
      <el-table-column sortable prop="createTime" label="开始时间" width="150">
      </el-table-column>
      <el-table-column sortable prop="eDeliveryTime" label="结束时间" width="150">
      </el-table-column> 
      <el-table-column sortable prop="updateBy" label="操作人" width="150">
      </el-table-column>     
      </el-table>
    <Pagination :child-msg="pageparm" @callFather="callFather"></Pagination>
    </el-form>
    <!-- 新建 -->
     <el-dialog :title="title" :visible.sync="editFormVisible"  width="50%"  @click="editFormVisible=false" class="addDialog chanel-dialog">

        <el-form label-width="100px" :model="editForm" :rules="rules" ref="editForm">
          <el-row class="layout-content dialog-content text-left">
            <el-col :span="18">
            <el-form-item label="购买平台：" style="width:100%;">
                <el-checkbox-group v-model="editForm.floorNumber" prop="floorNumber">
                  <el-checkbox v-for='type in classify' :label='type.key' :value="type.key" :key="type.vlaue" :disabled="bthShow">
                  </el-checkbox>
                </el-checkbox-group>
          </el-form-item>

            </el-col>
          <el-col :span="15">
            <el-form-item label="商品名称：" prop="gname">
              <el-input size="small" v-model="editForm.gname" auto-complete="off" placeholder="请输入商品名称" :disabled="bthShow"></el-input>
            </el-form-item>
            <el-form-item label="商品编码：" prop="deptName">
              <el-input size="small" v-model="editForm.deptName" auto-complete="off" placeholder="请输入商品编码" :disabled="bthShow"></el-input>
            </el-form-item>
            <el-form-item label="商品排序：" prop="deptNo">
              <el-input size="small" v-model="editForm.deptNo" auto-complete="off" placeholder="请输入商品排序" :disabled="bthShow"></el-input>
            </el-form-item>
           <el-form-item label="开始时间：" prop="eDeliveryTime">
                <el-date-picker v-model="editForm.eDeliveryTime" type="datetime" placeholder="选择日期时间" :disabled="bthShow">
                </el-date-picker>
           </el-form-item>
           <el-form-item label="结束时间：" prop="updatetime">
            <el-date-picker v-model="editForm.updatetime" type="datetime" placeholder="选择日期时间" :disabled="bthShow">
           </el-date-picker>
           </el-form-item>
           
                <!-- 
            <el-form-item label="商品图片：" prop="picture">
              <el-upload  action="/api/file/img/upload" :limit='1' list-type="picture-card" ref="refUpload" name="file"
                accept="jpeg,png,jpg" :on-preview="handlePictureCardPreview" :on-remove="handleRemove" v-model="editForm.picture"
               :on-success="handleimg"  :disabled="bthShow">
                <el-icon >  <Plus />  </el-icon>
                <template #tip>
                  <span class="el-upload__tip"  :disabled="bthShow">只能传jpg/png/jpeg文件</span>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="上传文件：" prop="uploadlist">
            <el-upload
                action="/api/file/img/upload"
                :multiple="false"
                name="files"
                ref="upload"
                v-model="editForm.uploadlist"
                :file-list="fileList"
                :on-preview="handlePreview"
                :on-success="handleSuccess"
                :before-upload ="beforeUpload"
                :http-request="httpRequest"
                :on-exceed="handleExceed"
                :on-change="handleChanged"
                accept=".csv,.xls,.xlsx"
                :auto-upload="false"
                :disabled="bthShow"
                >
            <el-button slot="trigger" size="small" type="primary" :disabled="bthShow">选取文件</el-button>
            <span slot="tip" class="el-upload__tip">只能上传csv/xslx/xsl文件</span>
            </el-upload>
            </el-form-item>
             -->   
            <el-form-item label="活动形式" prop="desclist">
              <el-input type="textarea" v-model="editForm.desclist" :disabled="bthShow"></el-input>
            </el-form-item>
            </el-col>
          </el-row>            
          <span class="dialog-footer">
            <el-button size="small" @click="editFormVisible=false" >取消</el-button>
            <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
          </span>
        </el-form>

     </el-dialog>
     <el-dialog title = "导入表格" :visible.sync="dialogVis" style="text-align:left">
             <file-upload ref="pcImgSrc" :options="uploadTableOption"></file-upload> 
             <el-row style="color:#f55;top:20px">注：仅能导入xlsx文件</el-row>
    </el-dialog>
  </div>
</template>
<script>
 import FileUpload from "../../core/comps/upload/upload.vue";
import Pagination from '../../components/Pagination.vue'
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('Ages_list');
import listData from './data.js'
import TableList from "../../core/comps/table/tableList.vue";
import { OrderList, Appmanage, deleteProduct } from "../../api/userMG.js";
export default {
  name: "Ages",
  components: { TableList,Pagination,FileUpload },
  data() {
    return {
      uploadTableOption:{
                vtype:"xlsx",
                size:"100",
                fname:"file",
                fhide:true,
                // completedCallback:this.imgCb,
                url:'/cmsex/store/import',
                analysis:(d)=>{
                    if(d.data.status!=200){
                        this.alert.showAlert("error",d.data.msg);
                    }else{
                        this.dialogVis = false;
                        this.alert.showAlert("success","导入成功");
                    }
                }
      },
      multipleSelection:[],
      luckyDrawTable:"sk",
      dialogVis:false,
      bthShow: false,
      optionsTable: {//封装列表
        showCk: true,
        map: [
          { key: "gcode", val: "商品编码" },
          { key: "id", val: "物料编号" },
          { key: "activityEndTimeStr", val: "排序" },
          { key: "activityCycle", val: "分组" },
          { key: "gname", val: "商品名称" },
          { key: "floorNumber", val: "购买价" },
          { key: "acsNumber", val: "运费" },
          { key: "malltype", val: "商城" },
          { key: "activeid", val: "购买平台" },
          { key: "faname", val: "收货公司" },
          { key: "status", val: "状态", convert: this.fromstatus },
          { key: "createtime", val: "开始时间" },
          { key: "updatetime", val: "结束平台" },
        ],
        getUrl: () => {
          return `/openapi/lenovo.floorPirce.query?deptName=${this.formInline.deptName}`;
        },
        pageOption: {
          sizeKey: "pageSize",
          indexKey: "pageNum",
          index: 1,
          size: 10,
        },
        analysis: (data) => {
          if (!data || !data.data) return { data: [], count: 0 };
          return {
            data: data.data.datas,
            count: data.data.totalCount,
          };
        },
      },
      pageparm: {
      currentPage: 1,
      pageSize: 10,
      total: 10
      },
      fileList: [], //上传文件
      imageUrl: "", //上传图片
      dialogVisible: false,
      fileData: {
      },
      listData:listData.data.data, //分页
      listsdata:listData.data.data.t.datas,//数据
      loading: false, //加载
      editFormVisible: false, //弹窗
      editForm: {
        gname: "",
        deptName: "",
        deptNo: "",
        floorNumber: [],
        giftphoto: [],
        picture: "",
        uploadlist: "",
        eDeliveryTime: "",
        updatetime: "",
        desclist: "",
      },
      title: "",
      rules: {
        deptName: [
          { required: true, message: "请输入部门名称", trigger: "blur" },
        ],
        gname: [{ required: true, message: "请输入商品名称", trigger: "blur" }],
        deptNo: [
          { required: true, message: "请输入商品排序", trigger: "blur" },
        ],
        deptName2: [{ required: true, message: "请输入分组", trigger: "blur" }],
        picture: [{ required: true, message: "请传入图片", trigger: "blur" }],
        uploadlist: [
          { required: true, message: "请传入文件", trigger: "blur" },
        ],
        endtime: [
          { required: true, message: "请传入开始时间", trigger: "blur" },
        ],
        updatetime: [
          { required: true, message: "请传入结束时间", trigger: "blur" },
        ],
      },
      formInline: {
        //筛选
        region: "",
        deptName: "",
        deptNo: "",
        id: "",
        activityCycle: "",
      },
      payType: [
        { key: "联想商城", value: 1 },
        { key: "Think商城", value: 2 },
      ],
      corporation: [
        { key: "北京凯迪隆有限公司", value: 1 },
        { key: "北京德祐有限公司", value: 2 },
      ],
      statusdata: [
        { key: "全部", value: 1 },
        { key: "新建", value: 2 },
        { key: "启用", value: 3 },
        { key: "停用", value: 4 },
      ],
      activitytype: [
        { key: "0元购", value: 1 },
        { key: "正常购买", value: 2 },
      ],
      classify: [
        { key: "WAP", value: 1 },
        { key: "APP", value: 2 },
        { key: "小程序", value: 3 },
        { key: "通用", value: 4 },
      ],
    };
  },
  computed:{
    ...mapState(['paydataList'])
  },
  methods: {
    exporttoTable(){
       this.dialogVis=true
    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    },
    resetForm(){
      this.formInline= {
        //筛选
        region: "",
        deptName: "",
        deptNo: "",
        id: "",
        activityCycle: "",
      }
    },
    exportTable() {
      //导出
      if (this.multipleSelection.length == 0) {
        window.location = `api/comment/comment/newMessageAskBack/exportMsgAskClient`;
      }
      if (this.multipleSelection.length != 0) {
        let _id = [];
        this.multipleSelection.forEach((ite) => {
          _id.push(ite.id);
        });
        window.location = `api/comment/comment/newMessageAskBack/exportMsgAskClient?id=${_id.join(
          ","
        )}`;
      }
    },
    deupleEdit(type) {
      let items = this.multipleSelection
      console.log(items);
      if (items.length != 1) {
        return this.$message.error("请选择一条数据进行操作！");
      }
      let params = {
        id: items[0].id,
      };
      if (type == "1") {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            deleteProduct(params).then((r) => {
              if (r.success == true) {
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              } else {
                this.$message({
                  type: "info",
                  message: "删除失败",
                });
              }
            });
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除",
            });
          });
      }
      if (type == "2") {
        this.$confirm("此操作将启用状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            deleteProduct(params).then((r) => {
              if (r.success == true) {
                this.$message({
                  type: "success",
                  message: "启用成功!",
                });
              } else {
                this.$message({
                  type: "info",
                  message: "启用失败",
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消启用",
            });
          });
      }
      if (type == "3") {
        this.$confirm("此操作将停用状态, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }).then(() => {
            deleteProduct(params).then((r) => {
              if (r.success == true) {
                this.$message({
                  type: "success",
                  message: "停用成功!",
                });
              } else {
                this.$message({
                  type: "info",
                  message: "停用失败",
                });
              }
            });
          }).catch(() => {
            this.$message({
              type: "info",
              message: "已取消停用",
            });
          });
      }
    },
    handleChanged(file, fileList) {
      this.editForm.uploadlist = fileList;
    },
    handleExceed(file, fileList) {
      console.log(file);
    },
    handleSuccess(res, file) {
      console.log(file);
      console.log(res);
    },
    handlePreview(file) {
      console.log(file);
    },
    beforeUpload(file) {
      if (file.size / 1024 / 1024 > 1) {
        Vue.$vux.toast.text("上传文件不超过1M");
        return false;
      }
      var ext = file.name.substring(file.name.lastIndexOf(".") + 1);
      const extension =
        ext === "csv" || ext === "CSV" || ext === "xlsx" || ext === "xls";
      if (!extension) {
        Vue.$vux.toast.text("上传文件格式只能为csv、xlsx/xls");
        return false;
      }
    },
    httpRequest(opt) {
      const _this = this;
      const file = opt.file;
      Vue.$vux.toast.text("文件上传中...");
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        let imgType = "";
        var ext = file.name.substring(file.name.lastIndexOf(".") + 1);
        if (ext === "csv") {
          imgType = "csv";
        }
        if (ext === "xlsx" || ext === "xls") {
          imgType = "xlsx";
        }
        uploadCsv({
          files: this.result.replace(`data:image/${imgType};base64,`, ""),
        })
          .then((res) => {
            if (res.errno === 0) {
              Vue.$vux.toast.text("上传成功");
              _this.account.license_url = res.data.url;
            }
          })
          .catch((err) => {});
      };
    },
    onDownload() {
      let start = "";
      let end = "";
      if (this.form.time) {
        start = parseTime(this.form.time[0]);
        end = parseTime(this.form.time[1]);
      }
      delete this.form.time;
      Object.assign(this.form, {
        first_time: start,
        end_time: end,
      });
      let { first_time, end_time } = this.form;
      window.open(
        this.downUrl +
          "lm/downloadModel?" +
          "&first_time=" +
          first_time +
          "&end_time=" +
          end_time,
        "_blank"
      );
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      //这里需要注意 用的img并不是file，因为接口文档给的是img，我们在upload中定义个name=“img”参数就可以了
      // 检查文件类型
      const isImage = file.raw.type.includes("image");
      if (!isImage) {
        this.$message.error("上传文件类型必须是图片!");
        return false;
      }
      // 检查文件大小
      if (file.size > 2 * 1024 * 1024) {
        this.$message.error(`上传文件大小不能超过10Mb`);
        this.$refs["refUpload"].handleRemove(file);
        return false;
      }
      // 检查文件数量
      if (fileList.length > 1) {
        this.$message.error(`上传文件最大数量为1`);
        this.$refs['refUpload'].handleRemove(file);
        return false;
      }
      this.ImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleimg(res, file, fileList) {
      if (res.status === 200) {
        this.editForm.picture = res.data;
        this.$message("上传成功");
      } else {
        this.$message.error(`图片${file.name}上传失败`);
      }
    },
    search() {
      this.$refs.luckyDrawTable.value
    },
    newbuilt() {
      //新建
      this.title = "新建";
      this.bthShow = false;
      this.editFormVisible = true;
      this.editForm = {
        gname: "",
        deptName: "",
        deptNo: "",
        floorNumber: [],
        giftphoto: [],
        picture: "",
        uploadlist: "",
        endtime: "",
        updatetime: "",
      };
    },
    submitForm(editForm) {
      //确定
      let params = {
          deptName: this.editForm.deptName,
          gname: this.editForm.gname,
          deptNo: this.editForm.deptNo,
          floorNumber: this.editForm.floorNumber,
          giftphoto: this.editForm.giftphoto,
          uploadlist: this.editForm.uploadlist,
          endtime: this.editForm.endtime,
          updatetime: this.editForm.updatetime,
      };
      this.$refs[editForm].validate((valid) => {
        if (!valid) {
          Appmanage(params).then((r) => {
            if ((r.status = 200)) {
              this.$message.error(r.data.resultMsg);
            } else {
              this.$message.error("创建失败");
            }
          });
        } else {
          return this.$message.error("请填入必填项");
        }
      });
    },
    handleEdit(flag) {
    console.log(flag);
    let items = this.multipleSelection
      if (items.length != 1) {
        return this.$message.error("请选择一项数据");
      } else {
        if (flag == true) {
          this.bthShow = false;
          this.editFormVisible = true;
          this.title = "修改";
          this.editForm = {
            deptName: items[0].name,
            gname: items[0].crowdGoodsName,
            deptNo: items[0].id,
            floorNumber: items[0].floorNumber,
            updatetime: items[0].createTime,
            eDeliveryTime: items[0].endTime,
            uploadlist: items[0].uploadlist,
          };
        } else {
          this.editFormVisible = true;
          this.bthShow = true;
          this.title = "详情";
          this.editForm = {
            deptName: items[0].name,
            gname: items[0].crowdGoodsName,
            deptNo: items[0].id,
            floorNumber: items[0].floorNumber,
            updatetime: items[0].createTime,
            eDeliveryTime: items[0].endTime,
          };
        }
      }
    },
    listdata(parameter) {
      OrderList(parameter).then((r) => {
        this.loading = false;
        if (r._status == 200) {
          this.listData = r.data.datas;
        }
      });
    },
    fromstatus(ite, val) {
      let _status = "";
      this.statusdata.forEach((e) => {
        if (e.value == val.status) {
          _status = e.key;
        }
      });
      return _status;
    },
    logisticData(row){//审核状态
        let _par = ''
        this.paydataList.statusType.forEach(e =>{
          if(row.status==e.value){
            _par = e.key
          }
        })
        return _par
    },
    lenovofrom(row){//商城
       let _ovo = ''
       this.paydataList.shopType.forEach(e =>{
         if(row.bussinessFinish == e.value){
           _ovo = e.key
         }
       })
       return _ovo
    },
    appfromnum(row){//返现平台
      let _app = ''
      this.paydataList.helpCondType.forEach(e =>{
        if(row.careNum==e.value){
          _app = e.key
        }
      })
      return _app
    },
    callFather(parm) {// 分页插件事件
        this.formInline.pageSize = parm.currentPage
        this.formInline.limit = parm.currentPage
        this.getdata(this.formInline)
    }
  },
  created() {
   // this.getdata()
  },
};
</script>

<style scoped>
.user-search {
  width: 100vh;
  height: 100% !important;
  float: none;
  position: relative;
}
.oper-box {
  text-align: left;
}
.btnGroup {
  text-align: right;
  padding: 20px;
}
.addDialog .btnGroup {
  text-align: center;
  padding: 10px;
}
.demo-ruleForm {
  padding: 24px;
  position: absolute;
}

.dialog-footer {
  margin-left: 400px;
}
.layout-content {
  overflow: hidden;
}
.layout-content.dialog-content {
  padding: 0;
}
.layout-content.dialog-content .upaload {
  text-align: left;
}
.layout-content.dialog-content .el-radio-group {
  float: left;
  margin-top: 9px;
}
</style>