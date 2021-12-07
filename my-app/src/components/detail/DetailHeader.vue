<template>
  <div class="header">
    <img @click="$router.back()" src="@/img/pin-film-title.png" alt="" />
    <div class="title">{{ value }}</div>
  </div>
</template>
<script>
export default {
  props: ["value"],
};
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 44px;
  display: flex;
  position: fixed;
  z-index: 9;
}
img {
  position: absolute;
  width: 30px;
  top: 5px;
  left: 5px;
}
.header .title {
  display: none;
  transition: all 0.3s ease;
  background-color: rgba(255, 255, 255);
  width: 100%;
  line-height: 44px;
  font-size: 17px;
  text-align: center;
}
</style>
