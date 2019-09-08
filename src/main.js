import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import {axios} from './api/axios';
import Minilog from 'minilog';
import '../public/static/style/animate.css';

Vue.config.productionTip = false;
if(process.env.NODE_ENV==="development"){
  Minilog.enable()
}else{
  Minilog.disable()
}

Vue.use(Antd);
Vue.prototype.$api=axios;
Vue.prototype.$log=Minilog('app')

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
