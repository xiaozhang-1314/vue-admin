<template>
  <div class="images-list">
    <el-upload 
     :action="uploadUrl"
     :before-upload="handleBeforeUpload"
     :on-success="handleSuccess"
     :on-error="handleUploadError"
     :on-remove="handleRemove"
     :on-exceed="handleExceed"
     :file-list="fileList"
     :multiple="fileLimit > 1"
     :data="paramsData"
     :limit="fileLimit"
     :list-type="listType" 
     >
     <!-- <i v-if="listType === 'picture-card'" class="el-icon-plus"></i> -->
     <el-button  size="small" type="primary">点击上传</el-button>
     <!-- <div v-if="showTip" slot="tip" class="el-upload__tip">只能上传{{fileTypeName || 'jpg/png'}}文件，且不超过 {{fileSize}}MB</div> -->
     </el-upload>
  </div>
</template>
<script>
export default {
  name:'ImageListUpload',
  props:{
    // 值
    value: [String, Object, Array],
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 1,
    },
    // 文件类型, 例如["doc", "xls", "ppt", "txt", "pdf"]
    fileType: {
      type: Array,
      default: () => ['png', 'jpg', 'jpeg'],
    },
    // 文件列表类型 text/picture/picture-card
    listType:{
      type: String,
      default: 'picture'
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true
    },
    // 最大允许上传个数
    fileLimit: {
      type: Number,
      default: 99
    },
  },
  data() {
    return {
      uploadUrl: "api/file/img/upload", // 上传的图片服务器地址
      paramsData: {
         'Authorization': 'Bearer token',
         'output': 'json'
      }, // 上传携带的参数，看需求要不要
      fileList:[],
      tempFileList: [] // 因为 fileList为只读属性，所以用了一个中间变量来进行数据改变的交互。
    }
  },
  watch:{
    value: {
      handler:function(newVal,oldVa){
        this.tempFileList = newVal
      },
      immediate: true,
      deep: true
    }
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
    fileTypeName(){
      let typeName = ''
      this.fileType.forEach(item => {
        typeName += `${item}，`
      })
      return typeName
    },
    fileAccept(){
      let fileAccept = ''
      this.fileType.forEach(element => {
        fileAccept += `.${element},`
      })
      return fileAccept
    }
  },
  created() {
    this.fileList = JSON.parse(JSON.stringify(this.value))
  },
  methods: {
    // 上传前校检格式和大小
    handleBeforeUpload(file) {
      // 校检文件类型
      if (this.fileType && file) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        const isTypeOk = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
        if (!isTypeOk & file) {
          this.$message.error(`文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`);
          return false;
        }
      }
      // 校检文件大小
      if (this.fileSize && file) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message.error(`上传文件大小不能超过 ${this.fileSize} MB!`);
          return false;
        }
      }
      return true;
    },
    handleUploadError(err) {
      this.$message.error("上传失败, 请重试");
    },
    // 文件个数超出
    handleExceed(e) {
        console.log(e);
      this.$message.error(`超出上传文件个数,请删除以后再上传！`);
    },
    // 文件上传成功的钩子
    handleSuccess(res, file, fileList){
      this.$message.success("上传成功")
      this.changeFileList(fileList)
    },
    // 文件列表移除文件时的钩子
    handleRemove(file, fileList) {
      this.changeFileList(fileList)
    },
    // 文件列表改变的时候，更新组件的v-model的文的数据
    changeFileList(fileList){
      const tempFileList = fileList.map(item=>{
        let tempItem = {
          name: item.name,
          url: item.response ? item.response.data : item.url
        }
        return tempItem
      })
      this.$emit("input", tempFileList)
    }
  },
}
</script>
<style  scoped>
.images-list{
  /* border: 1px dashed #d5d5d5; */
  padding: 10px;
  border-radius: 4px;
  background: #fff;
}

</style>