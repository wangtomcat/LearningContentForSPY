<template>
  <div>
    <router-view></router-view>
    <tab-bar v-show="$store.state.isShow"></tab-bar>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import tabBar from "@/components/Tab-bar";

Vue.use(Vant);
export default {
  components: {
    tabBar,
  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
li {
  list-style: none;
}
</style>
