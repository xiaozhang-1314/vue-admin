<template>
    <tbody>
        <tr v-for="(row,index) in data" @click="e=>selectRow(row,e)" :key="index" v-bind:class="{ 'bg-gray': row.ck }" >
            <td v-if="showCk">
                <div v-if="singleSelected">
                    <input :name="radioKey" type="radio" :checked="row.ck"/>
                </div>
                <div v-else>
                    <input type="checkbox" :checked="row.ck" />
                </div>
            </td>
            <td v-if="actions && actions.length != 0">
                <button v-show="actionShowFn(x,row)" v-for="(x,i) in actions" :class="x.key" class="btn btn-sm btn-link" @click.prevent="e=>{x.action(row)}" :key="i">{{x.val}}</button>
            </td>
            
            <td v-for="(item,idx) in cols" :key="idx">
                <div v-if="item.etype == 'img'">
                    <img style="width:100px;height:100px;" v-bind:src="row[item.key]" />
                </div>
                <div v-else>
                    <a v-if="item.convert && item.action" @click.prevent="e=>item.action(row,item)">
                    {{item.convert(item,row)}}
                    </a>
                    <div v-if="item.convert&&item.html" v-html="item.convert(item,row)"></div>
                    <span class="td-convert-span" v-if="item.convert && !item.action &&!item.html">{{item.convert(item,row)}}</span>
                    <a v-if="!item.convert && item.action&&!item.html" @click.prevent="e=>item.action(row,item)">
                        {{getValByFieldInRow(item,row)}}
                    </a>
                    <span v-if="!item.convert && !item.action&&!item.html">{{getValByFieldInRow(item,row)}}</span>
                </div>
            </td>
            
        </tr>
    </tbody>
</template>

<script>
    import Util from "../../tool/commonUtil.js";
    
    export default {
        name: "BodySection",
        props:["actions","data","cols","accpetHBNotice","showCk","singleSelected"],
        data(){
            return {
                radioKey:Math.ceil(Math.random()*10000000)
            }
        },
        computed:{
            
        },
        mounted(){
            
        },
        methods:{
            actionShowFn(action,row){
               
                if(action.show){
                    return action.show(row);
                }else{
                    return true;
                }
            },
            selectRow:function(row,e){
                if(this.singleSelected){
                    this.data.forEach(el => {
                        el.ck = false;
                    });
                }
                row.ck = !row.ck;
                this.accpetHBNotice(null,{data:this.data});
            },
            getValByFieldInRow:function(item,row){
                let key = item.key;
                let val = "";
                if(typeof row[key] == "boolean"){
                    val = row[key].toString();
                }else{
                    let v = "row."+item.key;
                    let tmp = eval("("+v+")");
                    if(tmp == undefined){
                        val = "";
                    }else{
                        let type = item.type;
                        if(type){
                            type = type.toLowerCase();
                            switch(type){
                                case "date":
                                    val = Util.date.date(tmp);
                                    break;
                                case "datetime":
                                    val = Util.date.dateTime(tmp);
                                    break;
                                case "time":
                                    val = Util.date.time(tmp);
                                    break;
                                default:
                                    val = tmp;
                            }
                        }else{
                            val = tmp;
                        }
                    }
                }
                return val;
            }
        }
    }
</script>

<style scoped>
    .tableList .relative{
        position: relative;
    }
    .tableList .maskLayer{
        position: absolute;left: 0;top: 0;bottom: 0;right: 0;
    }
    .btnCls{
        margin:0 5px;
    }

    tbody tr td{color: rgba(0,0,0,0.65);border: 1px solid #ddd;vertical-align: middle;text-align: center; }
    
    .btn{
        margin: 0 5px;
        border-radius: 4px;
        padding: 2px 10px;
        border:none;
    }
    button.edit{
        background-color: #409eff;
    } 

   button.delete{
        background-color: #f56c6c;
    } 
    .bg-gray{
        background-color: #fafafa;
    }
.td-convert-span{white-space:pre-wrap;}
tbody a{cursor: pointer;color:blue;}
</style>