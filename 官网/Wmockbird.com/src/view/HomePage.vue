<template>
  <div id="HomePage">
    <!-- 轮播图 -->
    <div id="swiper" class="container-fuild">
      <div class="swiper-container banner-swiper">
        <div class="swiper-wrapper">
          <div class="swiper-slide" v-for="(item,index) in swiperList" :key="index">
            <img class="swiper-lazy" :data-src="item.img" alt="轮播图" />
            <div class="swiper-lazy-preloader"></div>
            <div class="swiper-slide-title">
              <h1>{{item.title}}</h1>
              <p>{{item.content}}</p>
            </div>
          </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
      </div>
    </div>
    <!-- 大数据管理系统 -->
    <div id="bigData" class="container-fuild">
      <div class="row bigData-container">
        <div class="col-xs-12 col-sm-12 col-md-6 wow zoomIn">
          <img class="img-responsive" src="@/assets/image/sf1.jpg" alt="大数据管理系统" />
        </div>
        <div class="col-xs-12 col-sm-12 col-md-6">
          <h2 class="bigData-title">芜湖·亿品众合影视产业园</h2>
          <p>为贯彻落实党十九大关于“倡导创新文化，强化知识产权创造与保护”工作，响应习近平总书记“关于支持长江三角洲区域一体化发展并上升为国家战略”重要指示下，经安徽省芜湖市政府、鸠江区政府批准和支持，亿品众合打造了芜湖·亿品众合影视产业园，结合芜湖城市特色，以“搭平台、建基地、聚人才、塑品牌”为发展思路，建设影视产业聚集区，最终将芜湖打造成为中国首家5G电影城市。</p>
          <p>芜湖·亿品众合影视产业园以低成本、轻资产、便利化、大众创业、万众创新为宗旨，为影视行业创业者和团队提供从办公配套、政策扶持、项目落地、企业融资、影视产业基金等一站式服务，重点扶持中小影视企业，切实解决中小影视企业发展痛点，助力芜湖城市转型和发展，成就芜湖影视文化新名片，融入长三角区域一体化发展和长三角文化中心建设。</p>
        </div>
      </div>
    </div>
    <!-- 您身边的IT专家 -->
    <div id="contactUs" class="container-fuild text-center" style="position:relative;">
      <div class="container contactUs-container wow slideInUp">
        <!-- <h1>您身边的IT专家</h1>
        <h3>7x24小时提供出色的IT服务</h3>-->
        <!-- <button
          class="btn btn-default btn-sm"
          onmouseleave="this.style.borderColor='#ffffff'; this.style.backgroundColor='#ffffff'; this.style.color='#3f3f3f';"
          onmouseenter="this.style.backgroundColor='transparent'; this.style.borderColor='#ffffff'; this.style.color='#ffffff';"
        >联系我们</button>-->
        <!-- <div class="contactUs-contactWay">
          <span></span>
          <span></span>
          <span></span>
        </div>-->
      </div>
      <div
        class="con_mengceng"
        style=" position: absolute;top: 0;left: 0;z-index: 999999999;width: 100%;height: 100%;color: #fff;background: rgba(51, 51, 51, 0.534);text-align: center;line-height: 80px;"
      ></div>
    </div>
    <!-- 客户评价 -->
    <!-- <div id="customer" class="container-fuild">
      <div class="container customer-container">
        <p class="customer-title text-center">团队介绍</p>
        <div class="container" style="margin-bottom:20px;">
            <div class="row CompanyIntroduction-container">
                <div class="col-xs-12 col-sm-12 col-md-6 wow zoomIn">
                    <img class="img-responsive center-block" src="@/assets/image/88888.png">
                </div>
                <div class="col-xs-12 col-sm-12 col-md-6" style="line-height: 39px;margin-top: 165px;">
                    <h3>陈伟忠 董事长</h3>
                    <p class=".text-justify">亿品众合的创始人及董事长陈伟忠先生是国内著名影视出品人、制片人、监制、策划人、发行人。深耕影视行业多年，在影视行业有丰富的资源和人脉</p>
                </div>
            </div>
        </div>
        <div class="swiper-container customer-swiper hidden-xs">
          <div class="swiper-wrapper">
            <div class="swiper-slide customer-block" style="height:400px;">
              <div class="customer-logo">
                <img class="center-block" src="@/assets/image/88888.png" alt="logo" />
              </div>
              <h3 style="text-align:center;font-size:20px;">陈伟忠 董事长</h3>
              <div class="customer-content1">
                <small>亿品众合的创始人及董事长</small>
                <small>陈伟忠先生是国内著名影视出品人、制片人、监制、策划人、发行人。</small>
                <small>深耕影视行业多年，在影视行业有丰富的资源和人脉</small>
              </div>
            </div>
            <div class="swiper-slide customer-block" style="height:400px;">
              <div class="customer-logo">
                <img class="center-block" src="@/assets/image/r1.png" alt="logo" />
              </div>
              <h3 style="text-align:center;font-size:20px;">孙靖 执行总裁</h3>
              <div class="customer-content1">
                <small>营销策划专家。</small>
                <small>曾就职于中博传媒、天下兄弟等国内头部影视公司。拥有十多年影视行业从业经验，丰富的影院资源，曾参与多个电影、电视剧项目的制作和运营，案例众多。</small>
                <small>熟悉影视及互联网行业动态，擅于分析市场及行业痛点，从用户角度找到解决方案。</small>
              </div>
            </div>
            <div class="swiper-slide customer-block" style="height:400px;">
              <div class="customer-logo">
                <img class="center-block" src="@/assets/image/r2.png" alt="logo" />
              </div>
              <h3 style="text-align:center;font-size:20px;">李佳遥 影视产业园总经理</h3>
              <div class="customer-content1">
                <small>先后进入国内植入广告行业龙头公司合润传媒，担任内容营销中心总经理，以及在国内首家中文视频海外新媒体运营公司东方嘉禾负责海内外影视资源整合与运营。均为公司一手搭建了影视公司资源平台，与全国300多家影视制片公司、及媒体保持了良好的关系，熟悉并掌握影视制作市场动态、特点和发展趋势；影视、媒体资源丰富，了解各重点制片公司的制作规律。</small>
              </div>
            </div>
            <div class="swiper-slide customer-block" style="height:400px;">
              <div class="customer-logo">
                <img class="center-block" src="@/assets/image/r3.png" alt="logo" />
              </div>
              <h3 style="text-align:center;font-size:20px;">袁德民 技术总监</h3>
              <div class="customer-content1">
                <small>10多年的互联网技术开发和项目管理经验，全栈工程师，擅长分布式架构和大数据处理，主要负责公司技术框架搭建，产品的设计和大数据的分析以及平台瓶颈问题的解决。有创业经验，个人主导的垂直精品电商曾获投资企业200万投资意向。</small>
              </div>
            </div>
            <div class="swiper-slide customer-block" style="height:400px;">
              <div class="customer-logo">
                <img class="center-block" src="@/assets/image/r4.png" alt="logo" />
              </div>
              <h3 style="text-align:center;font-size:20px;">孟捷 投资总监</h3>
              <div class="customer-content1">
                <small>上海外国语大学法语学士和法国里昂商学院金融硕士。</small>
                <small>拥有多年跨国企业和金融行业从业经验。先后担任法国上市公司Schobrunn Paris中国区副总裁，负责公司在中国的投行业务及业务拓展，以及北京银宏投资集团投资副总裁，负责集团与丹麦哥本哈根市政府一起投资的创新孵化中心的VC/PE项目。孟捷先生也曾在中国法国工商会担任商务经理，负责法国在华企业与中国企业之间的合作拓展，并在上海罗斯柴尔德私募基金担任分析师职务，负责参与中欧跨境并购项目。</small>
              </div>
            </div>
          </div>
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
      </div>
    </div>-->
    <!-- 团队介绍 -->
    <div id="customer" class="container-fuild">
      <div class="container customer-container">
        <p class="customer-title text-center">团队介绍</p>
        <div class="swiper-container customer-swiper hidden-xs">
          <div class="swiper-wrapper">
            <div
              class="swiper-slide customer-block"
              v-for="(item,index) in customerList"
              :key="index"
              style="height:450px;"
            >
              <div class="customer-logo">
                <img class="center-block" :src="item.logo" alt="logo" />
              </div>
              <!-- <div class="customer-yh">
                <img src="@/assets/img/yinhao.png" alt="引号">
              </div>-->
              <div class="customer-content2">{{item.title}}</div>
              <div class="customer-content1">
                <small>{{item.content}}</small>
              </div>
              <div class="customer-content1">
                <small>{{item.content1}}</small>
              </div>
              <div class="customer-content1">
                <small>{{item.content2}}</small>
              </div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>
        </div>
        <div class="row visible-xs customer-block">
          <div class="col-xs-12" v-for="(item,index) in customerList" :key="index">
            <div class="customer-logo">
              <img class="center-block" :src="item.logo" alt="logo" />
            </div>
            <div class="customer-yh">
              <img src="@/assets/img/yinhao.png" alt="引号" />
            </div>
            <div class="customer-content1">
              <small>{{item.content}}</small>
            </div>
            <div class="customer-content2">
              <small>{{item.title}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 为什么选择我们 -->
    <div id="whyChooseUs" class="conatiner-fuild">
      <div class="container">
        <div class="whyChooseUs-title text-center">
          <p>友情链接</p>
          <!-- <p>THE REASON TO CHOOSING US</p> -->
        </div>
        <div class="row">
          <div
            class="col-xs-12 col-sm-6 col-md-4 server-wrapper"
            v-for="(item,index) in serverList"
            :key="index"
          >
            <div
              class="server-block wow slideInUp"
              onmouseenter="this.style.color='#28f';this.style.borderColor='#28f'"
              onmouseleave="this.style.color='#666';this.style.borderColor='#ccc'"
              @click="See(item.url)"
            >
              <img class="center-block" :src="item.logo" alt="logo" />
              <p class="text-center">{{item.title}}</p>
              <div
                class="text-center"
                v-html="item.content"
                onmouseenter="this.style.color='#28f'"
                onmouseleave="this.style.color='#ccc'"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper";
import { WOW } from "wowjs";
export default {
  name: "HomePage",
  data() {
    return {
      swiperList: [
        {
          img: require("@/assets/image/b3.jpg"),
          path: "",
          title: "芜湖亿品众合影视产业园",
          content: "为影视人服务的平台"
        },
        {
          img: require("@/assets/image/b4.jpg"),
          path: "",
          title: "暂无",
          content:
            "宣传简介宣传简介宣传简介宣传简介宣传简介宣传简介宣传简介宣传简介"
        }
      ],
      customerList: [
        {
          logo: require("@/assets/image/88888.png"),
          title: "陈伟忠 董事长",
          content: "亿品众合的创始人及董事长",
          content1:
            "陈伟忠先生是国内著名影视出品人、制片人、监制、策划人、发行人。",
          content2: "深耕影视行业多年，在影视行业有丰富的资源和人脉"
        },
        {
          logo: require("@/assets/image/r1.png"),
          title: "孙靖 执行总裁",
          content: "营销策划专家。",
          content1:
            "曾就职于中博传媒、天下兄弟等国内头部影视公司。拥有十多年影视行业从业经验，丰富的影院资源，曾参与多个电影、电视剧项目的制作和运营，案例众多。",
          content2:
            "熟悉影视及互联网行业动态，擅于分析市场及行业痛点，从用户角度找到解决方案。"
        },
        // {
        //   logo: require("@/assets/image/r2.png"),
        //   title: "李佳遥 影视产业园总经理",
        //   content:
        //     "先后进入国内植入广告行业龙头公司合润传媒，担任内容营销中心总经理",
        //   content1:
        //     "以及在国内首家中文视频海外新媒体运营公司东方嘉禾负责海内外影视资源整合与运营。",
        //   content2:
        //     "均为公司一手搭建了影视公司资源平台，与全国300多家影视制片公司、及媒体保持了良好的关系，熟悉并掌握影视制作市场动态、特点和发展趋势；影视、媒体资源丰富，了解各重点制片公司的制作规律。"
        // },
        {
          logo: require("@/assets/image/r3.png"),
          title: "袁德民 技术总监",
          content: "全栈工程师",
          content1:
            "有创业经验，个人主导的垂直精品电商曾获投资企业200万投资意向。",
          content2:
            "10多年的互联网技术开发和项目管理经验，，擅长分布式架构和大数据处理，主要负责公司技术框架搭建，产品的设计和大数据的分析以及平台瓶颈问题的解决。"
        },
        {
          logo: require("@/assets/image/r4.png"),
          title: "孟捷 投资总监",
          content: "拥有多年跨国企业和金融行业从业经验。",
          content1:
            "先后担任法国上市公司Schobrunn Paris中国区副总裁，负责公司在中国的投行业务及业务拓展，以及北京银宏投资集团投资副总裁,负责集团与丹麦哥本哈根市政府一起投资的创新孵化中心的VC/PE项目",
          content2:
            "孟捷先生也曾在中国法国工商会担任商务经理，负责法国在华企业与中国企业之间的合作拓展，并在上海罗斯柴尔德私募基金担任分析师职务，负责参与中欧跨境并购项目。"
        }
      ],
      serverList: [
        {
          logo: require("@/assets/image/ah.png"),
          url: "http://www.nrta.gov.cn/",
          title: "国家广电总局",
          content: "<p>国家广电总局"
        },
        {
          logo: require("@/assets/image/ah2.png"),
          url: "http://gdj.ah.gov.cn/",
          title: "安徽广电局",
          content: "<p>安徽广电局"
        },
        {
          logo: require("@/assets/image/ah3.png"),
          url: "https://www.ahzwfw.gov.cn/",
          title: "安徽政务网",
          content: "<p>安徽政务网"
        }
      ]
    };
  },
  mounted() {
    /* banner-swiper */
    new Swiper(".banner-swiper", {
      loop: true, // 循环模式选项
      effect: "fade",
      //自动播放
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
        clickable: true
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      // 延迟加载
      lazy: {
        loadPrevNext: true
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    /* customer-swiper */
    new Swiper(".customer-swiper", {
      loop: true, // 循环模式选项
      slidesPerView: 3,
      //自动播放
      autoplay: {
        delay: 3000,
        stopOnLastSlide: false,
        disableOnInteraction: false
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      },
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true //修改swiper的父元素时，自动初始化swiper
    });
    /* wowjs动画 */
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: true,
      live: true
    });
    wow.init();
  },
  methods: {
    See(e) {
      window.location.href = e;
    }
  }
};
</script>
<style scoped>
/* 整体盒子 */
#HomePage {
  width: 100%;
}

/* 轮播图 */
#swiper {
  height: 600px;
}
#swiper .banner-swiper {
  width: 100%;
  height: 100%;
}
#swiper .banner-swiper .swiper-slide img {
  width: 100%;
  height: 100%;
}
#swiper .banner-swiper .swiper-slide {
  position: relative;
}
#swiper .banner-swiper .swiper-slide-title {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999999999;
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(51, 51, 51, 0.534);
  text-align: center;
  line-height: 80px;
}
#swiper .banner-swiper .swiper-slide-title > h1 {
  font-size: 50px;
  margin-top: 12%;
}
#swiper .banner-swiper .swiper-slide-title > p {
  font-size: 20px;
  margin-top: 1%;
  font-weight: 700;
}
/* 大数据管理系统 */
#bigData {
  padding: 100px;
  transition: all ease 0.6s;
  box-sizing: border-box;
}
#bigData .bigData-title {
  padding-bottom: 10px;
  border-bottom: 1px solid #ccc;
}
#bigData p {
  font-size: 14px;
  color: #333;
  line-height: 2rem;
}
#bigData .bigData-device {
  margin: 50px 0 20px;
}

/* 您身边的IT专家 */
#contactUs {
  color: #fff;
  height: 400px;
  background: url("../assets/image/3.png") 0 0 no-repeat;
  background-size: 100% 100%;
  transition: all ease 0.6s;
}
#contactUs .contactUs-container {
  padding-top: 50px;
}
#contactUs .contactUs-container button {
  width: 300px;
  height: 50px;
  margin-top: 40px;
}
#contactUs .contactUs-container .contactUs-contactWay span {
  display: inline-block;
  width: 48px;
  height: 48px;
  margin: 30px;
}
#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(1) {
  background: url("../assets/img/weixin.png") 0 0 no-repeat;
  background-size: 100% 100%;
}
#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(2) {
  background: url("../assets/img/weibo.png") 0 0 no-repeat;
  background-size: 100% 100%;
}
#contactUs .contactUs-container .contactUs-contactWay span:nth-of-type(3) {
  background: url("../assets/img/twitter.png") 0 0 no-repeat;
  background-size: 100% 100%;
}

/* 客户评价 */
#customer {
  padding: 50px 0;
  box-sizing: border-box;
  background: #efefef;
  transition: all ease 0.6s;
}
#customer .customer-title {
  font-size: 30px;
  color: rgb(102, 102, 102);
  margin: 0 0 30px;
}
#customer .customer-block {
  background: #fff;
  padding: 30px;
}
#customer .customer-logo img {
  width: 94px;
  height: 94px;
  border: 1px solid #ccc;
}
#customer .customer-yh img {
  width: 34px;
  height: 34px;
}
#customer .customer-content1 {
  /* padding-bottom: 20px; */
  line-height: 28px;
  padding: 0 15px;
  /* border-bottom: 1px solid #0ce9f1; */
}
#customer .customer-content2 {
  padding-top: 20px;
  font-size: 25px;
  text-align: center;
  line-height: 50px;
  font-weight: 600;
}
/* 为什么选择我们 */
#whyChooseUs {
  padding: 100px;
}
#whyChooseUs .whyChooseUs-title {
  margin-bottom: 50px;
}
#whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
  font-size: 25px;
  font-weight: 500;
}
#whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
  font-size: 14px;
}
#whyChooseUs .server-block {
  padding: 50px 20px;
  border: 1px solid #ccc;
  border-bottom: 5px solid #ccc;
}
#whyChooseUs .server-block img {
  width: 48px;
  height: 48px;
}
#whyChooseUs .server-block > p {
  font-size: 20px;
  margin: 30px 0;
}
#whyChooseUs .server-block > div {
  color: #ccc;
}
/* 媒体查询（手机） */
@media screen and (max-width: 768px) {
  #swiper {
    height: 200px;
  }
  #bigData {
    padding: 30px;
  }
  #bigData .bigData-title {
    font-size: 20px;
  }
  #bigData .bigData-device {
    font-size: 20px;
    margin: 10px 0 10px;
  }
  #contactUs {
    height: 200px;
    transition: all ease 0.6s;
  }
  #contactUs .contactUs-container {
    padding-top: 0;
  }
  #contactUs .contactUs-container h1 {
    font-size: 25px;
  }
  #contactUs .contactUs-container h3 {
    font-size: 18px;
  }
  #contactUs .contactUs-container button {
    width: 200px;
    height: 30px;
    margin-top: 20px;
  }
  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 28px;
    height: 28px;
    margin: 10px;
  }
  #customer {
    padding: 30px 0;
    box-sizing: border-box;
    background: #fff;
  }
  #customer .customer-title {
    font-size: 16px;
    font-weight: bold;
  }
  #customer .customer-logo img {
    width: 48px;
    height: 48px;
  }
  #customer .customer-block {
    padding: 30px;
  }
  #customer .customer-block > div {
    padding: 30px 0;
  }
  #whyChooseUs {
    padding: 20px 0;
    transition: all ease 0.6s;
  }
  #whyChooseUs .whyChooseUs-title p:nth-of-type(1) {
    font-size: 20px;
    font-weight: 700;
  }
  #whyChooseUs .whyChooseUs-title p:nth-of-type(2) {
    font-size: 12px;
  }
  #whyChooseUs .server-block {
    padding: 50px 0;
    border: 1px solid #ccc;
    border-bottom: 5px solid #ccc;
  }
  #whyChooseUs .server-block img {
    width: 48px;
    height: 48px;
  }
  #whyChooseUs .server-block > p {
    font-size: 20px;
    margin: 30px 0;
  }
  #whyChooseUs .server-block > div {
    color: #ccc;
  }
}

/* 媒体查询（平板） */
@media screen and (min-width: 768px) and (max-width: 996px) {
  #swiper {
    height: 400px;
  }
  #bigData {
    padding: 60px;
  }
  #bigData .bigData-title {
    font-size: 30px;
  }
  #bigData .bigData-device {
    font-size: 30px;
    margin: 30px 0 15px;
  }
  #contactUs {
    height: 300px;
  }
  #contactUs .contactUs-container {
    padding-top: 50px;
  }
  #contactUs .contactUs-container h1 {
    font-size: 30px;
  }
  #contactUs .contactUs-container h3 {
    font-size: 20px;
  }
  #contactUs .contactUs-container button {
    width: 300px;
    height: 50px;
    margin-top: 30px;
  }
  #contactUs .contactUs-container .contactUs-contactWay span {
    display: inline-block;
    width: 32px;
    height: 32px;
    margin: 15px;
  }
  #customer .customer-title {
    font-size: 24px;
  }
  #whyChooseUs {
    padding: 20px 0;
  }
}
</style>

