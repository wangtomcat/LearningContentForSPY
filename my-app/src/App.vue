<template>
  <div>
    <router-view></router-view>
    <tabbar v-show="$store.state.isShow"></tabbar>
  </div>
</template>

<script>
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";
import tabbar from "@/components/Tabbar";

Vue.use(Vant);
export default {
  components: {
    tabbar,
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
