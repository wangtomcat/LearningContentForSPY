<template>
  <div class="box" ref="box">
    <van-swipe :autoplay="2500">
      <van-swipe-item v-for="data in datalist" :key="data.bannerId">
        <img :src="data.imgUrl" />
      </van-swipe-item>
    </van-swipe>
    <div class="city-fixed" @click="handleClick">
      <span> {{ $store.state.cityName }}</span>
      <i class="iconfont icon-xiala"></i>
    </div>
    <film-header></film-header>
    <router-view></router-view>
  </div>
</template>

<script>
import FilmHeader from "@/components/films/FilmHeader.vue";
import http from "@/util/http";
import Vue from "vue";
import { Swipe, SwipeItem } from "vant";
import BScroll from "better-scroll";

Vue.use(Swipe);
Vue.use(SwipeItem);

export default {
  data() {
    return {
      down: false,
      current: 0,
      datalist: [],
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/City");
    },
  },
  components: {
    FilmHeader,
  },
  mounted() {
    http({
      url: `/gateway?type=2&cityId=${this.$store.state.cityId}&k=9874383`,
      headers: {
        "X-Host": "mall.cfg.common-banner",
      },
    }).then((res) => {
      this.datalist = res.data.data;
    });
  },
};
</script>

<style scoped>
.box {
  width: 100%;
}
.nav span {
  display: inline-block;
  width: 50%;
  text-align: center;
}
img {
  width: 100%;
}
.swiper {
  height: 56vw;
}
.custom-indicator {
  position: absolute;
  right: 5px;
  bottom: 5px;
  padding: 2px 5px;
  font-size: 12px;
  background: rgba(0, 0, 0, 0.1);
}
.city-fixed {
  position: absolute;
  top: 18px;
  left: 7px;
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  padding: 5px;
  text-align: center;
  color: #fff;
  font-size: 13px;
}
.iconfont {
  font-size: 12px;
  font-weight: 900;
  margin-top: 5px;
}
</style>
