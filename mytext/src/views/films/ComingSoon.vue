<template>
  <div class="main">
    <ul>
      <li
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChange(data.filmId)"
      >
        <div>
          <img :src="data.poster" />
        </div>
        <div class="comingSoon-info">
          <div>
            <title>{{ data.name }}</title>
            <span class="type">{{ data.filmType.name }}</span>
          </div>
          <div>
            <span>主演:{{ data.actors | actorsFilter }}</span>
          </div>
          <div>
            <span>上映时间: {{ data.premiereAt | soonPremiere }}</span>
          </div>
        </div>
        <div class="nowPlaying-buy">预购</div>
      </li>
    </ul>
  </div>
</template>

<script>
import http from "@/util/http";
import moment from "moment";
import Vue from "vue";

Vue.filter("soonPremiere", (item) => {
  return moment(item * 1000).format("YYYY-MM-DD");
});
export default {
  data() {
    return {
      datalist: null,
    };
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=2&k=3853419`,
      headers: { "X-Host": " mall.film-ticket.film.list" },
    }).then((res) => {
      this.datalist = res.data.data.films;
    });
  },
};
</script>

<style scoped>
.main {
  background-color: #fff;
}
ul {
  margin-left: 15px;
}
li {
  height: 94px;
  list-style: none;
  padding: 15px 15px 15px 0;
  border-bottom: 1px solid #ededed;
  display: flex;
  align-items: center;
}
img {
  width: 66px;
}
title {
  display: inline;
  margin-right: 5px;
}
span {
  font-size: 13px;
  color: #797d82;
}
.comingSoon-info {
  width: calc(100% - 116px);
  padding: 0 10px;
  box-sizing: border-box;
}
.comingSoon-info div {
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.type {
  background-color: #d2d6dc;
  color: #fff;
  font-size: 12px;
  padding: 0 2px;
  border-radius: 2px;
  vertical-align: 1px;
}
.score {
  color: #ffb232;
}
.nowPlaying-buy {
  width: 50px;
  height: 25px;
  line-height: 25px;
  color: #ffb232;
  font-size: 13px;
  border: 1px solid #ffb232;
  text-align: center;
}
.hidden {
  visibility: hidden;
}
</style>
