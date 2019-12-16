<template>
    <div class="center">
        <div class="col-4">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
                <a-col :span="6">
                    <a-card :bordered="true" hoverable class="card" @click="goToPages('PlaneGame')">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="true" hoverable class="card">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="true" hoverable class="card">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
                <a-col :span="6">
                    <a-card :bordered="true" hoverable class="card">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
                
            </a-row>
        </div>
        <div class="col-2">
            <a-row :gutter="{ xs: 8, sm: 16, md: 24, lg: 32 }">
                <a-col :span="12">
                    <a-card :bordered="true" hoverable class="card">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
                <a-col :span="12">
                    <a-card :bordered="true" hoverable class="card">
                        <div :style="{textAlign:'center'}"><i class="iconfont">&#xe859;</i></div>
                        <p :style="{textAlign:'center'}">飞机大战</p>
                    </a-card>
                </a-col>
            </a-row>
        </div>
    </div>
</template>

<script>
export default{
    name:'Tool',
    methods:{
        goToPages(pageName){
            const category={
                "PlaneGame":"/planeGame"
            }
            this.$router.push({path:category[pageName]})
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~style/global.scss";
$f-size:.4rem;
    .center{
        width: 80vw;
        margin: .5rem auto;
        .card{
            font-size: $f-size;
            border-radius: 10px;
            /deep/ .ant-card-body{
                padding: 15px;
            }
            .iconfont{
                font-size: $f-size+.4rem;
                color: $theme-color;
            }
        }
        .col-4{
            @media screen and (max-width:620px){
                display: none;
            }
            @media screen and (width:620px){
                display: block;
            }
        }
        .col-2{
            @media screen and (min-width:620px) {
                display: none;
            }
        }
    }
</style>