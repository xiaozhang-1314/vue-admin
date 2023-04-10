<template>
    <div class="chooseZh">
        <div class="right" id="zhPull">
            <div class="over" style="text-align: left;"> 
                <left-section :data="datas.leftArray" :notice-parent="noticeFromLeft"></left-section>
                <input @click.stop="clickInput" type="text" class="input" v-model="datas.searchName" @input="inputChange" />                
                {{datas.searchName}}
            </div>
            
            <bottom-section :data="datas.bottomArray" :notice-parent="noticeFromBottom"></bottom-section>
        </div>
    </div>
</template>

<script>
  import CommonUtil from '../../tool/commonUtil.js';
  import LeftSection from "./left.vue";
  import BottomSection from "./bottom.vue";

  export default {
    name: 'LocalSelect',
    props:["data","analysis"],
    components: {LeftSection,BottomSection},
    data () {
      return {
        datas:{
            searchName:"",
            bottomArray:[],
            leftArray:[],
        }
        
      }
    },
    computed:{
        originData:function(){
            let tmp = CommonUtil.object.cloneObj(this.analysis(this.data));
            if(tmp && tmp instanceof Array){
                tmp.forEach(item=>{
                    item.ck = false;
                    item.__tmpId = Math.ceil(Math.random()*10000000000000000);
                    item.cls = "";
                })
                return CommonUtil.object.addPrimaryAndCk(tmp);
            }
            return [];
        }
    },
    methods:{
        clickInput:function(){
            if(this.datas.searchName != ""){
                this.datas = {
                    searchName:"",
                    bottomArray:[],
                    leftArray:this.datas.leftArray
                }
            }else{
                this.datas.bottomArray = this.fliterOriginData();
            }
        },
        inputChange:function(){
            this.datas.bottomArray = this.fliterOriginData();
        },
        fliterOriginData:function(){
            let res = this.originData.filter(item=>{
                return item.name.indexOf(this.datas.searchName) != -1;
            })
            return res;
        },
        init:function(data){
            this.data = data;
        },
        updateLeftBottom:function(item){
            this.datas = {
                searchName:"",
                bottomArray:this.originData,
                leftArray:CommonUtil.object.getCheckedItems(this.originData).items
            }
        },
        noticeFromBottom:function(item){
            if(item.ck){
                item.ck = false;
                item.cls = "";
            }else{
                item.ck = true;
                item.cls = "pullItemCkBgc";
            }
            this.updateLeftBottom(item);
        },
        noticeFromLeft:function(item){
            item.ck = false;
            item.cls = "";
            this.updateLeftBottom(item);
        },
        bodyClick:function(){
            this.datas = {
                searchName:"",
                bottomArray:[],
                leftArray:CommonUtil.object.getCheckedItems(this.originData).items
            }
        },
        getSelectedItems:function(){
            return CommonUtil.object.cloneObj(CommonUtil.object.getCheckedItems(this.originData,"code"));
        }
    },
    created () {
        document.body.addEventListener("click",this.bodyClick,false);
    },
    beforeDestroy () {
        document.body.removeEventListener("click",this.bodyClick)
    }
  }
</script>

<style scoped>
    .chooseZh {padding-top:30px;}
    .right {
        width:80%;
        border:1px solid #e6e6e6;
        border-radius:5px;
        padding:5px 0 0;
        margin:auto;
    }
    .defaultSpan {
        display:inline-block;
        height:26px;
        line-height:26px;
        margin-bottom:5px;
        margin-left:5px;
    }
    .groupSpan {
        float:left;
        /* width:90%; */
        margin-left:5px;
        overflow-x:hidden;
        overflow-y:auto;
        max-height:150px;
    }
    .groupSpan span.icon{font-size:12px;}
    .item {
        background:aliceblue;
        border-radius:5px;
        padding:5px;
        margin-right:5px;
        margin-bottom:5px;
    }
    .delG {
        width:15px;
        height:15px;
        margin-left:3px;
        border:1px solid #e6e6e6;
        border-radius:50%;
        background-color:#f2f2f2;
    }
    .clear {
        width:15px;
        height:15px;
        margin-right:5px;
        margin-top:6px;
    }
    .pull {
        width:15px;
        height:15px;
        margin-top:6px;
        margin-right:5px;
    }
    
    .over {overflow:hidden;}
    .fl {float:left;}
    .fr {float:right;}
    .input{height: 30px;width: 200px;border:none;outline: none}
</style>
