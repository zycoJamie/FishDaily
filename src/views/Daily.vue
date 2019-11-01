<template>
    <div class="center">
        <div class="top">
            <a-tabs type="card" v-model="curTab">
                <a-tab-pane v-for="item in tabs" :key="item._id">
                    <template slot="tab">
                        <img :style="{width:'20px',height:'20px',borderRadius:'50%'}" :src="item.icon"/>
                        {{item.title}}
                    </template>
                </a-tab-pane>
            </a-tabs>
        </div>
        <div class="list">
            <a-list itemLayout="horizontal" :dataSource="dataList">
                <a-list-item slot="renderItem" slot-scope="item" @click="watchDetail(item)">
                    <a-list-item-meta>
                        <template slot="avatar">
                            <img :src="item.cover" :style="{width:'100px',height:'100px'}"/>
                        </template>
                        <template slot="title">
                            {{item.title}}
                        </template>
                    </a-list-item-meta>
                </a-list-item>
            </a-list>
        </div>
        
    </div>
</template>

<script>
import Service from '../api/service'
export default {
    name:'Daily',
    data(){
        return {
            curTab: 0,
            tabs:[
                {
                    _id: 0,
                    icon: "http://ww4.sinaimg.cn/large/610dc034jw1f9sfzr2gmnj204v04va9y.jpg",
                    title: "知乎日报"
                }
            ],
            dataList:[],
            zhiHuDaily:[]
        }
    },
    watch:{
        curTab:{
            handler:function(newVal,oldVal){
                switch(newVal){
                    case 0:{
                        if(this.zhiHuDaily.length<=0){
                            this.getZhiHuDaily()
                        }else{
                            this.dataList=this.zhiHuDaily
                        }
                        break
                    }
                    default:{
                        this.dataList=[]
                    }
                }
            },
            immediate:true
        }
    },
    mounted(){
        
    },
    methods:{
        getZhiHuDaily(){
            return Service.getZhiHuDaily()
                .then(res=>{
                    let stories=res.data.stories || []
                    stories=stories.map(item=>{
                        return {
                            id:item.id,
                            url:item.url,
                            title:item.title,
                            cover:item.images?item.images[0]:''
                        }
                    })
                    let top=res.data.top_stories || []
                    top=top.map(item=>{
                        return {
                            id:item.id,
                            url:item.url,
                            title:item.title,
                            cover:item.image
                        }
                    })
                    this.zhiHuDaily=stories.concat(top)
                    this.dataList=this.zhiHuDaily
                })
        },
        watchDetail(target){
            //window.location.assign(target.url)
            this.$router.push({path:`/zhuHuDailyDetail/${target.id}`})
        }
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
        .list{
            background-color: #fff;
            padding: 10px;
        }
    }
</style>