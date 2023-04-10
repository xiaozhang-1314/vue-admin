<template>
    <div class="form-item upaload">
        <div style="display: flex;">
            <label :style="{width:labelWidthVal + 'px'}" class="form-item-label" :class="$attrs.on != undefined?'required':''">{{$attrs.label}}</label>

            <div style="flex:1">
                <span :class="{'readonlyIcon':readonlyFlag}" class="input-file">请选择
                <input :disabled="readonlyFlag" @change="change" type="file" :ref="fkey" class="imgFile" /></span>
                <img v-show="showLoading" src="https://p2.lefile.cn/product/adminweb/2018/05/28/6f7b5572-8693-4f6c-a041-cf6f32b367ac.gif" class="loading">
                <span class="rules">{{tipStr}}</span>
                <div class="fileList" v-show="srcs.length>0">
                    <div v-if="fileType != 'image'">
                        <span v-for="(item,index) in srcs" :key="index">
                            <a target="_blank" :href="item.name">{{"附件_" + item.idx}}</a>
                            <i v-show="!readonlyFlag" @click="removeItem(item)" class="fa fa-times"></i>
                        </span>
                    </div>
                    <div v-else>
                        <span v-for="(item,index) in srcs" :key="index" style="height:auto">
                            <a target="_blank" :href="item.name" style="display:block;height:100px;">
                                <img :src="item.name" style="width:100px;height:100px">
                            </a>
                            <i v-show="!readonlyFlag" @click="removeItem(item)" class="fa fa-times"></i>
                        </span>
                    </div>
                </div>
                <p class="promptMsg" v-show="state.showError">{{$attrs.msg}}</p>
            </div>
        </div>
    </div>
</template>

    
<script>
    import define from "../define.js";
    import tool from "../leCompsTool.js";
    export default {
        components: {},
        props:["options","value","readonly","tip"],
        name: "LeUpload",
        inheritAttrs:false,//控制attrs的属性不渲染到根元素上面
        data(){
            return {
                validataComponentType:"FileUpload",
                fkey:tool._idSeed.newId(),
                showLoading:false,
                srcs:[],
                state:{
                    showError:false,
                    successIcon:""
                },
                formLabelWidth:"0"
            }
        },
        computed:{
            labelWidthVal(){
                if(this.$attrs.labelWidth){
                    return this.$attrs.labelWidth;
                }
                if(this.formLabelWidth != 0){
                    return this.formLabelWidth;
                }
                return define.LABELWIDTH;
            },
            tipStr(){
                return this.options.tip?this.options.tip:"";
            },
            multiple(){
                return this.options.multiple?true:false;
            },
            fname(){
                return this.options.fname;
            },
            url(){
                return this.options.url;
            },
           
            completedCallback(){
                return this.options.completedCallback;
            },
            vtype(){
                return this.options.vtype?this.options.vtype:"";
            },
            width(){
                return this.options.width?this.options.width:"";
            },
            height(){
                return this.options.height?this.options.height:"";
            },
            size(){
                if(this.options.size){
                    let re = /^[0-9]+.?[0-9]*$/;
                    if (!re.test(this.size)) {
                        return 100;
            　　     }
                    return parseFloat(this.options.size);
                }else{
                    return 100;
                }
            },
            readonlyFlag(){
                if(this.readonly == undefined){
                    return false;
                }
                if(this.readonly === ""){
                    return true;
                }
                if(this.readonly === false){
                    return false;
                }
                return true;
            },
            fileType(){
                let _fileType = "";
                if(this.vtype){
                    if(this.vtype.indexOf('jpg') != -1 || this.vtype.indexOf('png') != -1 || this.vtype.indexOf('gif') != -1 || this.vtype.indexOf('icon') != -1){
                        _fileType = define.UPLOADFILETYPE.IMAGE;
                    }
                    if(this.vtype.indexOf('pdf') != -1){
                        _fileType = define.UPLOADFILETYPE.PDF;
                    }
                    if(this.vtype.indexOf('doc') != -1 || this.vtype.indexOf('docx') != -1){
                        _fileType = define.UPLOADFILETYPE.WORD;
                    }
                    if(this.vtype.indexOf('xls') != -1 || this.vtype.indexOf('xlsx') != -1){
                        _fileType = define.UPLOADFILETYPE.EXCEL;
                    }
                }
                return _fileType;
            }
        },
        watch:{
            value(val){
                this.setValue(val);
            }
        },
        methods:{
            /**
             * @description filechange事件
             * @returns
             */
            change(){
                if(this.options.beforUpload){
                    this.options.beforUpload()
                }
                let val = this.$refs[this.fkey].value;
                this.upload();
            },
            /**
             * @description 重置file-input的value，防止value一样的情况下再次点击file-input按钮不生效
             * @returns
             */
            reloadFileInput(){
                this.$refs[this.fkey].value = "";
            },
            /**
             * @description 上传的主体方法
             * @returns
             */
            upload(){
                if(!this.url || !this.fname){
                    this.alert.showAlert("error","上传url和fname必须配置!");
                    return;
                }
                let dom = this.$refs[this.fkey];
                let fileObj = dom.files[0];
                let formData = new FormData();
                formData.append(this.fname,fileObj);
                formData.append(this.options.otherQuery().name,this.options.otherQuery().value)
                let fileName = fileObj.name;
                this.reloadFileInput();
                //控制格式
                if(this.vtype){
                    let suffix = fileName.substring(fileName.lastIndexOf('.')+1);
                    if(this.vtype.indexOf(suffix) == -1){
                        this.alert.showAlert("error","后缀名必须为:"+ this.vtype);
                        return;
                    }
                }
                //控制大小
                if(this.size){
                    let fileSize = fileObj.size;
                    if(fileSize > this.size * 1024 *1024){
                        this.alert.showAlert("error","文件大小必须小于:"+ this.size + "MB");
                        return;
                    }
                }
                //控制规格
                if(this.fileType == define.UPLOADFILETYPE.IMAGE){
                    if(!this.width && !this.height){
                        this.doUploadAjax(formData);
                        return;
                    }
                    let that = this;
                    let reader = new FileReader();
                    reader.onload = (e)=> {
                        let data = e.target.result;
                        let image = new Image();
                        image.onload = ()=>{
                            if(that.width && that.width != image.width){
                                that.alert.showAlert("error","图片宽度必须等于:"+ that.width);
                                return;
                            }
                            if(that.height && that.height != image.height){
                                that.alert.showAlert("error","图片高度必须等于:"+ that.height);
                                return;
                            }
                            that.doUploadAjax(formData);
                        };
                        image.src= data;
                    };
                    reader.readAsDataURL(fileObj);
                }else{  
                    this.doUploadAjax(formData);
                }
            },
            doUploadAjax(formData){
                this.showLoading = true;
                this.ajax.uploadFetch(this.url,formData).then((result) => {
                    let src = this.options.analysis?this.options.analysis(result):result;
                    this.alert.showAlert("success","上传成功");
                    //多文件上传
                    if(this.multiple){
                        this.srcs.push({name:src,idx:this.getMaxIndex()});
                    }else{
                        this.srcs = [{name:src,idx:1}];
                    }
                    this.$emit('input',this.getNames(this.srcs));
                    this.showLoading = false;
                    if(this.$attrs.checkVerifyEnabled && this.$attrs.checkVerifyEnabled()){
                        this.$attrs.setVerifyCompState();
                    }
                    this.$emit("callback",this.srcs);
                    this.completedCallback&&this.completedCallback({success:true,data:result});

                }).catch((err) => {
                    this.showLoading = false;
                    this.alert.showAlert("error",err.data?err.data:"上传异常");
                    this.completedCallback&&this.completedCallback({success:false,data:err});
                });
            },
            getValue(){
                return this.getNames(this.srcs);
            },
            getMaxIndex(name){
                let tmp = [];
                this.srcs.forEach(x=>{
                    tmp.push(x.idx);
                })
                if(tmp.length != 0){
                    tmp.sort((a,b)=>{
                        return b - a;
                    })
                    return tmp[0] + 1;
                }else{
                    return 1;    
                }         
            },
            setValue(srcs){
                if(!srcs){
                    return;
                }
                if(this.srcs.length == 0){
                    srcs.split(',').forEach((x,idx)=>{
                        this.srcs.push({name:x,idx:(this.srcs.length+1)});
                    })
                }
            },
            getNames(data){
                let res = [];
                data && data.forEach(x=>{
                    res.push(x.name);
                })
                return res.join(',');
            },
            removeItem(item){
                if(this.readonlyFlag){
                    return;
                }
                let tmp = [];
                this.srcs.forEach(x=>{
                    if(x.name != item.name){
                        tmp.push(x);
                    }
                })
                this.srcs = tmp;
                this.$emit('input',this.getNames(this.srcs));
            },
            //单独重写reset方法,不调用父组件的reset
            reset(){
                this.$emit('input',"");
                this.srcs = [];
            }
        },
        created(){
            let that = this;
            tool._form_event_publisher.on(that._uid,(data)=>{
                this.formLabelWidth = data;
            });
        },
        mounted(){
            this.setValue(this.value);
        }
    }
</script>
<style scoped>
.upaload .imgFile{
    cursor:pointer;
}
.upaload .input-file {
    cursor:pointer;
    position: relative;
    overflow: hidden;
    text-align: center;
    width: 50px;
    height: 26px;
    background-color: #2c7;
    border-radius: 4px;
    padding: 5px;
    font-size: 12px;
    font-weight: normal;
    line-height: 26px;
    color: #fff;
    text-decoration: none;
}
.upaload .input-file input[type="file"] {
    cursor:pointer;
    position: absolute;
    display: block;
    top: 0;
    right: 0;
    font-size: 14px;
    background-color: #f00;
    opacity: 0;
    filter: alpha(opacity=0);
    width: 100%;
    height: 100%;
}
.upaload .loading{width:24px;vertical-align: middle;}

.upaload .fileList{
    display: block;
    width: 100%;
}

.upaload .fileList span{
    display: inline-block;
    padding: 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    border: 1px solid rgba(64,158,255,.2);
    white-space: nowrap;
    box-sizing: border-box;
    border-color: transparent;
    margin: 7px 0 2px 6px;
    margin-left: 0;
    background-color: #f0f2f5;
    color: #909399;
    position: relative;
    max-width: 230px;
    overflow: hidden;
    margin-right: 5px;
}

.upaload .fileList span a{
    color: #606266;
}

.upaload .fileList .fa-times{
    width: 12px;
    height: 12px;
    line-height: 12px;
    display: inline-block;
    position: absolute;
    top: 2px;
    right: 2px;
    font-size: 12px;
    font-size: 12px;
    font-style: normal;
    background-color: #c8cacd;
    border-radius: 9px;
    color: #fff3f3;
    text-align: center;
    cursor: pointer;
}

.formStyle .form-item{
    text-align: left;
    flex-direction: column;
    align-items: initial;
}

.upaload label{
    text-align: right;
    display: inline-block;
    font-size: 14px;
    color: #606266;
}

.formStyle .form-item .promptMsg{
    width: 100%;
    display: block;
    float: right;
    font-size: 12px;
    color: #f56c6c;
    line-height: 20px;
    text-align: left;
    margin: 0;
}

.upaload .rules{
    font-size: 12px;
    margin-left: 5px;
}

.upaload .form-item-label{
    margin: 0 5px 0 10px;
}

.upaload .form-item-label.required::before {
    content: "*";
    color: #f56c6c;
    font-size: 12px;
    margin-right: 2px;
}

.upaload .input-file.readonlyIcon{
    opacity: 0.5;
}
</style>
