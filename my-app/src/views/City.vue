<template>
  <div class="city">
    <div class="city-header">
      <van-nav-bar title="当前城市-" @click-left="onClickLeft">
        <template #left>
          <i class="iconfont icon-cuowu"></i>
        </template>
      </van-nav-bar>
      <form style="background-color: #f1f1f1" action="/">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入城市名或拼音"
          @search="onSearch"
        />
      </form>
    </div>
    <van-index-bar
      :index-list="computedList"
      :sticky="false"
      @change="handleChange"
    >
      <div v-for="data in cityList" :key="data.type">
        <van-index-anchor :index="data.type" />
        <van-cell
          v-for="item in data.list"
          :key="item.cityId"
          :title="item.name"
          @click="handleClick(item)"
        />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import http from "@/util/http";
import obj from "@/util/mixinObj";
import { Toast } from "vant";
export default {
  mixins: [obj],
  data() {
    return {
      cityList: [],
      value: "",
    };
  },
  mounted() {
    http({
      url: "/gateway?k=2268875",
      headers: { "X-Host": "mall.film-ticket.city.list" },
    }).then((res) => {
      this.renderCity(res.data.data.cities);
    });
  },
  computed: {
    computedList() {
      return this.cityList.map((item) => item.type);
    },
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    handleClick(item) {
      this.$store.commit("changeCityName", item.name);
      this.$store.commit("changeCityId", item.cityId);
      this.$store.commit("clearCinema");
      this.$router.back();
    },
    handleChange(data) {
      Toast(data);
    },
    onClickLeft() {
      this.$router.back();
    },
    renderCity(list) {
      var letterList = [];
      for (var i = 65; i <= 90; i++) {
        letterList.push(String.fromCharCode(i));
      }
      letterList.forEach((letter) => {
        var newList = list.filter((item) => {
          return item.pinyin.substring(0, 1).toUpperCase() === letter;
        });
        if (newList.length > 0) {
          this.cityList.push({
            type: letter,
            list: newList,
          });
        }
      });
    },
  },
};
</script>

<style lang="scss">
.van-toast--html,
.van-toast--text {
  min-width: 30px;
  min-height: 30px;
  font-size: 20px;
}
.van-cell_title {
  background-color: #fff;
  color: #191a1b;
  border-bottom: 1px solid #ededed;
  height: 48px;
  line-height: 48px;
  font-size: 14px;
}
.van-index-bar__index {
  padding: 0 8px 0 5px;
}
.van-index-anchor {
  margin-right: 20px;
  padding: 0 0 0 16px;
  background-color: #f4f4f4;
}
.van-index-anchor {
  color: #797d82;
}
.van-nav-bar__title {
  max-width: 60%;
  margin: 0 auto;
  color: #191a1b;
  font-weight: normal;
  font-size: 16px;
}
.van-nav-bar__text {
  display: flex;
  align-items: center;
  color: #191a1b;
  font-size: 30px;
  font-weight: normal;
}
.van-search--show-action {
  height: 50px;
  background-color: #f1f1f1;
}
.van-search__content {
  background-color: #fff;
}
.city-header {
  width: 100%;
  z-index: 19;
  position: fixed;
  top: 0;
}
.city {
  padding-top: 100px;
}
</style>
