import Vue from "vue";
import Router from "vue-router";


Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "index",
      component: ()=> import ('./views/Index.vue')
    },
    {
      path: "/football",
      name: "football",
      component: ()=> import ('./views/Football.vue')
    },
    {
      path: "/tool",
      name: "tool",
      component: ()=> import ('./views/Tool.vue')
    }
  ]
});
