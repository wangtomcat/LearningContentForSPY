<template>
  <div class="nav">
    <ul>
      <router-link
        to="/films/NowPlaying"
        custom
        v-slot="{ navigate, isActive }"
      >
        <li @click="navigate" :class="isActive ? 'active' : ''">
          <span>正在热映</span>
        </li>
      </router-link>
      <router-link
        to="/films/ComingSoon"
        custom
        v-slot="{ navigate, isActive }"
      >
        <li @click="navigate" :class="isActive ? 'active' : ''">
          <span>即将上映</span>
        </li>
      </router-link>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.active {
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
