<template>
  <div id="footer" class="container-fluid">
    <!-- <div class="logo">
      <img src="@/assets/img/logo_white.png" alt="logo图">
    </div>
    <p class="title">公司企业网站模板</p> -->
    <p style="width:100%;height:50px;"></p>
    <p class="address_tel_fax">
      <span>地址：安徽省芜湖市鸠江区立宇建设，芜湖亿品众合影视产业园11层</span>
      <span>Tel：0553-5991168</span>
      <span>Fax：0553-5991168</span>
    </p>
    <p class="email_wx">
      <span>邮箱：allone@mockbird.net</span>
      <span>公司微信号：亿品众合</span>
    </p>
    <p class="copy">Copyright &copy; 2018 - 2019 芜湖·亿品众合影视文化有限公司</p>
  </div>
</template>
<script>
export default {
  name: "Footer",
  data() {
    return {};
  }
};
</script>
<style scoped>
#footer {
  width: 100%;
  height: 100%;
  color: #fff;
  background: #474747;
  overflow: hidden;
  text-align: center;
}
.logo {
  width: 95px;
  height: 45px;
  margin: 50px auto 20px;
}
.title {
  font-size: 25px;
  margin-bottom: 20px;
}
.address_tel_fax {
  color: #d3d3d3;
  font-size: 14px;
  margin: 10px 0;
}
.email_wx {
  color: #d3d3d3;
  font-size: 14px;
}
.copy {
  color: #d3d3d3;
  font-size: 14px;
  margin: 50px 0 10px;
}
@media screen and (max-width: 997px) {
  .title {
    font-size: 20px;
  }
  .address_tel_fax {
    font-size: 12px;
  }
  .email_wx {

  font-size: 12px;
}
.copy {
  font-size: 12px;
  margin: 30px 0 10px;
}
}
</style>

