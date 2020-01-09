<template>
  <div id="Service">
    <div class="container text-center">
      <h3>鸠兹古镇</h3>
    </div>
    <div class="container">
      <div class="Service-container row">
        <div
          class="Service-item col-xs-12 col-sm-6 col-md-3 wow slideInUp"
          v-for="(item,index) in imageList"
          :key="index"
        >
          <div class="Service-item-wrapper">
            <div class="Service-item-img">
              <img :src="item.img" alt="风景" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <h3>马仁奇峰</h3>
    </div>
    <div class="container">
      <div class="Service-container row">
        <div
          class="Service-item col-xs-12 col-sm-6 col-md-3 wow slideInUp"
          v-for="(item,index) in imageList2"
          :key="index"
        >
          <div class="Service-item-wrapper">
            <div class="Service-item-img">
              <img :src="item.img" alt="风景" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-center">
      <h3>西河古镇</h3>
    </div>
    <div class="container">
      <div class="Service-container row">
        <div
          class="Service-item col-xs-12 col-sm-6 col-md-3 wow slideInUp"
          v-for="(item,index) in imageList3"
          :key="index"
        >
          <div class="Service-item-wrapper">
            <div class="Service-item-img">
              <img :src="item.img" alt="风景" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { WOW } from "wowjs";
export default {
  name: "Whufin",
  data() {
    return {
      imageList: [
        {
          img: require("@/assets/image/fj/j1.jpg")
        },
        {
          img: require("@/assets/image/fj/j2.jpg")
        },
        {
          img: require("@/assets/image/fj/j3.jpg")
        },
        {
          img: require("@/assets/image/fj/j4.jpg")
        },
        {
          img: require("@/assets/image/fj/j5.jpg")
        },
        {
          img: require("@/assets/image/fj/j6.jpg")
        },
        {
          img: require("@/assets/image/fj/j7.jpg")
        },
        {
          img: require("@/assets/image/fj/j8.jpg")
        },
        {
          img: require("@/assets/image/fj/j9.jpg")
        },
        {
          img: require("@/assets/image/fj/j10.jpg")
        },
        {
          img: require("@/assets/image/fj/j11.jpg")
        },
        {
          img: require("@/assets/image/fj/j12.jpg")
        }
      ],
      imageList2: [
        {
          img: require("@/assets/image/fj2/j1.jpg")
        },
        {
          img: require("@/assets/image/fj2/j2.jpg")
        },
        {
          img: require("@/assets/image/fj2/j3.jpg")
        },
        {
          img: require("@/assets/image/fj2/j5.jpg")
        },
        {
          img: require("@/assets/image/fj2/j7.jpg")
        },
        {
          img: require("@/assets/image/fj2/j8.jpg")
        },
        {
          img: require("@/assets/image/fj2/j9.jpg")
        },
        {
          img: require("@/assets/image/fj2/j10.jpg")
        }
      ],
      imageList3: [
        {
          img: require("@/assets/image/fj3/j1.jpg")
        },
        {
          img: require("@/assets/image/fj3/j2.jpg")
        },

        {
          img: require("@/assets/image/fj3/j4.jpg")
        },
        {
          img: require("@/assets/image/fj3/j8.jpg")
        },
        {
          img: require("@/assets/image/fj3/j9.jpg")
        },
        {
          img: require("@/assets/image/fj3/j10.jpg")
        },
        {
          img: require("@/assets/image/fj3/j11.jpg")
        }
      ]
    };
  },
  mounted() {
    var wow = new WOW();
    wow.init();
  },
  methods: {
    ServiceClick(id) {
      this.$router.push({
        name: "servicedetail",
        params: {
          id: id
        }
      });
    }
  }
};
</script>
<style scoped>
.Service-container {
  padding: 30px 50px;
}
.Service-item {
  margin-bottom: 50px;
}
.Service-item-wrapper {
  cursor: pointer;
  background: rgba(244, 244, 244, 1);
  overflow: hidden;
  position: relative;
}
.Service-item-top {
  width: 100%;
  height: 120px;
  padding: 30px;
  text-align: center;
}
.Service-item-top > i {
  display: inline-block;
  width: 25px;
  height: 2px;
  background: #28f;
}
.Service-item-top > p {
  color: #b2b2b2;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.5s ease;
}
.Service-item-img {
  width: 100%;
  overflow: hidden;
}
.Service-item-img img {
  width: 100%;
  transition: all 0.5s ease;
}
.Service-item-border {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 9999999;
  width: 100%;
  height: 100%;
  transition: all 0.5s ease;
  border: 1px solid #000;
  opacity: 0;
}
.Service-item-wrapper:hover .Service-item-top > i {
  opacity: 0;
}
.Service-item-wrapper:hover .Service-item-top > p {
  opacity: 1;
  transform: translateY(-10px);
}
.Service-item-wrapper:hover .Service-item-img > img {
  transform: scale(1.1, 1.1);
}
.Service-item-wrapper:hover > .Service-item-border {
  opacity: 1;
  width: 90%;
  height: 90%;
}
</style>

