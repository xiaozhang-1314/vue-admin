export default{
    namespaced: true,
    state:{
        paydataList:{
            statusType:[{key:"审核通过",value:"1"},{key:"审核拒绝",value:'2'},{key:"审核驳回",value:'3'},{key:"待审核",value:"4"}],
            rewardType:[{key:"现金",value:"0"},{key:"优惠劵",value:"1"},{key:"优惠码", value:"2"},{key:"乐豆",value:"3"},{key:"三方商品",value:"4"},{key:"限时红包",value:"5"},{key:"企业积分",value:"6"}],
            helpCondType:[{key:"app",value:"0"},{key:"微信",value:"1"},{key:"wap",value:"2"},{key:"pc",value:"3"},{key:"小程序",value:"4"},],
            shopType:[{key:"Thanks♪商城",value:"1"},{key:"联想商城",value:"0"}]
        },

    },
}