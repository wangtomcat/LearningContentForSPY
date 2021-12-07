<template>
  <div class="film" v-if="filmInfo">
    <detail-header v-scroll="50" :value="filmInfo.name"></detail-header>
    <div class="film-poster">
      <img :src="filmInfo.poster" />
    </div>
    <div class="film-detail">
      <div class="film-title">
        <div class="name">
          <title>{{ filmInfo.name }}</title>
          <span class="type">{{ filmInfo.filmType.name }}</span>
        </div>
        <div class="grade">
          <span>{{ filmInfo.grade }}</span>
          <span>分</span>
        </div>
      </div>
      <div class="film-category grey-text">
        {{ filmInfo.category }}
      </div>
      <div class="film-premiere-time grey-text">
        {{ filmInfo.premiereAt | premiereAt }}上映
      </div>
      <div class="film-duration grey-text">
        <span>{{ filmInfo.nation }} | {{ filmInfo.runtime }}分钟</span>
      </div>
      <div class="film-synopsis grey-text" :class="isShow ? 'hidden' : ''">
        {{ filmInfo.synopsis }}
      </div>
      <div class="toggle" @click="isShow = !isShow">
        <i v-if="isShow" class="iconfont icon-xiala"></i>
        <i v-else class="iconfont icon-shouqi"></i>
      </div>
    </div>
    <div class="actors">
      <div class="actors-title">演职人员</div>
      <detail-swiper name="actors" :perview="4" class="actors-list">
        <detail-swiper-item
          class="actors-list-item"
          v-for="(data, index) in filmInfo.actors"
          :key="index"
        >
          <div class="actors-img">
            <img style="width: 85px" :src="data.avatarAddress" />
          </div>
          <div class="actors-name">{{ data.name }}</div>
          <div class="actors-role">{{ data.role }}</div>
        </detail-swiper-item>
      </detail-swiper>
    </div>
    <div class="photos">
      <div class="photos-title">剧照</div>
      <detail-swiper
        v-if="filmInfo.photos"
        :perview="2.5"
        name="photo"
        class="photos-list"
      >
        <detail-swiper-item
          class="photos-list-item"
          v-for="(data, index) in filmInfo.photos"
          :key="index"
        >
          <div class="photos-img" @click="handlePerview(index)">
            <img style="width: 100%" :src="data" />
          </div>
        </detail-swiper-item>
      </detail-swiper>
      <div v-else class="empty-text">暂无电影剧照</div>
    </div>
    <div class="buyTickets">选座购票</div>
  </div>
</template>

<script>
import http from "@/util/http";
import obj from "@/util/mixinObj";
import moment from "moment";
import Vue from "vue";
import DetailSwiper from "@/components/detail/DetailSwiper";
import DetailSwiperItem from "@/components/detail/DetailSwiperItem";
import DetailHeader from "@/components/detail/DetailHeader";
import { ImagePreview } from "vant";

Vue.filter("premiereAt", (item) => {
  return moment(item * 1000).format("YYYY-MM-DD");
});
Vue.directive("scroll", {
  inserted(el, binding) {
    window.onscroll = () => {
      if (document.documentElement.scrollTop > binding.value) {
        el.querySelector(".title").style.display = "block";
      } else {
        el.querySelector(".title").style.display = "none";
      }
    };
  },
  unbind() {
    window.onscroll = null;
  },
});
export default {
  mixins: [obj],
  data() {
    return {
      filmInfo: null,
      isShow: true,
    };
  },
  methods: {
    handleGoBack() {
      this.$router.back();
    },
    handlePerview(index) {
      ImagePreview({
        images: this.filmInfo.photos,
        startPosition: index,
        closeable: true,
        closeIconPosition: "top-left",
      });
    },
  },
  components: {
    DetailSwiper,
    DetailSwiperItem,
    DetailHeader,
  },
  mounted() {
    http({
      url: `/gateway?filmId=${this.$route.params.id}&k=3752522`,
      headers: { "X-Host": "mall.film-ticket.film.info" },
    }).then((res) => {
      this.filmInfo = res.data.data.film;
    });
  },
};
</script>

<style lang="scss" scoped>
.film {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: rgba(241, 241, 241);
}
.film-poster {
  width: 100%;
  height: 56vw;
  overflow: hidden;
}
.film-poster img {
  transform: translateY(-30%);
  width: 100%;
}
.film-detail {
  padding: 12px 15px 12px;
  box-sizing: border-box;
  width: 100%;
  background-color: #fff;
}
.film-title {
  display: flex;
  justify-content: space-between;
}
.film-title .grade span:first-child {
  font-size: 18px;
  font-style: italic;
}
.film-title .grade {
  color: #ffb232;
  font-size: 12px;
}
.film-title title {
  display: inline;
  margin-right: 5px;
  font-size: 18px;
}
.film-title .type {
  background-color: #d2d6dc;
  color: #fff;
  font-size: 12px;
  padding: 0 2px;
  border-radius: 2px;
  vertical-align: 1px;
}
.grey-text {
  margin-top: 4px;
  color: #797d82;
  font-size: 12px;
}
.film-synopsis {
  margin-top: 12px;
}
.film-detail .hidden {
  height: 37px;
  overflow: hidden;
}
.toggle {
  text-align: center;
}
.iconfont {
  font-size: 12px;
}
.actors,
.photos {
  margin-top: 10px;
  background-color: #fff;
}
.photos {
  margin-bottom: 10px;
}
.actors-title,
.photos-title {
  padding: 15px;
}
.actors-list,
.photos-list {
  padding: 0 0 10px 15px;
  overflow: hidden;
}
.empty-text {
  height: 115px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  color: #bdc0c5;
}
.actors-list-item {
  width: 85px !important;
  box-sizing: border-box;
  margin-right: 10px;
}
.actors-img {
  width: 85px;
  height: 85px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.actors-name,
.actors-role {
  font-size: 12px;
  text-align: center;
}
.actors-name {
  color: #191a1b;
  padding-top: 10px;
}
.actors-role {
  color: #797d82;
}
.photos-list-item {
  margin-right: 10px;
  width: 150px !important;
}
.photos-img {
  height: 100px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.buyTickets {
  position: fixed;
  z-index: 19;
  bottom: 0;
  left: 0;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
}
</style>
