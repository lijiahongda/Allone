<template>
  <div id="ServiceDetail">
    <div class="banner container-fuild text-center">第22届上海国际电影节开幕，亿品众合带您一览精彩</div>
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
            <h2>第22届上海国际电影节</h2>
            <div>
              <img src="http://img.mockbird.top/1575517561659148.png" alt="news" />
              <p>2019年6月15日，第22届上海国际电影节（以下简称上海电影节）盛大开幕。作为一年一度的国际电影节，上海电影节受到了国内外影视行业人员、电影爱好者的关注。</p>
              <img src="http://img.mockbird.top/1575517605985104.png" alt="news" />
              <p>亿品众合商务小分队也顺利抵达活动现场，为朋友们带来了第一手的新鲜资讯。</p>
              <img src="http://img.mockbird.top/1575517638578882.png" alt="news" />
              <h3>为祖国70华诞献礼</h3>
              <p>本届上海电影节围绕庆祝新中国成立70周年，把礼赞新中国、奋进新时代的主线贯穿始终，在举办“光影七十年·共筑强国梦”中国电影产业高峰论坛同时，还设置了“光影记忆、时代经典”特别展映单元，让广大观众重温70年来祖国发展强大的不平凡历程。</p>
              <img src="http://img.mockbird.top/1575517660872754.png" alt="news" />
              <h3>扩大“一带一路”电影圈</h3>
              <p>本届上海电影节坚持“立足亚洲”这一定位，吸纳时代精华，展示更多跨越时空、富有魅力的亚洲电影成果。上海电影节也将继续扩大“一带一路”朋友圈，促进亚洲各国电影人和电影文化的互联互通、互学互鉴，加深对彼此文化的理解和欣赏，更好地展示和传播文明之美，夯实共建亚洲命运共同体、人类命运共同体的人文基础。</p>
              <img src="http://img.mockbird.top/1575517686502517.png" alt="news" />
              <p>今年的 “一带一路”电影节联盟迎来7位新成员，目前联盟成员共有33个国家的38个电影节； “一带一路”电影人也将深入参与电影市场放映和创作活动，与中国电影人广泛对话；同时，今年“一带一路”电影周将展映来自24个国家的24部优秀影片。</p>
              <img src="http://img.mockbird.top/1575517707510860.png" alt="news" />
              <h3>打造国际电影平台</h3>
              <p>随着国际影响力和文化传播力不断提升，本届上海电影节收到来自全球112个国家和地区的报名影片3964部，500多部中外影片将在全市16个区的47家影院展映。</p>
              <img src="http://img.mockbird.top/1575517728477948.png" alt="news" />
              <p>上海电影节致力于打造成为全球影视人的交流平台、中国影视产业的助推平台、影视新人的培育平台、影视文化的传播平台和影视成果的共享平台。</p>
              <img src="http://img.mockbird.top/1575517769330130.png" alt="news" />
              <h3>亿品众合助力影视行业新发展</h3>
              <p>亿品众合旗下嘲鸟APP已正式上线，致力于解决海内外中小影视企业的痛点，垂直连接影院与片方，打造资源共享型平台。</p>
              <img src="http://img.mockbird.top/1575517787651681.png" alt="news" />
              <p>亿品众合为响应国家“一带一路”的号召，配合上海电影节的开放、包容、国际的理念，面向中国影视企业开展了海外影视项目版权合作。</p>
              <img src="http://img.mockbird.top/1575517805226617.png" alt="news" />
              <p>为全面助力中国影视走向世界，亿品众合携手2019多伦多国际电影节，打造首届中国影视文化国际交流展，为中外影视人提供沟通、合作的文化桥梁。</p>
              <img src="http://img.mockbird.top/1575517826465750.png" alt="news" />
              <p>以上三项合作正在火热进行中，有合作意愿的朋友快来亿品众合咨询吧！</p>
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
