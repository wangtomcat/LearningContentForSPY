<template>
  <footer>
    <div @click="handleClickFilm" ref="Film">
      <i class="iconfont icon-dianying"> </i>
      <span>电影</span>
    </div>
    <div @click="handleClickCinemas" ref="Cinemas">
      <i class="iconfont icon-yingyuan"> </i>
      <span>影院</span>
    </div>
    <div @click="handleClickCenter" ref="Center">
      <i class="iconfont icon-wode"> </i>
      <span>我的</span>
    </div>
    <!-- <router-link to="/Films" custom v-slot="{ navigate, isActive }">
      <div @click="navigate" :class="isActive ? 'active' : ''">
        <i class="iconfont icon-dianying"> </i>
        <span>电影</span>
      </div>
    </router-link>
    <router-link to="/Cinemas" custom v-slot="{ navigate, isActive }">
      <div @click="navigate" :class="isActive ? 'active' : ''">
        <i class="iconfont icon-yingyuan"> </i>
        <span>影院</span>
      </div>
    </router-link>
    <router-link to="/Center" custom v-slot="{ navigate, isActive }">
      <div @click="navigate" :class="isActive ? 'active' : ''">
        <i class="iconfont icon-wode"> </i>
        <span>我的</span>
      </div>
    </router-link> -->
  </footer>
</template>

<script>
export default {
  mounted() {
    if (
      this.$router.currentRoute.fullPath === "/films/NowPlaying" ||
      this.$router.currentRoute.fullPath === "/"
    ) {
      this.$refs.Film.className = "active";
    } else if (this.$router.currentRoute.fullPath === "/Cinemas") {
      this.$refs.Cinemas.className = "active";
    } else if (this.$router.currentRoute.fullPath === "/Center") {
      this.$refs.Center.className = "active";
    }
  },
  methods: {
    handleClickFilm() {
      this.$refs.Film.className = "active";
      this.$refs.Cinemas.className = "";
      this.$refs.Center.className = "";
      this.$router.push("/Films");
    },
    handleClickCinemas() {
      this.$refs.Film.className = "";
      this.$refs.Cinemas.className = "active";
      this.$refs.Center.className = "";
      this.$router.push("/Cinemas");
    },
    handleClickCenter() {
      this.$refs.Film.className = "";
      this.$refs.Cinemas.className = "";
      this.$refs.Center.className = "active";
      this.$router.push("/Center");
    },
  },
};
</script>

<style>
.active {
  color: red;
}
footer {
  width: 100%;
  display: flex;
  position: fixed;
  z-index: 9;
  background-color: #fff;
  left: 0;
  bottom: 0;
}
footer div {
  width: 33.3%;
  text-align: center;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
}
</style>
