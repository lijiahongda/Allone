<template>
  <div id="ServiceDetail">
    <div class="banner container-fuild text-center">亿品众合</div>
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
            <h2>谁是亿品众合</h2>
            <div>
              <p>北京亿品众合互联网科技有限公司正式启动于2018年8月，由影视、院线资深人士陈伟忠先生发起创立。作为一家互联网+影视、文化、娱乐于一体的新兴科技企业，亿品众合将自身多年的资源整合，颠覆行业内传统商业模式，打破行业内天花板，解决海内外中小影视企业痛点，致力于打造为影视人服务的资源共享型服务平台。因为其对影视行业开创性的发展理念及战略布局，亿品众合创立不久就引起业内外的极大兴趣。</p>

              <img src="http://img.mockbird.top/1575520433383303.png" alt="news" />
              <p>在2018年8月底台湾举行的第58届亚太影展及9月中上旬举行的第43届多伦多电影节上，亿品众合获得了海内外同行的赞誉和合作意向。</p>
              <img src="http://img.mockbird.top/1575520494922410.png" alt="news" />
              <p>2018年12月20日，亿品众合在北京股权交易中心挂牌登陆“新四板”。同日，亿品众合与多家业内外企业、组织团体签署战略合作协议，强强联合，利用互联网+、大数据技术从多方面推动中国影视行业创新转型、优化资源配置、搭建影视产业信用体系、升级产业模式，帮助国内外影视公司度过行业寒冬。</p>

              <img src="http://img.mockbird.top/1575520510495537.png" alt="news" />
              <p>2019年3月15日，亿品众合旗下嘲鸟APP（iOS版）正式上线。随后，4月24日，嘲鸟APP（安卓版）也正式上线。</p>
              <img src="http://img.mockbird.top/1575520539989088.png" alt="news" />
              <p>iOS版下载</p>
              <img src="http://img.mockbird.top/1575520553018038.png" alt="news" />
              <p>安卓版下载</p>
              <p>2019年4月18日，亿品众合与芜湖市鸠江区人民政府战略合作签约仪式在第九届北京国际电影节举行。双方将通过深入合作，吸引影视行业各环节及相关联的公司在芜湖生根，营造长三角地区新的影视文化艺术氛围圈，打造长三角一体化发展文化产业中心的新引擎。此次战略合作也标志着，亿品众合影视产业战略布局进入新起点与新高度。</p>

              <img src="http://img.mockbird.top/1575520568638467.png" alt="news" />
              <p>2019年5月7日，亿品众合芜湖考察团前往芜湖市鸠江区进行为期五日的实地考察。这次考察活动是4月18日亿品众合与鸠江区政府在第九届北京国际电影节上战略合作签约的后续动作，是双方推动“全国独家、世界领先的芜湖影视产业”城市发展战略的第一枪。</p>

              <img src="http://img.mockbird.top/1575520586889681.png" alt="news" />
              <p>亿品众合预备将芜湖市打造成中国电影第一城，囊括影视制作、影视版权、影视宣发、影视投资、影视广告、电影衍生品等影视行业的方方面面，给予芜湖市新的发展定位，开拓“文化+ 旅游”、“文化+科技”、“文化+环保”等新理念、新领域，打造芜湖“文化轻资产、科技感、绿色环保”的城市新名片。</p>

              <img src="http://img.mockbird.top/1575520605003084.png" alt="news" />
              <p>2019年6月28日，亿品众合旗下嘲鸟超前购小程序正式上线，一经上线立即受到行业内广泛关注，全国38座城市、80+影院，多个场次放出后迅速售罄，首周上映三天累计数千观众齐刷电影，持续助力电影口碑发酵，《扫毒2：天地对决》获得了不俗的成绩。</p>

              <img src="http://img.mockbird.top/1575520620251518.png" alt="news" />
              <p>2019年7月11日，亿品众合与芜湖市鸠江区人民政府联合举办的“2019芜湖5G电影城市打造全国首家电影城市——亿品众合入驻芜湖市鸠江区揭牌签约仪式“在安徽省芜湖市举行。亿品众合影视产业园正式入驻芜湖，众合空间应运而生，致力于打造一种全新体验的工作方式、环境和资源配套，专为时下年轻创业者和团队提供服务。</p>

              <img src="http://img.mockbird.top/1575520640761192.png" alt="news" />
              <p>亿品众合通过线上工具嘲鸟生态圈与线下专业团队的配合，进行全球战略布局，致力打造影视版权交易、影视宣发、影视广告、影视融资、运营服务、海外影视项目版权合作于一体的商业模式，为影视行业的发展发挥最大的力量。</p>
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
