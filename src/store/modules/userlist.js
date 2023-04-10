import API from "../../api/userMG.js";

export default{
    namespaced: true,
    state:{
        paydataList:{
            payType:[{key:"全部",value:""},{key:"停用",value:"1"},{key:"启用",value:"2"}],
            statusType:[{key:"审核通过",value:"1"},{key:"审核拒绝",value:'2'},{key:"审核驳回",value:'3'}],
            rewardType:[{key:"现金",value:"0"},{key:"优惠劵",value:"1"},{key:"优惠码", value:"2"},{key:"乐豆",value:"3"},{key:"三方商品",value:"4"},{key:"限时红包",value:"5"},{key:"企业积分",value:"6"}],
            helpCondType:[{key:"新用户",value:"0"},{key:"老用户",value:"1"},{key:"普通用户",value:"2"},{key:"企业新用户",value:"3"},{key:"企业老用户",value:"4"},{key:"企业用户",value:"5"}],
            shopType:[{key:"Thanks♪商城",value:"1"}]
        },

    },
    getters:{

    },
    mutations:{

    },
    actions:{
        getPrizeList(context,data){
            API.getPrizeList(data.context,data.params,d=>{
                data.cb && data.cb(d);
            });
        },
    }
}