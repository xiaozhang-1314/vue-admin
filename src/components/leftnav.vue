<template>
<!-- 左侧 -->
  <el-menu default-active="2" :collapse="collapsed" collapse-transition router :default-active="$route.path"  unique-opened class="el-menu-vertical-demo" background-color="#334157" text-color="#fff" active-text-color="#ffd04b">
      <div class="logobox">
      <img class="logoimg" src="../assets/img/logo.png" alt="">
      </div>
      <el-submenu v-for="menu in allmenu" :key="menu.menuid" :index="menu.menuname">
        <template slot="title">
          <i class="iconfont" :class="menu.icon"></i>
          <span>{{menu.menuname}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item v-for="chmenu in menu.menus" :index="'/'+chmenu.url" :key="chmenu.menuid">
            <i class="iconfont" :class="chmenu.icon"></i>
            <span>{{chmenu.menuname}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
  </el-menu>
</template>

<script>
export default {
    name:'leftnav',
    data(){
      return {
        collapsed:false,
        allmenu:[]
      }
    },
    methods: {
      // handleOpen(key, keyPath) {
      //   console.log(key, keyPath);
      // },
      // handleClose(key, keyPath) {
      //   console.log(key, keyPath);
      // }
    },
   
   created(){
            // 获取图形验证码
    let res = {
      success: true,
      data: [
        {
          menuid: 1,
          icon: 'li-icon-xiangmuguanli',
          menuname: '基础管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 2,
              icon: 'icon-cat-skuQuery',
              menuname: '商品管理',
              hasThird: 'N',
              url: 'goods/Goods',
              menus: null
            },
             {
              menuid: 3,
              icon: 'li-icon-dingdanguanli',
              menuname: '活动管理',
              hasThird: 'N',
              url: 'ages/Ages',
              menus: null
            },
            {
              menuid: 7,
              icon: 'icon-cus-manage',
              menuname: '用户管理',
              hasThird: 'N',
              url: 'system/user',
              menus: null
            }
          ]
        },

        {
          menuid: 4,
          icon: 'li-icon-dingdanguanli',
          menuname: '订单管理',
          hasThird: null,
          url: null,
          menus: [
            {
              menuid: 5,
              icon: 'icon-order-manage',
              menuname: '交易订单',
              hasThird: 'N',
              url: 'pay/Order',
              menus: null
            },
               
          ]
        },
      ],
      msg: 'success'
    }
          this.allmenu = res.data
    // 监听
    //         this.$root.Bus.$on('toggle', value => {
    //             console.log(value,'EEEEEEEEEEEEEE');
    //         this.collapsed = !value
    // })
   }
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  position: absolute;
  width: 240px;
  height: 100%;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  border: none;
  text-align: left;
  height: 100%;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-bg {
  background-color: #1f2d3d !important;
}
.el-menu {
  border: none;
}
.logobox {
  height: 40px;
  line-height: 40px;
  color: #9d9d9d;
  font-size: 20px;
  text-align: center;
  padding: 20px 0px;
}
.logoimg {
  height: 40px;
}
</style>