<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
          <header-menu></header-menu>
      </a-layout-header>
      <a-layout-content>
        <router-view />
      </a-layout-content>
      <a-layout-footer>

      </a-layout-footer>

    </a-layout>
    
  </div>
</template>

<script>
import HeaderMenu from './components/global/Header'
export default {
    name:'App',
    components:{
      HeaderMenu
    }
}

</script>

<style lang="scss" scoped>
@import '~style/global.scss';
  .ant-layout{
    .ant-layout-header{
      background: $theme-color;
      padding: 0px;
      width: 100%;
      line-height: $index-header-height;
      height: $index-header-height;
      position: fixed;
      z-index: 2;
    }
    .ant-layout-content{
      margin-top: $index-header-height;
      height: $index-content-height;
    }
    .ant-layout-footer{
      height: $index-footer-height;
      padding: 0px;
    }
  }
  
</style>
