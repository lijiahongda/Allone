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
        <div class="col-xs-12 col-sm-12 col-md-12 content wow zoomIn">
          <div class="content-block">
            <h2>亿品众合与首都纪录片发展协会在京签约</h2>
            <div>
              <p>2019年第44届多伦多国际电影节于当地时间9月5日启幕，本届电影节为期11天，将展映来自全球各地的逾300部电影，其中包括来自中国的6部作品，共有来自几十个国家的代表团参加。在此次电影节展会上，由北美文化艺术交流协会主办、北京亿品众合互联网科技有限公司承办的“中国影视文化国际交流展”首次亮相。</p>

              <img src="http://img.mockbird.top/1575523107458177.png" alt="news" />
              <p style="text-align:center;">中国影视文化交流展</p>
              <p>2018年，亿品众合在第43届多伦多国际电影节上首次亮相之后，短短一年时间，再次出征多伦多，带领国内优秀影视企业及作品走出国门，向世界讲述中国故事。</p>
              <img src="http://img.mockbird.top/1575523120799691.png" alt="news" />
              <p style="text-align:center;">参加多伦多的各个公司</p>
              <p>此次应邀参加的公司有文化中国传媒股份有限公司、北京新影联影业有限责任公司、首都之星艺术影厅联盟等国有控股公司；天意影视、强视传媒等民营上市公司及一些新锐公司，还有专注女性动作片电影拍摄制作的上海瑞趋文化传媒有限公司，专注于文艺片制作的北京乔美电影传媒有限公司等十余家企业参展。</p>

              <img src="http://img.mockbird.top/1575523134407343.png" alt="news" />
              <p style="text-align:center;">亿品众合董事长陈伟忠亮相</p>
              <p style="text-align:center;">2019多伦多国际电影节</p>
              <p>随着中国电影产业的蓬勃发展，中国电影作品走向国际正稳步进入“快车道”，中国电影人与国外同行的交流不断增加，活动主办方北美文化艺术交流协会表示：“希望通过这次展会，为中外电影公司搭建合作交流的平台，也希望中国电影人通过电影艺术的手段，向世界讲述中国故事。</p>

              <img src="http://img.mockbird.top/1575523150194383.png" alt="news" />
              <p style="text-align:center;">亿品众合董事长陈伟忠正在接受采访</p>
              <p>董事长陈伟忠在接受采访时表示：亿品众合自成立以来，一直致力于自身多年的资源整合，为国内外影视人服务。此次代表公司再次参加多伦多国际电影节是为了交流和学习，同时在“首届中国国际影视文化交流展”期间，把更多中国优秀的影视公司和作品展现给世界，为这些出色作品及公司提供一个向世界展示的舞台。目前，由亿品众合旗下自主研发的“嘲鸟”系列互联网产品陆续上线，我们将利用互联网思维和方式继续服务于电影行业的上、中、下游，打造影视全产业链闭环，为下一个产业新风口推波助澜。</p>
              <img src="http://img.mockbird.top/1575523162959207.png" alt="news" />
              <p style="text-align:center;">中国影视文化国际交流展参展方合影</p>
              <p>创办于1976年的多伦多国际电影节以展映大量影片为主要特色。在以往的多伦多电影节期间，由观众票选的“人民选择奖”获奖片常常能在次年斩获奥斯卡“小金人”，从而令该电影节被业界视为奥斯卡“风向标”。</p>
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
