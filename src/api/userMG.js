import axios from 'axios'
import { loginreq, req,get } from './axiosFun';

// 公司管理-获取公司列表
export const deptList = (params) => { return axios.get("/api/dbapi/marketing/invitation/getPage", params) };
// 公司管理-保存（添加编辑）
export const deptSave = (params) => { return req("post", "/api/Dept/save", params) };
// 公司管理-删除公司
export const deptDelete = (params) => { return axios.get("/api/comment/comment/newMessageAskBack/pageMsgAskClient")};


//0元购列表数据
export const OrderList = (params) => { return get("/api/openapi/lenovo.floorPirce.query",params)}
export const Appmanage = (params) => { return axios.post("api/promo/api/admin/zeropurchase/addProduct.jhtm",params)}
//删除
export const deleteProduct = (params) => {
    return get("api/promo/api/admin/zeropurchase/deleteProduct.jhtm",params)
}

// 用户管理列表
export const GetPage = (params) => {return axios.get("api/dbapi/marketing/invitation/getPage",params)}
export default{
    getPrizeList(context,params,cb){
        context.ajax.getFetch('/drawpro/draw/sector/list?drawId='+params.id).then(d=>{
            cb&&cb(d.data);
        }).catch(e=>{
            console.log("getPrizeList接口错误",e);
            context.alert.showAlert("error",e.data?e.data:"接口异常,操作失败");
        })
    }
}
