<template>
  <div class="swiper-container" :class="name">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper";
import "swiper/swiper-bundle.min.css";
export default {
  props: {
    perview: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: "",
    },
  },
  mounted() {
    new Swiper("." + this.name, {
      slidesPerView: this.perview,
    });
  },
};
</script>

<style scoped lang="scss">
.box {
  overflow: hidden;
  position: relative;
}
</style>
