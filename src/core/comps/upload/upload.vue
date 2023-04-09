<template>
    <div class="upaload">
        <span  class="input-file" :class="{'disabled-btn':disabled}">请选择&nbsp;&nbsp;
        <input @change="change" type="file" :disabled="disabled" name="certFile"  :ref="fkey" class="imgFile"></span>
        <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
         <span v-if="!hideMsg" style="margin-left:10px;color:#67C23A;" :class="{'text-danger':msg!='上传成功'}"  >{{msg}}</span>
        <!-- <input type="button" style="margin-left:10px;" class="btn btn-info" @click="upload" value="上传" /> -->
    </div>
</template>

<script>
    export default {
        components: {},
        props:["fname","url","completedCallback","vtype","size","otherParam","checkImg","hideMsg","disabled"],
        name: "FileUpload",
        data(){
            return {
                fkey:Math.ceil(Math.random()*1000000000),
                showLoading:false,
                msg:""
            }
        },
        watch: {
            msg(val) {
                console.log(val);
               if(this.hideMsg&&val&&(val.indexOf('.')==-1||val.indexOf('文件大小')!=-1)){this.alert.showAlert(val.indexOf('成功')>-1?'success':'error',val)};
            }
        },
        computed:{
            
        },
        methods:{
            change:function(){
                let val = this.$refs[this.fkey].value;
                this.msg = val.substring(val.lastIndexOf('\\') + 1);
                this.upload();
            },
            resetFileInput:function(){
                this.$refs[this.fkey].value = "";
            },
            setMsg(msg){
                this.msg = msg?msg.substring(0,20)+"...":"";
            },
            upload:function(){
                let dom = this.$refs[this.fkey];
                let val = dom.value;
                if(val){
                    let formData = new FormData();
                    formData.append(this.fname,dom.files[0]);
                    if(this.vtype){
                        let fileName = dom.files[0].name;
                        var suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                        if(this.vtype.indexOf(',') == -1){
                            if(this.vtype != suffix){
                                this.msg = "后缀名必须为:"+ this.vtype;
                                return;
                            }
                        }else{
                            let res = this.vtype.split(',').filter(item=>{
                                return item.toLowerCase() == suffix.toLowerCase();
                            })
                            if(res.length == 0){
                                this.msg = "后缀名必须为:"+ this.vtype;
                                return;
                            }
                        }
                    }
                    if(this.size){
                        let size = dom.files[0].size;
                        let re = /^[0-9]+.?[0-9]*$/;
                        let maxSize = parseFloat(this.size);
                        if (!re.test(this.size)) {
                    　　　　maxSize = 999;
                　　     }
                        if(size > maxSize * 1024 *1024){
                            this.msg = "文件大小必须小于:"+ this.size + "M";
                            return;
                        }
                    }
                    
                    if(this.checkImg)this.jyImg(dom,formData);
                    else this.ajaxUpload(dom,formData);
                    
                }else{
                    this.msg = "请选择文件";
                }
            },
            ajaxUpload:function(dom,formData){
                this.showLoading = true;
                    var _size=Math.round(dom.files[0].size/1024);
                    this.ajax.uploadFetch(this.url,formData).then((result) => {
                        this.msg = "上传成功";                        
                        this.showLoading = false;
                        this.completedCallback({success:true,data:result,size:_size,param:this.otherParam});
                    }).catch((err) => {
                        this.showLoading = false;
                        this.msg = "上传异常";                       
                        this.resetFileInput();
                        this.completedCallback({success:false,data:err});
                    });
            },
            jyImg:function(dom,formData){
                if(!this.checkImg) return true;
                var fileData=dom.files[0];
                var that=this;
                  //读取图片数据
                var reader = new FileReader();
                reader.onload = function (e) {
                     var data = e.target.result;
                      //加载图片获取图片真实宽度和高度
                     var image = new Image();
                     image.onload=function(){
                         var width = image.width;
                         var height = image.height;
                        //  if(that.checkImg.maxWidth&&width>that.checkImg.maxWidth){
                        //      that.msg='宽度不能超过'+that.checkImg.maxWidth;
                        //     that.resetFileInput();
                        //      return false;
                        //  }
                        //  if(that.checkImg.maxHeight&&height>that.checkImg.maxHeight){
                        //      that.msg='高度不能超过'+that.checkImg.maxHeight;
                        //     that.resetFileInput();
                        //      return false;
                        //  }
                         if(that.checkImg.width&&width!=that.checkImg.width){
                             that.msg='请上传宽度为：'+that.checkImg.width+'的图片';
                            that.resetFileInput();
                             return false;
                         }
                         if(that.checkImg.height&&height!=that.checkImg.height){
                             that.msg='请上传高度为：'+that.checkImg.height+'的图片';
                             that.resetFileInput();
                             return false;
                         }
                        //  if(that.checkImg.checkSquare && width != height){
                        //      that.msg='请上传正方形图片';
                        //     that.resetFileInput();
                        //      return false
                        //  }
                         that.ajaxUpload(dom,formData);
                         //isAllow = width >= Max_Width && height >= Max_Height;
                         //showTip2(isAllow);
                     };
                     image.src= data;
                  };
                reader.readAsDataURL(fileData);
            }
        },
        created(){
            
        },
        mounted () {
            
        }
    }
</script>

<style scoped>
.imgFile{
    cursor:pointer;
}
.input-file {
    cursor:pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    width: 100%;
    background-color: #2c7;
    border-radius: 4px;
    padding: 7px 10px;
    font-size: 12px;
    font-weight: normal;
    line-height: 18px;
    color: #fff;
    text-decoration: none;
}
.input-file input[type="file"] {
    cursor:pointer;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    font-size: 14px;
    background-color: #f00;
    /*transform: translate(-300px, 0px) scale(4);*/
    /* height: 100%;
    width: 100%; */
    opacity: 0;
    filter: alpha(opacity=0);
    width:100%;
}
.loading{width:24px;}
.text-danger{color: #F56C6C !important;white-space: nowrap;}
.disabled-btn{background-color: #b3e19d;}
</style>
