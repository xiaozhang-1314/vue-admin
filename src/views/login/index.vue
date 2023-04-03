<template>
  <div id="login">
    <div class="login-wrap">
       <ul class="menu-tab">
        <li :class="{'current':item.current}" v-for="item in menTab" :key="item.id" @click="btclick(item)">{{ item.txt }}</li>
       </ul>
       <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="68px" class="login-form" >
        <el-form-item label="邮箱" prop="username" class="itemform">
            <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" class="itemform">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" prop="passwords" class="itemform" v-show="model==='register'">
            <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" minlength="6" maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="code" class="itemform">
            <el-row :gutter="20">
             <el-col :span="16">
                <el-input v-model.number="ruleForm.code" minlength="6" maxlength="6"></el-input>
             </el-col>
             <el-col :span="6">
                <el-button type="success" class="block">验证码</el-button>
             </el-col>
            </el-row>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import {stripscript,validataEmail,validatacode,validatapass} from "@/utils/validate.js"
export default {
name:"login",
data(){
    var checkAge = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
        if (!value) {
          return callback(new Error('验证码不能为空'));
        }else if (!validatacode(value)){
            return callback(new Error("验证码必须是6位"))
        }else{
            callback();
        }
      };
      var validateusername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }else if(!validataEmail(value)) {
          callback(new Error('用户名格式有误'))
        } else {
          callback();
        }
      };
      var validatepassword = (rule, value, callback) => {
        //过滤后的数据
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password
        if (value === '') {
          callback(new Error('请输入密码'));
        }else if(!validatapass(value)){
            callback(new Error('密码必须包含字母和数字，且在6-18位之间'));
        }  else {
          callback();
        }
      };
      var validatepasswords = (rule, value, callback) => {
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords
        if(this.model=='login'){
            callback()
        }
        if (value === '') {
            callback(new Error('请再次输入密码'))
        }if(value !==this.ruleForm.password){
            callback(new Error('两次输入密码不一致'))
        }else{
            callback()
        }
      }
  return {
      menTab:[        
        {txt:"登录",current:true,type:"login"},
        {txt:"注册",current:false,type:"register"}],  
        model:'login',
        ruleForm: {
          username: '',
          password: '',
          passwords:'',
          code: ''
        },
        rules: {
          username: [
            { validator: validateusername, trigger: 'blur' }
          ],
          password: [
            { validator: validatepassword, trigger: 'blur'}
          ],
          passwords: [
            { validator: validatepasswords, trigger: 'blur'}
          ],
          code: [
            { validator: checkAge, trigger: 'blur' }
          ]
        }
    }
   
},
methods:{
    btclick(data){
        this.menTab.forEach(e => {
            e.current = false
        })
            data.current = true
            this.model=data.type
    },
    submitForm(formName) {
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
        this.$refs[formName].resetFields();
      }
}
}
</script>

<style lang="scss" scoped>
#login{
    background-image:url(@/assets/biejin.png);
    background-color: darkgray;
    height: 100vh;
}
.login-wrap{
    width: 350px;
    position:absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 22px 30px;
    box-shadow: 0 0 1px 1px;
    margin: auto;
}
.menu-tab{
    text-align: center;
    li{
        display: inline-block;
        width: 88px;
        line-height: 36px;
        font-size: 14px;
        color: #fff;
        border-radius: 2px;
    }
    .current{
        background-color: rgba(0,0,0,.1);
    }
}
.login-form{
    margin-top: 30px;
    .itemform{
      margin-bottom: 13px;
    }
}
.block{
    flex: l;
}
</style>