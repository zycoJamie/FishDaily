import Vue from "vue";
import Router from "vue-router";
//import Daily from './views/Daily.vue'


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
      path: "/daily",
      name: "daily",
      component: ()=> import ('./views/Daily.vue')
    },
    {
      path: "/tool",
      name: "tool",
      component: ()=> import ('./views/Tool.vue')
    }
  ]
});
