<template>
  <div class="box">
    <slot></slot>
    <div>{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  props: ["title"],
};
</script>
<style lang="scss" scoped>
.box {
  height: 50px;
  width: 100%;
}
</style>
