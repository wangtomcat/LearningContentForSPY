<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="输入影城名称"
        @search="onSearch"
        @cancel="onCancel"
      />
    </form>
    <ul>
      <li v-for="data in computedList" :key="data.cinemaId">
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
import obj from "@/util/mixinObj";
export default {
  mixins: [obj],
  data() {
    return {
      value: "",
    };
  },
  mounted() {
    if (this.$store.state.cinemasList.length === 0) {
      this.$store.dispatch("getCinemaData", this.$store.state.cityId);
    } else {
      console.log("缓存");
    }
  },
  computed: {
    computedList() {
      console.log(this.value);
      return this.$store.state.cinemasList.filter((item) => {
        return item.name.includes(this.value);
      });
    },
  },
  methods: {
    onSearch() {
      // console.log(111);
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="scss" scoped>
.van-search {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  background-color: #fff;
  height: 50px;
  width: 100%;
  padding: 9.5px 15px;
  border-bottom: 1px solid #ededed;
}
.van-search__content {
  display: flex;
  height: 30px;
  padding-left: 12px;
  background-color: #f4f4f4;
  border-radius: 3px;
}
.van-search .van-cell,
.van-search__action {
  display: flex;
  align-items: center;
}
.van-search__action {
  padding: 0 0 0 15px;
  color: #191a1b;
  font-size: 14px;
  cursor: pointer;
}
li {
  padding: 15px;
  border-bottom: 1px solid #ededed;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
}
.cinemas-info-left {
  display: flex;
  flex-direction: column;
  width: 215px;
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
