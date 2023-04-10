<template>
  <div>
    <div class="row-btns" v-for="(btnsArr, rowIndex) in Mdata.json1" :key="rowIndex.index">
      <div class="btn" v-for="(btn,i) in btnsArr" :key="i.index" @click="btnchenge(rowIndex,btn)">{{ btn }}</div>
    </div>
    <h2>{{ condition }}</h2>
    <br />
    {{ Mdata.json2 }}
  </div>
</template>

<script>
import Mdata from './data.js'
export default {
data(){
    return {
        Mdata,
        types:[],
        condition:{
            // color:'',
            // type:'',
            // mianliao:''
        }
    }
},
created(){
   let listdata = Mdata.json2[0]
   //遍历对象，获取所有条件key,和初始值
   for(let key in listdata){
    this.types.push(key)
    //初始数据 todo:处理动态key的问题
    //this.condition[key] = firstDta[key]
    this.$set(this.condition,key,listdata[key])
    // console.log(this.types)
   }
},
methods:{
    btnchenge(index,val){
      console.log(index,val);
      //代码可复用性。维护性差
    //   switch(index){
    //    case 0:
    //         this.condition.color = val
    //         break
    //    case 1:
    //         this.condition.type = val
    //         break
    //    case 2:
    //         this.condition.mianliao = val
    //         break
    //   }

    let key = this.types[index]
    this.condition[key] = val
    }
}
}
</script>

<style scoped>
.row-btns{
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn{
    width:60px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #f6f4f4;
    border-radius: 6px;
    cursor: pointer;
    margin: 10px;
}
</style>