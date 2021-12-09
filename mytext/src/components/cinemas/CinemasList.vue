<template>
  <div class="box">
    <ul>
      <li v-for="data in $store.state.cinemasList" :key="data.cinemaId">
        <div class="cinemas-info-left">
          <span class="cinema-name">{{ data.name }}</span>
          <span class="cinema-address">{{ data.address }}</span>
        </div>
        <div class="cinemas-info-right">
          <div class="price">
            <span>￥</span>
            <span>{{ data.lowPrice / 100 }}</span>
            <span>起</span>
          </div>
          <span class="distance">距离未知</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/util/http";
import BetterScroll from "better-scroll";

export default {
  data() {
    return {
      cinemasList: null,
    };
  },
  mounted() {
    if (this.$store.state.cinemasList.length === 0) {
      this.$store.dispatch("getCinemaData", this.$store.state.cityId);
    } else {
      console.log("缓存");
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  padding-top: 50px;
}
li {
  padding: 15px;
  border-bottom: 1px solid #ededed;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.cinemas-info-left {
  padding-right: 20px;
  display: flex;
  flex-direction: column;
  width: calc(100% - 85px);
}
.cinemas-info-left span {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.cinema-name {
  color: #191a1b;
  font-size: 15px;
}
.cinema-address {
  color: #797d82;
  margin-top: 5px;
  font-size: 12px;
}
.price {
  color: #ff5f16;
  font-size: 12px;
}
.price span:nth-child(2) {
  font-size: 15px;
}
.distance {
  font-size: 12px;
  margin-top: 5px;
  color: #797d82;
}
</style>
