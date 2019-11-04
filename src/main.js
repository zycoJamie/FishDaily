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

Vue.mixin({
  methods: {
    loadCssAndJs(cssUrl,jsUrl){
      const headDom=document.querySelector('head')
      const linkDom=document.createElement('link')
      linkDom.rel='stylesheet'
      linkDom.href=cssUrl
      const scriptDom=document.createElement('script')
      scriptDom.src=jsUrl
      headDom.appendChild(linkDom)
      headDom.appendChild(scriptDom)
      return {linkDom,scriptDom}
    },
    removeCssAndJs({linkDom,scriptDom}){
      const headDom=document.querySelector('head')
      headDom.removeChild(linkDom)
      headDom.removeChild(scriptDom)
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
