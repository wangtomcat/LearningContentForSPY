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
        v-for="data in datalist"
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
import http from "@/util/http";
import Vue from "vue";
import { List } from "vant";
import { PullRefresh } from "vant";

Vue.use(PullRefresh);
Vue.use(List);

Vue.filter("actorsFilter", (data) => {
  return data?.map((item) => item.name).join(" ");
});
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      finished: false,
      isLoading: false,
      current: 1,
      total: 0,
    };
  },
  methods: {
    handleChange(id) {
      this.$router.push(`/detail/${id}`);
    },
    onLoad() {
      if (this.datalist.length >= this.total && this.total !== 0) {
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
        this.datalist = [...this.datalist, ...res.data.data.films];
        this.loading = false;
      });
    },
  },
  mounted() {
    http({
      url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=2701129`,
      headers: {
        "X-Host": "mall.film-ticket.film.list",
      },
    }).then((res) => {
      this.datalist = res.data.data.films;
      this.total = res.data.data.total;
    });
    // window.onscroll = () => {
    //   if (window.pageYOffset > 2) {
    //     this.datalist = [];
    //     http({
    //       url: `/gateway?cityId=${this.$store.state.cityId}&pageNum=1&pageSize=10&type=1&k=2701129`,
    //       headers: {
    //         "X-Host": "mall.film-ticket.film.list",
    //       },
    //     }).then((res) => {
    //       this.datalist = res.data.data;
    //     });
    //   }
    // };
  },
  // destroyed() {
  //   window.onscroll = "";
  // },
};
</script>

<style scoped>
#box {
  background-color: #fff;
  padding-bottom: 50px;
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
