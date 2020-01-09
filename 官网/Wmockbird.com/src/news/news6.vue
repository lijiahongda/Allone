<template>
  <div id="ServiceDetail">
    <div class="banner container-fuild text-center">亿品众合一周岁啦！</div>
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
            <h2>亿品众合一周岁</h2>
            <div>
              <img src="http://img.mockbird.top/1575521076311368.png" alt="news" />
              <p>时光飞逝，恍如白驹过隙</p>
              <p>转眼又是仲夏</p>
              <p>亿品众合迎来了自己一周岁的生日</p>
              <img src="http://img.mockbird.top/1575521106201157.png" alt="news" />
              <p>遥想去年今日</p>
              <p>恍若隔世</p>
              <p>一群志同道合的有志之士聚集一堂</p>
              <p>愿以小小身躯发挥无限势能</p>
              <img src="http://img.mockbird.top/1575521121086716.png" alt="news" />
              <p>一年耕耘</p>
              <p>硕果丰盈</p>
              <p>排除万难</p>
              <p>收获喜悦</p>
              <p>在众志成城的努力下</p>
              <p>亿品众合逐渐取得了现在的成绩</p>
              <p>>初始阶段</p>
              <p>2018.9 董事长陈伟忠参加第58届亚太影展及第43届多伦多电影</p>
              <p>2018.12.20 亿品众合与海内外多家组织、企业签署战略合作协</p>
              <p>2018.12.20 亿品众合成功挂牌新四板</p>
              <p>>飞速发展阶段</p>
              <p>2019.4.18 亿品众合与芜湖市鸠江区人民政府签署战略合作协议</p>
              <p>2019.7.11 众合空间在芜湖挂牌签约</p>
              <p>2019.3.15 嘲鸟APP正式上线</p>
              <p>2019.6.28 嘲鸟超前购小程序上线</p>
              <p>为了犒劳兢兢业业的员工</p>
              <p>公司以小米“黑科技”作为礼物</p>
              <p>奖励员工一年以来的辛勤工作</p>

              <img src="http://img.mockbird.top/1575521138713714.png" alt="news" />
              <p>亿品众合一路走来有挫折有收获</p>
              <p>可以取得今天的成绩</p>
              <p>需要感谢各界朋友、合作伙伴</p>
              <p>给予我们关注、支持与鼓励</p>
              <img src="http://img.mockbird.top/1575521160005659.png" alt="news" />
              <p>在新的一岁里</p>
              <p>亿品众合不忘初心，继续前进</p>
              <p>在互联网+影视行业深耕</p>
              <p>以5G、AI、大数据技术</p>
              <p>推动影视行业新兴升级</p>
              <p>与各合作方资源共享，携手共进！</p>

              <img src="http://img.mockbird.top/1575521178296303.png" alt="news" />
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
