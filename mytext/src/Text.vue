<template>
  <div class="box">
    <div class="scroll">
      <div v-if="down">刷新...</div>
      <div v-if="$store.state.datalist.length">
        <p v-for="data in $store.state.datalist" :key="data.fileId">
          {{ data.name }}
        </p>
      </div>
      <!-- <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p> -->
      <!-- <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p>
      <p>1111111111111111</p> -->
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
import http from "@/util/http";

export default {
  data() {
    return {
      down: false,
    };
  },
  mounted() {
    this.$store.dispatch("getFilmsData", this.$store.state.cityId);
    this.scroll = new BScroll(".box", {
      pullUpLoad: true,
      scrollbar: {
        fade: true,
      },
      pullDownRefresh: {
        threshold: 50, //触发pullingDown事件的位置
        stop: 30, //下拉回弹后停留的位置},
      },
    });
    this.scroll.on("pullingDown", () => {
      this.down = true;
      this.$store.state.datalist = [];
      this.$store
        .dispatch("getFilmsData", this.$store.state.cityId)
        .then(() => {
          console.log("完成");
          this.down = false;
          this.scroll.finishPullDown();
        });
    });
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
.box {
  width: 100%;
  height: 300px;
  overflow: hidden;
}
</style>
