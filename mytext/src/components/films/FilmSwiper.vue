<template>
  <div class="swiper-container box">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from "swiper/swiper-bundle.js";
import "swiper/swiper-bundle.min.css";
export default {
  mounted() {
    new Swiper(".box", {
      // direction: 'vertical', // 垂直切换选项
      loop: true, // 循环模式选项
      centeredSlides: true,
      // 自动播放
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      // 分页器
      pagination: {
        el: ".swiper-pagination",
        // 是否可以点击分页器
        clickable: true,
      },
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
