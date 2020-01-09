<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      @select="routerGO"
      :collapse-transition="true"
      :collapse="collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
    >
      <el-menu-item index="dashboard" key="dashboard">
        <i class="el-icon-lx-home"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <!-- 
      <template v-for="item in items">
        <template v-if="item.child">
          <el-submenu :index="item.index" :key="item.index">
            <template slot="title">
              <i :class="`el-icon-lx-${item.css}`"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.child">
              <el-submenu v-if="subItem.child" :index="subItem.index" :key="subItem.index">
                <template slot="title">{{ subItem.name }}</template>
                <el-menu-item
                  v-for="(threeItem,i) in subItem.child"
                  :key="i"
                  :index="threeItem.index"
                >{{ threeItem.name }}</el-menu-item>
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.name }}</el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="`el-icon-lx-${item.css}`"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>-->
      <!-- 二级 -->
      <el-submenu :index="item.index" v-for="item in routes" :key="item.id">
        <template slot="title">
          <i :class="`el-icon-lx-${item.css}`"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            :index="opk.index"
            v-for="(opk , opkindex)  in item.child"
            :key="opkindex+item.child"
          >{{opk.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <!-- 一级 -->
      <el-submenu index="Business_functions">
        <template slot="title">
          <i class="el-icon-lx-apps"></i>
          <span>业务功能</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.index" v-for="item in route" :key="item.id">
            <i :class="`el-icon-lx-${item.css}`"></i>
            <span>{{item.name}}</span>
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import bus from "../common/bus";
import store from "@/store/index.js";
import { getTabList } from "@/api/http/user";
export default {
  data() {
    return {
      collapse: false,
      routes: [],
      route: []
    };
  },
  computed: {
    onRoutes() {
      return this.$route.path.replace("/", "");
    }
  },
  created() {
    // 通过 Event Bus 进行组件间通信，来折叠侧边栏
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });
  },
  methods: {
    routerGO(key, keyPath) {
      let oIndex = key.trim();
      switch (oIndex) {
        //主页
        case "dashboard":
          this.$router.replace({ path: "/dashboard" });
          break;
        //系统
        //菜单
        case "Menu":
          this.$router.replace({ path: "/Menu" });
          break;
        //角色
        case "Role":
          this.$router.replace({ path: "/Role" });
          break;
        //权限
        case "Authority":
          this.$router.replace({ path: "/Authority" });
          break;
        //Client管理
        case "Client-management":
          this.$router.replace({ path: "/ClientManagement" });
          break;
        //用户管理
        //用户查询
        case "User-query":
          this.$router.replace({ path: "/Userquery" });
          break;
        //用户审核
        case "User_audit":
          this.$router.replace({ path: "/Useraudit" });
          break;
        //文件查询
        case "File-query":
          this.$router.replace({ path: "/Filequery" });
          break;
        //邮件管理
        case "Mail-management":
          this.$router.replace({ path: "/Mailmanagement" });
          break;
        //注册中心
        case "Registry":
          this.$router.replace({ path: "/RegistryCenter" });
          break;
        //监控中心
        case "Monitoring-center":
          this.$router.replace({ path: "/monitoringCenter" });
          break;
        //接口文档
        case "Swagger-document":
          this.$router.replace({ path: "/Interfacedocument" });
          break;
        //黑名单IP
        case "Blacklist-IP":
          this.$router.replace({ path: "/Blacklist" });
          break;
        //日志查询
        case "Log-query":
          this.$router.replace({ path: "/Logquery" });
          break;
        //短信历史查询
        case "SMS-history-query":
          this.$router.replace({ path: "/SMSquery" });
          break;
        //CMS管理
        //文章类型
        case "Article-type":
          this.$router.replace({ path: "/CMStype" });
          break;
        //文章列表
        case "Article-list":
          this.$router.replace({ path: "/CMSlist" });
          break;
        //平台广告
        case "Push-adv":
          this.$router.replace({ path: "/Pushadv" });
          break;
        //订单管理
        //院方订单
        case "Cinema_order":
          this.$router.replace({ path: "/Cinemaside" });
          break;
        // //片方订单
        // case "Documentary_order":
        //   this.$router.replace({ path: "/Producer" });
        //   break;
        //院线管理
        case "Cinema-Management":
          this.$router.replace({ path: "/LineManagement" });
          break;
        //院线管理
        case "banner_edit":
          this.$router.replace({ path: "/Banner" });
          break;
        //影院管理
        case "lang-Management":
          this.$router.replace({ path: "/CinemaManagement" });
          break;
        //广告管理
        //广告类型
        case "Advertising-type":
          this.$router.replace({ path: "/Advtype" });
          break;
        // 广告列表
        case "Advertising-list":
          this.$router.replace({ path: "/Advlist" });
          break;
        // 排片管理
        case "Film-management":
          this.$router.replace({ path: "/ListOFtasks" });
          break;
         // 拍片管理
         //发布排片
        case "Release-layout":
          this.$router.replace({ path: "/ReleaseLayout" });
          break;
          //排片订单
        case "Order-sheet":
          this.$router.replace({ path: "/OrderSheet" });
          break;
        // 企业管理
        case "enterprise-authentication":
          this.$router.replace({ path: "/Businessmanagement" });
          break;
        // 公司库
        case "Company-library":
          this.$router.replace({ path: "/Companylibrary" });
          break;
        // 影人库
        case "Shadow-Man-Library":
          this.$router.replace({ path: "/FilmGallery" });
          break;
        //数据统计
        // 票房统计
        case "Box-office-statistics":
          this.$router.replace({ path: "/boxOffice" });
          break;
        // 排片数据
        case "Layout-data":
          this.$router.replace({ path: "/ChipFormation" });
          break;
        //数据录入
        // 艺恩数据录入
        case "Eun-data-entry":
          this.$router.replace({ path: "/Eunen" });
          break;
        // 影院院线数据录入
        case "Cinema-cinema-data-entry":
          this.$router.replace({ path: "/Cinemacinema" });
          break;
        // 宣发预算表
        case "Budget-statement":
          this.$router.replace({ path: "/Declarehair" });
          break;
        // 餐饮云屏录入
        case "Catering_cloud_screen":
          this.$router.replace({ path: "/catering" });
          break;
        // 物料管理
        case "Material-management":
          this.$router.replace({ path: "/materialmanagement" });
          break;
        // 影片管理
        //影片列表
        case "Film-list":
          this.$router.replace({ path: "/Movielist" });
          break;
        // 星空管理
        //星空投放资源列表
        case "Star_aunch":
          this.$router.replace({ path: "/StarAunch" });
          break;
        //星空云屏列表
        case "Starry_sky":
          this.$router.replace({ path: "/StarrySky" });
          break;
           // 积分管理（主）
        //积分列表
        case "Integral_list":
          this.$router.replace({ path: "/Integralist" });
          break;
        //星空餐饮云屏列表
        case "Restaurant":
          this.$router.replace({ path: "/Restaurant" });
          break;
        //消息
        case "mb_message":
          this.$router.replace({ path: "/mbmessage" });
          break;
        //积分管理
        case "Integral_management":
          this.$router.replace({ path: "/integralmanagement" });
          break;
        //交易记录
        //充值记录
        case "cha_Recharge":
          this.$router.replace({ path: "/charecharge" });
          break;
        //提现记录
        case "tu_Recharge":
          this.$router.replace({ path: "/turecharge" });
          break;
        //出错
        default:
          this.$router.replace({ path: "/404" });
      }
    }
  },
  mounted() {
    let _self = this;
    let usertoken = localStorage.getItem("admin_token");
    // let usertoken = store.getters.token;
    getTabList(usertoken).then(res => {
      if (res.status == 200) {
        // console.log(res.data)
        let arra = [];
        let arrb = [];
        res.data.forEach(v => {
          if (!v.child) {
            arra.push(v);
          } else {
            arrb.push(v);
          }
        });
        _self.routes = arrb;
        _self.route = arra;
      } else {
        alert("出错了");
      }
    });
  }
};
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
/deep/ .el-menu-item-group__title {
  display: none;
}
</style>