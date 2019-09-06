<template>
    <div class="content" :style="backgroundObj">
        <div class="card-area">
            <a-card class="card" hoverable :bordered='false'>
                <template v-slot:cover>
                    <img class="card-img" :src="cardImg" alt="一言">
                </template>
                <a-card-meta class="card-text">
                    <template v-slot:description>
                        {{oneWord}}<br>
                        <p style="text-align:end">---{{from}}</p>
                    </template>
                </a-card-meta>
            </a-card>
        </div>
        
    </div>
</template>

<script>
import imgList from '../../public/static/json/imgList.json'
export default {
    name:"Index",
    data(){
        return {
            background:{
                height:'100%',
                width:'100%',
                backgroundImage:'',
                backgroundRepeat:'no-repeat',
                backgroundAttachment:'fixed',
                backgroundPosition:'center'
            },
            bgList:[
                'https://s2.ax1x.com/2019/09/05/nnkmq0.jpg'
            ],
            oneWord:'皮卡丘',
            from:'宝可梦'
        }
    },
    computed:{
        backgroundObj(){
            this.background['backgroundImage']=`url(${this.bgList[0]})`
            return this.background
        },
        cardImg(){
            return imgList.oneWord[0]
        }
    },
    mounted(){
        this.$api.get('https://v1.hitokoto.cn/')
            .then(res=>{
                this.oneWord=res.data.hitokoto
                this.from=res.data.from
            })
            .catch(err=>{
                this.$log.debug('请求一言异常')
            })
    }
}
</script>

<style lang='scss' scoped>
    .card-area{
        display: inline-block;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        border-radius: 10px;
        overflow: hidden;
        box-shadow: 0px 5px 20px 4px;
        .card{
            width: 15vw;
            height: 30vw;
        }
        .card-img{
            width: 100%;
            height: 30vw*.8;
        }
    }
    
</style>
