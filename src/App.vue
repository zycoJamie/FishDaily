<template>
  <div id="app">
    <a-layout>
      <a-layout-header>
          <a-menu v-model='curTab' mode="horizontal" :style="{width:'100vw',height:'10vh',lineHeight:'10vh'}">
              <a-menu-item key='tool'>
                  百宝袋
              </a-menu-item>
              <a-menu-item key='football'>
                  足球
              </a-menu-item>
              <a-menu-item key='oneWord'>
                  一言
              </a-menu-item>
          </a-menu>
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

export default {
    name:'App',
    data(){
        return {
            curTab:['oneWord']
        }
    }
}

</script>

<style lang="scss" scoped>
@import '~style/global.scss';
  /deep/ .ant-layout-header{
    background: $theme-color;
    padding: 0px;
    height: 10vh;
    .ant-menu{
        background-color: $theme-color;
        padding: 0 10vw;
        color: $header-menu-color;
        .ant-menu-item-selected,.ant-menu-item-active{
            border-bottom: 2px solid $header-menu-color;
            color: $header-menu-color;
            background-color: $header-menu-selected-color;
        }
    }
    .ant-menu-horizontal{
        border-bottom: none;
        display: flex;
        flex-direction: row-reverse;
    }
  }
</style>
