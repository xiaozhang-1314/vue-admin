<template>
    <div>
        <div v-bind:class="state.borderCls">
            <div class="input-group mb-3">
                <input type="text" class="form-control" v-model="vValue" aria-label="Amount (to the nearest dollar)" v-on:input="changeEvent()">
                <div class="input-group-append">
                    <span class="input-group-text icon" v-bind:class="state.successIcon"></span>
                </div>
            </div>
            <p class="text-left" v-show="state.showError">{{errorMsg}}</p>
        </div>

        <!-- <div class="inputGreenIcon">
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
                <div class="input-group-append">
                    <span class="input-group-text icon icon-duihao"></span>
                </div>
            </div>
        </div>

        <div class="inputIcon">
            <div class="input-group mb-3">
                <input type="text" class="form-control" aria-label="Amount (to the nearest dollar)">
            </div>
        </div> -->
    </div>
</template>

<script>
    import Util from "../../../core/tool/commonUtil";
    export default{
        name:"VInput",
        props:["errorMsg","vType"],
        data(){
            return {
                vValue:"",
                state:{
                    flag:false,
                    showError:false,
                    borderCls:"inputIcon",//inputRedIcon inputGreenIcon inputIcon
                    successIcon:""//icon-cuo,icon-duihao
                }
            }
        },
        methods:{
            setIsSuccess(flag){
                if(flag){
                    this.state = {
                        borderCls:"inputGreenIcon",
                        successIcon:"icon-duihao",
                        showError:false,
                        flag:true
                    }
                }else{
                    this.state = {
                        borderCls:"inputRedIcon",
                        successIcon:"icon-cuo",
                        showError:true,
                        flag:false
                    }
                }
            },
            changeEvent(e){
                this.setIsSuccess(this.verify(this.vValue));
            },
            verify(val){
                var reg = /^[0-9]*$/;
                if (!reg.test(val)) {
                    return false;
                }
                return true;
            },
            getResult(){
                return {
                    success:this.state.flag,
                    value:this.vValue
                }
            }
        },
        mounted () {
            
        },
        created () {
            
        }
    }
</script>

<style scoped>
    .inputRedIcon input{border-right: 0;border-color: red;outline: none;}
    .inputRedIcon div span.icon{background: #fff;border-color: red;color: red;}
    .inputRedIcon p{color: red;}


    .inputGreenIcon input{border-right: 0;}
    .inputGreenIcon div span.icon{background: #fff;font-size: 16px;color: rgb(72, 255, 0);}
    .inputGreenIcon p{display: none}

    .inputIcon{border-right: 0;}
</style>