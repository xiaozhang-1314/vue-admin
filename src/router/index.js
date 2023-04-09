import Vue from 'vue';
import Router from 'vue-router';
import Vuex from 'vuex';


//布局&登录
//import Login from '../pages/login/login.vue';
// const login = r => require.ensure([], () => r(require('../pages/login/login')), 'login');

import login from "../pages/login/login.vue"
import index from "../pages/index.vue"
import Goods from "../pages/goods/Goods.vue"
import Ages from "../pages/ages/Ages.vue"
import Order from "../pages/pay/Order.vue"
import User from "../pages/system/user.vue"
import Seva from "../pages/system/seva.vue"
import MachineConfig from "../pages/machine/MachineConfig.vue"
Vue.use(Router);
Vue.use(Vuex);

const routers = [
    {
		path: '/',
        name:"login",
		component: login
	},
    {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/goods/Goods',
            name: '商品管理',
            component: Goods,
            meta: {
                requireAuth: true
            }
        },
        {
           path:"/ages/Ages",
           name:"史蒂夫",
           component:Ages,
           meta:{
              requireAuth:true
           }
        },
        {
            path: '/pay/Order',
            name: '交易订单',
            component: Order,
            meta: {
                requireAuth: true
            }
        },
        {
            path:'/system/user',
            name:'用户管理',
            component:User,
            meta:{
                requireAuth:true
            }
        },
        {
            path:"/system/seva",
            name:"新建",
            component:Seva,
            meta:{
                requireAuth:true
            }
        },
        {
                path: '/machine/MachineConfig',
                name: '支付配置信息',
                component: MachineConfig,
                meta: {
                    requireAuth: true
                }
            }
]
        

        // }, {
        //     path: '/machine/MachineAisle',
        //     name: '货道信息管理',
        //     component: MachineAisle,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/pay/Order',
        //     name: '交易订单',
        //     component: Order,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/user',
        //     name: '用户管理',
        //     component: user,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Module',
        //     name: '菜单管理',
        //     component: Module,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Role',
        //     name: '角色管理',
        //     component: Role,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Dept',
        //     name: '公司管理',
        //     component: Dept,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Variable',
        //     name: '系统环境变量',
        //     component: Variable,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/system/Permission',
        //     name: '权限管理',
        //     component: Permission,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, 
        // }, {
        //     path: '/pay/Config',
        //     name: '支付配置',
        //     component: Config,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/druid/login',
        //     name: '监控查询',
        //     component: druidLogin,
        //     meta: {
        //         requireAuth: true
        //     }
        // }, {
        //     path: '/charts/statistics',
        //     name: '数据可视化',
        //     component: statistics,
        //     meta: {
        //         requireAuth: true
        //     }
        // }]
    }
   
];

const _router = new Router({
    routes: routers
});

export default _router;
