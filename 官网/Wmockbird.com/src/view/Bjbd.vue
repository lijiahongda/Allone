<template>
  <div id="ServiceDetail">
    <div class="container">
      <div class="row">
        <img
          style="width:100%;height:260px;"
          src="http://img.mockbird.top/1577613628223904.jpg"
          alt="news1"
        />
        <h3 style="font-weight:600;">北京北电影视艺术学院</h3>
        <p style="line-height:35px;">
          北京北电影视艺术学院（北京北电影视培训中心）是北京最早从事艺考培训的专业学校。为推进芜湖影视文化同全国影视文化产业的链接，芜湖亿品众合与北京北电影视艺术学院达成战略合作，在芜湖亿品众合影视产业园设置北京北电影视培训中心招生办，全面面向安徽省开启招生通道，大力吸纳和培育当地优秀影视人才，助力芜湖城市文化板块转型与发展。
          芜湖亿品众合影视产业园北京北电影视培训中心招生办旨在落实影视培训和教育机制，努力为安徽艺考生提供一个学习和提升的空间，定向为北京电影学院、中央戏剧学院等高等艺术类院校选拔和培育优秀的影视人才，为影视行业储备和输送新鲜优质的血液。
          诚挚欢迎广大热爱影视的学员们加入。
        </p>
        <img
          style="width:500px;height:350px;"
          src="http://img.mockbird.top/1577613691132267.gif"
          alt="news1"
        />
        <h3 style="font-weight:600;">颠覆传统整合影视圈资源 获多家影视公司看好并签约</h3>
        <img
          style="width:500px;height:350px;"
          src="http://img.mockbird.top/1577613714359957.gif"
          alt="news1"
        />
        <p
          style="line-height:35px;"
        >正式建立于2002年，是一所集表演、艺术考前（表演、编导、播音）、化妆、摄影、模特、影视后期制作等专业为一身的综合类艺术院校。北京北电影视艺术学院被中国影视艺术协（学）会联盟教育专业委员会（简称影视艺术教育专业委员会）及北京电影学院指定为影视类专科（自考）学历教育助学院校。同时被国家劳动和社会保障部评为职业技能鉴定示范单位。</p>
        <img
          style="width:500px;height:350px;"
          src="http://img.mockbird.top/1577613731435288.gif"
          alt="news1"
        />
        <p
          style="line-height:35px;"
        >学校配有专业化的小剧场、基础教室、声台室、形体房、排练厅、摄影棚、化妆实操教室、服装间、道具库、阅览室、体育场和影视基地。学校采取封闭式的管理，提供完善的教学设施，优雅的校园环境，统一安全的后勤管理，为学生的学习提供了强有力的保障。</p>
        <p
          style="line-height:35px;"
        >积极拓展就业渠道是北京北电影视艺术学院的重点工作之一，在教学过程中，以职业技能为核心，以经验和实用为重点，以立足市场为目标，培养高素质复合型人才为宗旨，立足把学员带进高收入、高层次职业的行列。为影视界培养了一批具备一定思想道德水平和文化知识修养、掌握现代化专业技能的应用型人才。艺术类考前培训自开办17年来已有2000多名学员考入艺术类院校。</p>
        <p
          style="line-height:35px;"
        >秉承“厚德授艺，严谨治学”的校训，在师资方面，学院形成了以中青年教师为骨干，聘请业内知名专家及教授为学术带头人的师资队伍。学生就业率和本科升学率双双超过90%，并被国家劳动和社会保障部评为职业技能鉴定示范单位。秉承“厚德授艺，严谨治学”的校训，为拥有艺术梦想的你，打开通往艺术殿堂的大门。</p>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
export default {
  name: "JobChance",
  data() {
    return {};
  },
  mounted() {
    var wow = new WOW();
    wow.init();
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
.JobChance-container {
  margin: 100px;
  padding: 30px;
  transition: all ease 0.5s;
  border: 1px dashed salmon;
}
.JobChance-container h2 {
  color: rgb(255, 102, 19);
  font-weight: bolder;
  text-align: center;
}
.JobChance-container p {
  font-size: 20px;
  color: rgb(255, 102, 19);
  font-weight: 700;
}
.JobChance-container ol {
  list-style-type: decimal;
  padding-left: 30px;
}
.JobChance-container ol > li {
  font-size: 14px;
  line-height: 2.7rem;
}
@media screen and (max-width: 997px) {
  .JobChance-container {
    margin: 20px 0;
    padding: 20px;
    border: 1px dashed salmon;
  }
}
</style>

