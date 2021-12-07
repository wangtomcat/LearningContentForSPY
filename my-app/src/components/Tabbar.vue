<template>
  <footer>
    <!-- <router-link to="/center" tag="li" active-class="active">我的</router-link>
      <router-link to="/Films" tag="li" active-class="active">电影</router-link>
      <router-link to="/cinemas" tag="li" active-class="active">影院</router-link> -->
    <router-link to="/Films" custom v-slot="{ navigate, isActive }">
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
    </router-link>
  </footer>
</template>

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
