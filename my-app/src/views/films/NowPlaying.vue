<template>
  <div id="box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <van-cell
        v-for="data in $store.state.datalist"
        :key="data.filmId"
        @click="handleChange(data.filmId)"
      >
        <div>
          <img :src="data.poster" />
        </div>
        <div class="nowPlaying-info">
          <div>
            <title>{{ data.name }}</title>
            <span class="type">{{ data.filmType.name }}</span>
          </div>
          <div :class="data.grade ? '' : 'hidden'">
            <span>观众评分:</span>
            <span class="score">{{ data.grade }}</span>
          </div>
          <div>
            <span>主演:{{ data.actors | actorsFilter }}</span>
          </div>
          <div>
            <span>{{ data.nation }} | {{ data.runtime }}分钟</span>
          </div>
        </div>
        <div class="nowPlaying-buy">购票</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
// import axios from "axios";
import http from "@/util/http";
import Vue from "vue";
import { List } from "vant";

Vue.use(List);

Vue.filter("actorsFilter", (data) => {
  return data.map((item) => item.name).join(" ");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },
  methods: {
    handleChange(id) {
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      console.log("刷新");
      if (
        this.$store.state.datalist.length >= this.$store.state.total &&
        this.$store.state.total !== 0
      ) {
        this.finished = true;
        return;
      }
      this.current++;
      http({
        url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=2701129`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        this.$store.state.datalist = [
          ...this.$store.state.datalist,
          ...res.data.data.films,
        ];
        console.log(this.$store.state.datalist);
        this.loading = false;
      });
    },
  },
  mounted() {
    this.$store.dispatch("getFilmsData", this.$store.state.cityId);
  },
};
</script>

<style scoped>
#box {
  background-color: #fff;
}
.van-list {
  margin-left: 15px;
}
.van-cell {
  height: 124px;
  list-style: none;
  padding: 15px 15px 15px 0;
  border-bottom: 1px solid #ededed;
}
.van-cell__value {
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
.nowPlaying-info {
  width: calc(100% - 116px);
  padding: 0 10px;
  box-sizing: border-box;
}
.nowPlaying-info div {
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
  color: #ff5f16;
  font-size: 13px;
  border: 1px solid #ff5f16;
  text-align: center;
}
.hidden {
  visibility: hidden;
}
</style>
