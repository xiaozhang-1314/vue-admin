<template>
<div>
    <span class="groupSpan over" v-for="(item,index) in data" :key="index">
        <div class="item over fl">
            <span class="fl">{{item.name}}</span> 
            <span class="icon icon-cuo" @click.stop="removeItem(item)"></span>
        </div>
    </span> 
</div>
    
</template>

<script>
  export default {
    name: 'LeftSection',
    components: {},
    props:["data","noticeParent"],
    data () {
      return {

      }
    },
    methods:{
      removeItem:function(item){
          this.noticeParent(item);
      }
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
    .pullItem p {text-align: left}
    .pullItem p span{float: right}
    .pullItem {
        overflow-x:hidden;
        overflow-y:auto;
        width:80%;
        margin:auto;
        max-height:150px;
        margin-bottom:10px;
        border:1px solid #e6e6e6;
        border-top:none;
        border-radius:0 0 5px 5px;
    }
    .pullItem p {
        height:30px;
        line-height:30px;
        padding:0 5px;
    }
    .pullItem p:HOVER {background-color:cornflowerblue;color:white;}
    .over {overflow:hidden;}
    .fl {float:left;}
    .fr {float:right;}
    .input{height: 30px;width: 200px;border:none;outline: none}
</style>
