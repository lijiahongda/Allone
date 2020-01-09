<template>
  <div id="ServiceDetail">
    <div class="banner container-fuild text-center">亿品众合与首都纪录片发展协会在京签约</div>
    <div class="container">
      <div class="row">
        <!-- <div class="col-xs-12 col-sm-12 col-md-3" id="myScrollspy">
          <ul class="nav nav-tabs nav-stacked center-block" id="myNav">
            <p>特色服务</p>
            <li
              :class="item.id==id?'active':''"
              v-for="(item,index) in serviceNavList"
              :key="index"
            >
              <a :href="'#'+item.id">{{item.title}}</a>
            </li>
          </ul>
        </div>-->
        <div class="col-xs-12 col-sm-12 col-md-9 content wow zoomIn">
          <div class="content-block">
            <h2>亿品众合与首都纪录片发展协会在京签约</h2>
            <div>
              <img src="http://img.mockbird.top/1575521840027800.png" alt="news" />
              <p>2019年8月23日，由国家广播电视总局宣传司、北京市委宣传部指导，北京市广播电视局主办，首都纪录片发展协会、北京广播电视台等单位承办的第三届北京纪实影像周在北京举办。</p>
              <img src="http://img.mockbird.top/1575521873928492.png" alt="news" />
              <p>国家广播电视总局、北京市委宣传部、北京市广播电视局等相关单位领导，各省广电局领导、全国纪录片行业代表、首都纪录片发展协会会员单位、受邀驻华外国使馆来宾、受邀海外制作人等重要领导、影视行业资深人士出席此次北京纪实影像周。张晞临、许晴、濮存昕、沈腾、常远、江一燕、杜江、曹卫宇、侯传杲、杨幂、石文中等影视界、演绎届大咖纷纷送上祝福。</p>
              <p>8月23日--8月25日为本届纪实周的主体活动，共分为开幕、论坛、市场、展览、展映、国际、培训、征集及闭幕九大板块。</p>
              <img src="http://img.mockbird.top/1575521922751161.png" alt="news" />
              <p>“北京纪实影像周”作为北京纪录片创新管理服务的重要抓手和平台，创办于 2017 年，至今已成功举办两届。“北京纪实影像周”融思想性、艺术性、观赏性于一体，科学整合了首都及国内纪实产业重要资源，内容囊括专业论坛、展播展映、项目洽商、人才培养、提案征集、国际交流等多种方面，专业性强、业内参与广泛、社会反响积极。</p>

              <img src="http://img.mockbird.top/1575521941507762.png" alt="news" />
              <p>2019年北京纪实影像周将紧紧围绕“庆祝新中国成立70周年”这条主线，以“壮丽七十年 记录新时代”为主题，全面展示纪实产业发展成就，探索发展特点规律，激发社会力量共同打造纪录片“黄金时代”。</p>
              <img src="http://img.mockbird.top/1575521959883775.png" alt="news" />
              <p>北京亿品众合互联网科技有限公司与芜湖亿品众合影视文化产业有限公司应首都纪录片发展协会邀请，在市场板块的签约环节上签署战略合作协议。双方将携手打造长江沿岸纪录片文化产业带，推动纪录片行业的健康蓬勃发展。</p>
              <img src="http://img.mockbird.top/1575521983587683.png" alt="news" />
              <p>亿品众合与首都纪录片发展协会曾于2018年12月20日、2019年7月11日签署合协议。本次在2019年北京纪实影像周的战略合作签约仪式，将双方扶持中国纪录片发展的计划推向新高度。</p>
              <img src="http://img.mockbird.top/1575521999000775.png" alt="news" />
              <p>亿品众合总裁陈伟忠表示：亿品众合自成立以来，一直致力于自身多年的资源整合，颠覆行业内传统商业模式，打破行业内天花板，打造为影视人服务的资源共享型服务平台。现在，亿品众合将利用旗下嘲鸟APP、嘲鸟超前购、嘲鸟观影卡等嘲鸟生态链线上工具与“亿品星空智能云屏”等线下工具，结合芜湖“众合空间”的政策优势，整合行业内资源，与首都纪录片发展协会共同推动中国纪录片发展，打造长江沿岸纪录片文化产业带，提升纪录片的社会价值与经济价值。</p>
              <img src="http://img.mockbird.top/1575522022587379.png" alt="news" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "news1",
  data() {
    return {};
  },
  mounted() {
    // this.id = this.$route.params.id;
    // var top = document.getElementById(this.id).offsetTop;
    $(window).scrollTop(top + 300);
    $("#myNav").affix({
      offset: {
        top: 0
      }
    });
    // var wow = new WOW();
    // wow.init();
  }
};
</script>
<style scoped>
.banner {
  color: #fff;
  font-size: 30px;
  height: 150px;
  line-height: 150px;
  background-image: url("../assets/img/banner_2.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  background-attachment: scroll;
  background-position: center center;
}
ul.nav-tabs {
  width: 200px;
  margin-top: 40px;
  border-radius: 4px;
  background: #fff;
  z-index: 99999;
  border: 1px solid #474747;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.067);
}
ul.nav-tabs li {
  text-align: center;
  margin: 0;
  border-top: 1px solid #474747;
}
ul.nav-tabs p {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  background: #474747;
  margin: 0;
  padding: 10px 0;
}
ul.nav-tabs li:first-child {
  border-top: none;
}
ul.nav-tabs li a {
  margin: 0;
  padding: 8px 16px;
  border-radius: 0;
}
ul.nav-tabs li.active a,
ul.nav-tabs li.active a:hover {
  color: #fff;
  background: #474747;
  border: 1px solid #474747;
}
ul.nav-tabs li:first-child a {
  border-radius: 4px 4px 0 0;
}
ul.nav-tabs li:last-child a {
  border-radius: 0 0 4px 4px;
}
ul.nav-tabs.affix {
  top: 30px;
}
.content-block {
  margin: 50px 0;
}
.content-block > h2 {
  padding: 20px 0;
  border-bottom: 1px solid #ccc;
}
</style>
