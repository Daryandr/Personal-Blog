import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import HomeView from "../views/HomeView.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/post/:id",
    name: "post",
    component: () =>
      import(/* webpackChunkName: "post" */ "../views/PostView.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
