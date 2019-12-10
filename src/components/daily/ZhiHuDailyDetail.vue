<template>
    <div class="zhihu-daily-detail">
        <div class="content">
            <div v-html="content"></div>
        </div>
    </div>
</template>

<script>
import Service from '../../api/service'
export default {
    name: "ZhiHuDailyDetail",
    data(){
        return {
            newsId:0,
            content:'<p style="text-align:center">数据被弄丢啦555~</p>',
            outerStyleAndJs:null
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.init()
        })
    },
    beforeDestroy(){
        this.removeCssAndJs(this.outerStyleAndJs)
    },
    methods:{
        init(){
            this.newsId=this.$route.params.id
            this.getDetail(this.newsId)
        },
        getDetail(id){
            return Service.getZhuHuDailyDetail(id).then(res=>{
                let response=res.data || {}
                if(response.body){
                    this.content=response.body
                    this.outerStyleAndJs=this.loadCssAndJs(response.css[0],response.js[0])
                    this.$nextTick(()=>{
                        const metaDom=document.querySelector('.meta')
                        const coverDom=document.querySelector('.img-place-holder')
                        const avatarDom=document.querySelector('.meta .avatar')
                        const bioDom=document.querySelector('.meta .bio') //作者简介
                        
                        coverDom.style.cssText="height:auto;"
                        const imgDom=document.createElement('img')
                        imgDom.src=response.image
                        coverDom.appendChild(imgDom)

                        avatarDom.style.cssText="margin:0px;display:inline;"
                        metaDom.style.cssText="white-space:normal;background:rgba(0,0,0,0.1);border-radius:10px;padding:10px;"
                        bioDom.style.cssText="display:block;"
                    })
                }
            }).catch(err=>{
                this.$log.error(err)
            })
            
        },
        
    }
}
</script>

<style lang='scss' scoped>
@import '~style/global.scss';
.zhihu-daily-detail{
    .content{
        width: 80vw;
        min-height: 80vh;
        margin: .5rem auto;
        background-color: #fff;
        border-radius: 10px;
        padding: 10px;
    }
}
</style>
