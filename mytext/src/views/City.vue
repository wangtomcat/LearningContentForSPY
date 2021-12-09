<template>
  <div class="city">
    <div class="city-header">
      <div class="header">
        <div class="left" @click="handleGoBack">
          <i class="iconfont icon-cuowu"></i>
        </div>
        <div class="title">当前城市-{{ $store.state.cityName }}</div>
        <div class="right"></div>
      </div>
      <div class="city-input">
        <div class="input-wrap">
          <i class="iconfont icon-sousuo"></i>
          <input type="text" placeholder="输入城市名或拼音" v-model="text" />
        </div>
        <div class="cancel" @click="handleCancel">取消</div>
      </div>
    </div>
    <div
      class="searchCity"
      v-show="text"
      v-for="(data, index) in searchList"
      :key="index"
    >
      <ul>
        <li @click="handleClick(item)" v-for="item in data" :key="item.cityId">
          {{ item.name }}
        </li>
      </ul>
    </div>
    <div v-show="!text" class="city-index">
      <div class="city-list">
        <ul>
          <li
            @click="handleClickIndex(index)"
            v-for="(data, index) in cityList"
            :key="data.cityId"
          >
            {{ data.type }}
          </li>
        </ul>
      </div>
      <div class="city_sort" ref="city_sort">
        <div class="index-list" v-for="data in cityList" :key="data.type">
          <p class="title">{{ data.type }}</p>
          <ul class="list">
            <li
              @click="handleClick(item)"
              v-for="item in data.list"
              :key="item.cityId"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
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
      newList: [],
      searchList: [],
      text: "",
    };
  },
  watch: {
    text() {
      this.searchList = [];
      this.cityList.forEach((data) => {
        var arr = data.list.filter((item) => {
          return (
            item.pinyin.includes(this.text) || item.name.includes(this.text)
          );
        });
        if (arr.length > 0) {
          this.searchList.push(arr);
        }
      });
    },
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
    handleCancel() {
      this.text = "";
    },
    handleGoBack() {
      this.$router.back();
    },
    handleClick(item) {
      this.$store.commit("changeCityName", item.name);
      this.$store.commit("changeCityId", item.cityId);
      this.$store.commit("clearCinema");
      this.$router.back();
    },
    onClickLeft() {
      this.$router.back();
    },
    handleClickIndex(index) {
      var oDiv = this.$refs.city_sort.getElementsByClassName("index-list");
      document.documentElement.scrollTop = oDiv[index].offsetTop - 101;
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
.city {
  background-color: #fff;
}
.city-header .header {
  background-color: #fff;
  display: flex;
  height: 50px;
}
.city-header .header .left,
.city-header .header .right,
.city-header .header .title {
  display: flex;
  align-items: center;
}
.city-header .header .left,
.city-header .header .right {
  width: 14%;
}
.city-header .header .title {
  width: 72%;
  justify-content: center;
}
.iconfont.icon-cuowu {
  margin-left: 10px;
  font-size: 18px;
}
.city-index {
  padding-top: 101px;
}
.city-list {
  width: 17px;
  z-index: 9;
  position: fixed;
  right: 0;
  top: 0;
  height: 100%;
  margin-top: 50px;
  display: flex;
}
.city-list > ul {
  width: 100%;
  height: calc(100% - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 11px;
}
.city-list > ul li {
  text-align: center;
  padding: 0 4px;
  color: #191a1b;
}
.index-list,
.searchCity {
  width: 100%;
  padding-right: 17px;
  box-sizing: border-box;
  background-color: #fff;
}
.index-list .title {
  background-color: #f4f4f4;
  font-size: 12px;
  color: #797d82;
  padding: 0 0 0 15px;
  height: 30px;
  display: flex;
  align-items: center;
}
.index-list .list,
.searchCity ul {
  padding-left: 20px;
  display: flex;
  flex-direction: column;
}
.index-list .list li,
.searchCity ul li {
  height: 48px;
  line-height: 48px;
  font-size: 14px;
  border-bottom: 1px solid #ededed;
  color: #191a1b;
}
.city-input {
  background-color: #f4f4f4;
  padding: 9.5px 15px;
  height: 50px;
  box-sizing: border-box;
  display: flex;
}
.input-wrap {
  width: calc(100% - 43px);
  background-color: #fff;
}
.input-wrap input {
  width: 265px;
  height: 100%;
  color: #797d82;
  font-size: 12px;
  border: none;
  margin-left: 12px;
}
.iconfont.icon-sousuo {
  margin-left: 10px;
  font-size: 15px;
  color: #797d82;
}
.cancel {
  width: 43px;
  text-align: right;
}
// .van-toast--html,
// .van-toast--text {
//   min-width: 30px;
//   min-height: 30px;
//   font-size: 20px;
// }
// .van-cell_title {
//   background-color: #fff;
//   color: #191a1b;
//   border-bottom: 1px solid #ededed;
//   height: 48px;
//   line-height: 48px;
//   font-size: 14px;
// }
// .van-index-bar__index {
//   padding: 0 8px 0 5px;
// }
// .van-index-anchor {
//   margin-right: 20px;
//   padding: 0 0 0 16px;
//   background-color: #f4f4f4;
// }
// .van-index-anchor {
//   color: #797d82;
// }
// .van-nav-bar__title {
//   max-width: 60%;
//   margin: 0 auto;
//   color: #191a1b;
//   font-weight: normal;
//   font-size: 16px;
// }
// .van-nav-bar__text {
//   display: flex;
//   align-items: center;
//   color: #191a1b;
//   font-size: 30px;
//   font-weight: normal;
// }
// .van-search--show-action {
//   height: 50px;
//   background-color: #f1f1f1;
// }
// .van-search__content {
//   background-color: #fff;
// }
.city-header {
  width: 100%;
  z-index: 19;
  position: fixed;
  top: 0;
}
</style>
