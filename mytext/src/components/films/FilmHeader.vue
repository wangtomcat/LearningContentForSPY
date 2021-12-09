<template>
  <div class="nav">
    <ul>
      <li ref="now" @click="handleClickNow">
        <span>正在热映</span>
      </li>
      <li ref="soon" @click="handleClickSoon">
        <span>即将上映</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  mounted() {
    if (
      this.$router.currentRoute.fullPath === "/films/NowPlaying" ||
      this.$router.currentRoute.fullPath === "/Films/NowPlaying"
    ) {
      this.$refs.now.className = "select";
    } else if (this.$router.currentRoute.fullPath === "/films/ComingSoon") {
      this.$refs.soon.className = "select";
    }
  },
  methods: {
    handleClickNow() {
      console.log(11111);
      this.$refs.now.className = "select";
      this.$refs.soon.className = "";
      this.$router.push("/films/NowPlaying");
    },
    handleClickSoon() {
      this.$refs.now.className = "";
      this.$refs.soon.className = "select";
      this.$router.push("/films/ComingSoon");
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  background-color: #fff;
  color: red;
}
.nav {
  width: 100%;
  height: 50px;
  position: sticky;
  top: 0;
  z-index: 9;
}
ul {
  height: 100%;
  display: flex;
  border-bottom: 1px solid #ededed;
}
li {
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
}
.header {
  display: flex;
  height: 50px;
  background-color: #fff;
  border-bottom: 1px solid #ededed;
}
.header-left {
  position: absolute;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 13px;
  cursor: pointer;
}
.header-title {
  display: flex;
  align-items: center;
  margin: 0 auto;
  color: #191a1b;
  font-size: 17px;
}
.iconfont {
  font-size: 12px;
  font-weight: 900;
  margin: 0 0 0 3px;
}
</style>
