<template>
<div>
    <h4>{{this.title[this.$route.query.tag]}}</h4>
 <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
  <el-form-item label="活动名称" prop="name">
   <el-col :span="10">
    <el-input v-model="ruleForm.name"></el-input>
   </el-col>
  </el-form-item>
  <el-form-item label="活动区域" prop="region">
    <el-col :span="10">
    <el-select v-model="ruleForm.region" placeholder="请选择活动区域">
      <el-option v-for="type in paydataList.helpCondType"  :label="type.key" :value="type.value" :key="type.value"></el-option>
    </el-select>
    </el-col>
  </el-form-item>
  <el-form-item label="价格">
            <div  v-for="(item, index) in ruleForm.MoneyArr" :key="index" style=" display: flex;">
                  <el-col :span="5">
                      <el-input  v-model="item.cash" ></el-input>
                      <!-- <el-input  v-model="item.cash" :label=labelCompute(index)></el-input> -->
                  </el-col>
                      <span >元</span>
                  <el-col :span="5">
                      <el-input v-model="item.count"></el-input>
                  </el-col>
                      <span >个</span>
                <el-form-item v-if="index == ruleForm.MoneyArr.length - 1" >
                <el-button  type="primary"  @click="createBtn()">添加
                </el-button>
                <el-button  @click="removeBtn()">删除
                </el-button>
                </el-form-item>
            </div>


  </el-form-item>
  <el-form-item label="活动时间" required>
    <el-col :span="4">
      <el-form-item prop="date1">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date1" style="width: 100%;"></el-date-picker>
      </el-form-item>
    </el-col>
    <el-col style="margin-left:20px" :span="1">——</el-col>
    <el-col :span="5">
      <el-form-item prop="date2">
        <el-time-picker placeholder="选择时间" v-model="ruleForm.date2" style="width: 100%;"></el-time-picker>
      </el-form-item>
    </el-col>
  </el-form-item>
  <el-form-item label="即时配送" prop="delivery">
    <el-switch v-model="ruleForm.delivery"></el-switch>
  </el-form-item>
  <el-form-item label="活动性质" prop="type">
    <el-checkbox-group v-model="ruleForm.type">
        <el-checkbox v-for="type in paydataList.fuleType" :label="type.key" :key="type.value"></el-checkbox>
  </el-checkbox-group>
  </el-form-item>
  <el-form-item label="特殊资源" prop="resource">
    <el-radio-group v-model="ruleForm.resource">
        <el-radio v-for="type in paydataList.resourceType" :label="type.key" :value="type.value" :key="type.value" @change="resourcechange"></el-radio>
    </el-radio-group>
  </el-form-item>
  <div v-show="this.ruleForm.resource=='企业用户'">
    <el-form-item label="企业url链接" prop="desc">
    <el-col :span="8">
        <el-input v-model="ruleForm.desc"></el-input>
    </el-col>
    </el-form-item>
    <el-form-item label="企业用户活动形式" prop="desc">
    <el-col :span="8">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-col>
    </el-form-item>
    <el-form-item label="企业用户上传图片" prop="names">
        <el-col :span="8">
         <ImageListUpload v-model="ruleForm.names" :fileLimit="99" listType='picture-card' />
        </el-col>
    </el-form-item>
  </div>
  <div v-show="this.ruleForm.resource=='普通用户'">
    <el-form-item label="普通用户活动形式" prop="desc">
    <el-col :span="8">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
    </el-col>
    </el-form-item>
    <el-form-item label="普通用户上传图片" prop="names">
        <el-col :span="8">
         <ImageListUpload v-model="ruleForm.names" :fileLimit="99" listType='picture-card' />
        </el-col>
    </el-form-item>
  </div>
  <el-form-item>
    <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    <el-button @click="resetForm('ruleForm')">取消</el-button>
  </el-form-item>
 </el-form>   
</div>

</template>

<script>
import KEYS from "../../constant/index.js";
import ImageListUpload from "../../core/comps/upload/zrj-upload.vue"
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapActions,mapMutations } = createNamespacedHelpers('user_seve');
  export default {
    components:{ImageListUpload},
    data() {
      return {
        title: {
          create: "新建活动",
          update: "修改活动",
          detail: "详情",
          copy: "复制",
        },
        ruleForm: {
         names:[],
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          MoneyArr:[{
            cash:"",
            count:""
          },{
            cash:"",
            count:""
          }]
        },
        rules: {
          name: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          region: [
            { required: true, message: '请选择活动区域', trigger: 'change' }
          ],
          date1: [
            { type: 'date', required: true, message: '请选择日期', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
  computed:{
    ...mapState(['paydataList'])
  },
    methods: {
      createBtn() {
        //添加
        if (this.ruleForm.MoneyArr.length > 4) {
          this.alert.showAlert("info", "最多可以添加五档， 不能在添加了");
          return;
        }
        let arr = this.ruleForm.MoneyArr;
        arr.push({ cash: "", count: "" });
        // this.ruleForm.set({
        //   MoneyArr: arr,
        // });
      },
      removeBtn() {
        //删除
        if (this.ruleForm.MoneyArr.length > 2) {
          let arr = this.ruleForm.MoneyArr;
          arr.pop({ cash: "", count: "" });
          // this.ruleForm.set({
          //   MoneyArr: arr,
          // });
        } else {
          this.alert.showAlert("info", "最少二档，不能在删除了");
        }
      },
     labelCompute(index) {
        let text = ["一", "二", "三", "四", "五"];
        return `第${text[index]}档 发放金额：`;
      },
      resourcechange(e){
          console.log(e);
      },
      submitForm(formName) {
        console.log(this.ruleForm.type);
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$router.back();
      }
    },
    mounted() {
        this.ruleForm.resource='普通用户',
        this.ruleForm.type=["APP","小程序","wap","cp"]
        }
  }
</script>
<style scoped>
.el-col el-col-3{
  color:red
}
</style>