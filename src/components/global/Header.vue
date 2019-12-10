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
            curTab:[''],
            menu:[
                {
                    key:'tool',
                    name:'百宝袋'
                },
                {
                    key:'daily',
                    name:'闲读'
                },
                {
                    key:'oneWord',
                    name:'一言'
                }
            ]
        }
    },
    mounted(){
        this.checkTab()
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
        },
        checkTab(){
            let tab=['oneWord']
            this.$log.info(this.$route)
            /**
             * vue-router组件按需加载后 在某个子路由刷新页面 this.$route.path始终得到'/'
             * 原因：
             * 1.因为按需加载组件，所以组件外部获取路由信息的时候对应组件并未加载进来，所以路由信息始终是'/'
             * 2.而在路由加载的对应组件内部，能获取到正确的this.route路由信息
             */
            switch(window.location.pathname){
                case '/'+this.menu[0].key:{
                    tab[0]=this.menu[0].key
                    break
                }
                case '/'+this.menu[1].key:{
                    tab[0]=this.menu[1].key
                    break
                }
                case '/':{
                    tab[0]=this.menu[this.menu.length-1].key
                    break
                }
                default:{
                    if(/zhuHuDailyDetail/i.test(window.location.pathname)){
                        tab[0]='daily'
                    }else{
                        tab[0]='oneWord'
                    }
                }
            }
            this.curTab=tab
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