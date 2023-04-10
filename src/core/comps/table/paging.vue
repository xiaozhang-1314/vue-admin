<template>
    <div class="pageNumCls" >
        <nav aria-label="Page navigation example">
            <ul class="pagination">
                <li class="page-item"><a class="page-link span">总条数:{{count}}</a></li>
                <li class="page-item" @click="this.prev"><a class="page-link button" >上一页</a></li>
                <li class="page-item" @click="this.next"><a class="page-link button" >下一页</a></li>                
                <li class="page-item"><a class="page-link span">当前页</a></li>
                <li class="page-item"><a class="page-link span">{{index}}/{{total}}</a></li>
                <li class="page-item"><span class="page-link span">跳至</span></li>                        
                <li class="page-item"><input type="text" :ref="this.goIndexKey" class="enter-number" placeholder=''/></li>
                <li class="page-item"><span class="page-link span">页</span></li>                        
                <li class="page-item" @click="this.goToIndex"><a class="page-link button">确定</a></li>               
            </ul>
        </nav>
    </div>
</template>

<script>
    export default {
        props:["options","goNext","goPrev","goIndex"],
        name: "PagingSection",
        data(){
            return {
                goIndexKey:Math.ceil(Math.random()*10000000000)
            }
        },
        computed:{
            index:function(){
                return this.options.index;
            },
            count:function(){
                return this.options.count;
            },
            total:function(){
                return this.options.total;
            }
        },
        methods:{
            next:function () {
                if(this.index >= this.total){
                    return;
                }
                this.goNext();
            },
            prev:function () {
                if(this.index <=1){
                    return;
                }
                this.goPrev();
            },
            goToIndex:function () {
                let eIndex = this.$refs[this.goIndexKey].value;
                if( eIndex > this.total || eIndex< 1 || isNaN(eIndex)){
                    this.$refs[this.goIndexKey].value = "";
                    return;
                }
                this.goIndex(eIndex);
            }
        },
        updated(a,b) {
        },
        mounted(){
        },
        created(){
        }
    }
</script>

<style scoped>
    .button{
        cursor: pointer;
        background-color: #5bc0de;
        width: 48px;
        height: 24px;
        display: inline-block;
        color: #fff;
        font-size: 12px;
    }

    .pagination>li>a.button{
        color:#fff;
    }

    .paging{height: 26px; margin: 30px 0; line-height: 26px;}
    .paging input[type=button]{
        height: 26px;
        min-width: 26px;
        padding: 0 5px;
        border: 1px solid #dfdfdf;
        box-sizing: border-box;
        background: none;
        margin-right: 4px;
        border-radius: 5px;}
    .paging input[type=text]{width: 30px; height: 20px; border: 1px solid #797979; text-align: center;}
    .paging span{padding: 0 5px;}
    .pageNumCls{margin-right: 20px;float:right;font-size:14px;}
    .pagination{
        list-style: none;overflow: hidden;
    }
    .pagination>li{
        display: block;float: left;margin-left: 8px;
    }
    .pagination>li>a, .pagination>li>span{
        border-radius: 6px;padding: 0 2px;line-height: 24px;color: rgba(0,0,0,0.65);
    }
    .pagination .enter-number{
        border: 1px solid rgba(217,217,217,1);vertical-align:sub;line-height: 20px;width: 30px;
        padding: 0 5px;border-radius: 6px;outline: none;
    }
</style>
<style>
    .span{   border:1px #fff solid!important; }
    .span:hover{
        background-color:#fff!important;
    }

</style>
