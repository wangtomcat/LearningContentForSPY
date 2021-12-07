<template>
  <div class="cinemas-header">
    <div class="header">
      <div class="left" @click="handleClickLeft">
        <span>{{ $store.state.cityName }}</span>
        <i class="iconfont icon-xiala"></i>
      </div>
      <div class="title">影院</div>
      <div class="right" @click="handleClickRight">
        <i style="font-size: 18px" class="iconfont icon-sousuo"></i>
      </div>
    </div>
    <div class="cinema-list">
      <div>
        <span>全程 </span>
        <i v-if="isShow" class="iconfont icon-xiala"></i>
        <i v-else class="iconfont icon-shouqi"></i>
      </div>
      <div>
        <span>APP订票 </span>
        <i v-if="isShow" class="iconfont icon-xiala"></i>
        <i v-else class="iconfont icon-shouqi"></i>
      </div>
      <div>
        <span>最近去过 </span>
        <i v-if="isShow" class="iconfont icon-xiala"></i>
        <i v-else class="iconfont icon-shouqi"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: true,
    };
  },
  methods: {
    handleClickLeft() {
      this.$router.push("/City");
    },
    handleClickRight() {
      this.$router.push("/cinemas/search");
    },
  },
};
</script>

<style lang="scss" scoped>
* {
  color: #191a1b;
}
.cinemas-header {
  width: 100%;
  position: fixed;
  top: 0;
}
.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 15px;
  display: flex;
}
.title,
.left,
.right {
  display: flex;
  align-items: center;
}
.title {
  flex-grow: 3;
  justify-content: center;
}
.left,
.right {
  font-size: 13px;
  flex-grow: 1;
}
.right {
  justify-content: right;
}
.header,
.cinema-list {
  border-bottom: 1px solid #ededed;
  background-color: #fff;
}
.cinema-list {
  display: flex;
  font-size: 14px;
}
.cinema-list > div {
  height: 49px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33.3%;
}
.iconfont {
  font-size: 12px;
  font-weight: 900;
  margin: 5px 0 0 3px;
}
</style>
