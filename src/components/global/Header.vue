<template>
    <div class="header">
        <a-menu v-model='curTab' mode="horizontal" @select="changeMenu">
              <a-menu-item v-for="item in menu" :key="item.key">
                  {{item.name}}
              </a-menu-item>
          </a-menu>
    </div>
</template>

<script>
export default {
    name:'HeaderMenu',
    data(){
        return {
            curTab:['oneWord'],
            menu:[
                {
                    key:'tool',
                    name:'百宝袋'
                },
                {
                    key:'football',
                    name:'足球'
                },
                {
                    key:'oneWord',
                    name:'一言'
                }
            ]
        }
    },
    methods:{
        changeMenu(item){
            let length=this.menu.length
            switch(item.key){
                case this.menu[0].key:{
                    this.$router.push({path:`/${this.menu[0].key}`})
                    break
                }
                case this.menu[1].key:{
                    this.$router.push({path:`/${this.menu[1].key}`})
                    break
                }
                case this.menu[length-1].key:{
                    this.$router.push({path:`/`})
                    break
                }
                default:{
                    this.$router.push({path:`/`})
                }
            }
        }
    }
}
</script>

<style lang="scss">
@import '~style/global.scss';
    .header{
        .ant-menu{
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
        .ant-menu-horizontal{
            border-bottom: none;
            display: flex;
            flex-direction: row-reverse;
        }
    }
    

</style>