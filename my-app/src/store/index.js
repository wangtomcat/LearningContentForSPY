import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    cityName: "上海",
    cityId: "310100",
    datalist: [],
    isShow: true,
    total: 0,
    cinemasList: [],
  },
  plugins: [
    createPersistedState({
      reducer: (state) => {
        return {
          cityName: state.cityName,
          cityId: state.cityId,
        };
      },
    }),
  ],
  // 支持同步
  mutations: {
    changeCityName(state, newCityName) {
      state.cityName = newCityName;
    },
    changeCityId(state, newCityId) {
      state.cityId = newCityId;
    },
    changeCinemaData(state, newCityId) {
      state.cityId = newCityId;
    },
    clearCinema(state) {
      state.cinemasList = [];
    },
    show(state) {
      state.isShow = true;
    },
    hide(state) {
      state.isShow = false;
    },
  },
  // 支持异步，同步
  actions: {
    getFilmsData(store, cityId) {
      http({
        url: `/gateway?cityId=${cityId}&pageNum=1&pageSize=10&type=1&k=3866204`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        store.commit("changeCinemaData", cityId);
        store.state.datalist = res.data.data.films;
        store.state.total = res.data.data.total;
      });
    },
    getCinemaData(store, cityId) {
      http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=4386116`,
        headers: {
          "X-Host": " mall.film-ticket.cinema.list",
        },
      }).then((res) => {
        store.state.cinemasList = res.data.data.cinemas;
      });
    },
  },
  modules: {},
});
