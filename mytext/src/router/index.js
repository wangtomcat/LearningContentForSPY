import Vue from "vue";
import VueRouter from "vue-router";
import Films from "@/views/Films.vue";
// import comingSoon from "@/views/Films/comingSoon.vue";
import NowPlaying from "@/views/films/NowPlaying.vue";
import Detail from "@/views/Detail.vue";
import Cinemas from "@/views/Cinemas.vue";
import Center from "@/views/Center.vue";
import Login from "@/views/Login.vue";
import Search from "@/views/Search.vue";
import City from "@/views/City.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Films",
    component: Films,
    children: [
      {
        path: "/films/NowPlaying",
        name: "NowPlaying",
        component: NowPlaying,
      },
      {
        path: "/films/ComingSoon",
        component: () => import("@/views/films/ComingSoon.vue"),
      },
      {
        path: "/Films",
        redirect: {
          name: "NowPlaying",
        },
      },
    ],
  },
  {
    path: "/detail/:id",
    component: Detail,
  },
  {
    path: "/cinemas",
    component: Cinemas,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/cinemas/search",
    component: Search,
  },
  {
    path: "/City",
    component: City,
  },
  {
    path: "/center",
    component: Center,
    meta: {
      abc: true,
    },
    beforeEnter: (to, form, next) => {
      if (to.meta.abc) {
        if (localStorage.getItem("name")) {
          next();
        } else {
          next("/Login");
        }
      } else {
        next();
      }
    },
  },

  {
    path: "*",
    redirect: "/Films",
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});
// router.beforeEach((to, form, next) => {
//   console.log(to);
//   if (to.meta.abc) {
//     if (localStorage.getItem("name")) {
//       next();
//     } else {
//       next("/login");
//     }
//   } else {
//     next();
//   }
// });
export default router;
