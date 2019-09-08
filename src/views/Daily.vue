<template>
    <div class="center">
        <div class="top">
            <a-tabs type="card">
                <a-tab-pane v-for="item in tabs" :key="item.key" :tab="item.label"></a-tab-pane>
            </a-tabs>
        </div>
        <div class="list">
            Daily
        </div>
        
    </div>
</template>

<script>
export default {
    name:'Daily',
    data(){
        return {
            tabs:[
                {
                    key:"1",
                    label:"知乎日报"
                },
                {
                    key:"2",
                    label:"知乎日报"
                }
            ]
        }
    },
    mounted(){
        
    }
}    
</script>

<style lang="scss" scoped>
@import '~style/global.scss';
    .center{
        width: 80vw;
        margin: .5rem auto;
        .top{
            /deep/ .ant-tabs-bar{
                margin: 0;
                border: none;
            }
            /deep/ .ant-tabs-tab{
                margin: 0;
                border: none;
                background-color: transparent;
                &:hover{
                    color: $theme-color;
                }
            }
            /deep/ .ant-tabs-tab-active{
                background-color: #fff;
                color: $theme-color;
            }
        }
    }

    .list{
        background-color: #fff;
    }
</style>