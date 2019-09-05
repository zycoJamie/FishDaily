<template>
    <div class="header">
        <a-menu v-model='curTab' mode="horizontal">
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
    </div>
</template>

<script>
export default {
    name:'header',
    data(){
        return {
            curTab:['oneWord']
        }
    }
}
</script>

<style lang="scss">
@import '~style/global.scss';
    .header{
        /deep/ .ant-menu{
            line-height: $index-header-height;
            background-color: $theme-color;
            padding: 0 10vw;
            color: $header-menu-color;
            .ant-menu-item-selected,.ant-menu-item-active{
                border-bottom: 2px solid $header-menu-color;
                color: $header-menu-color;
                background-color: $header-menu-selected-color;
            }
        }
        /deep/ .ant-menu-horizontal{
            border-bottom: none;
            display: flex;
            flex-direction: row-reverse;
        }
    }
    

</style>