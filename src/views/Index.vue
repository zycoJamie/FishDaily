<template>
    <div class="content" :style="backgroundObj">
        <div class="center">
            <div class="card-area">
                <a-card class="card" :bordered='false' @click="clickCard" @touchstart="scale" @touchend="restoreScale">
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
            <div class="button-area" @click="refresh">
                <div style="display:inline-block;width:50%">
                    <i class="iconfont change">&#xe66a;</i>
                </div>
            </div>
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
            from:'宝可梦',
            debounce:''
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
        this.getOneWord()
    },
    methods:{
        getOneWord(){
            this.$api.get('https://v1.hitokoto.cn/')
                .then(res=>{
                    this.oneWord=res.data.hitokoto
                    this.from=res.data.from
                })
                .catch(err=>{
                    this.$log.debug('请求一言异常')
                })
        },
        scale(){
            this.$log.debug('touch start')
            document.querySelector('.card-area').classList.add('touch-scale')
        },
        restoreScale(){
            this.$log.debug('touch end')
            document.querySelector('.card-area').classList.remove('touch-scale')
        },
        clickCard(){
            this.$log.debug('click~')
        },
        refresh(){
            document.querySelector('.button-area .change').classList.add('click-rotate')
            if(this.debounce){
                clearTimeout(this.debounce)
            }
            this.debounce=setTimeout(() => {
                this.getOneWord()
                this.debounce=null
                document.querySelector('.button-area .change').classList.remove('click-rotate')
            },1000);
        }
    }
}
</script>

<style lang='scss' scoped>
@import '~style/global.scss';
$card-min-width:5rem;
$card-min-height:10rem;
    .center{
        display: inline-block;
        position: relative;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        .card-area{
            display: inline-block;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0px 5px 20px 4px;
            transition: width,height .3s linear;
            margin: 0;
            .card{
                width: 15vw;
                min-width: $card-min-width;
                min-height: $card-min-height;
            }
            .card-img{
                width: 100%;
                height: 30vw*.8;
                min-height: $card-min-height*.8;
            }
            /deep/ .ant-card-meta-description{
                color: #000;
            }
            /deep/ .ant-card-body{
                padding: 12px;
            }
        }
        .button-area{
            width: 40%;
            margin: 0 auto;
            .change{
                display: block;
                width: 100%;
                text-align: center;
                font-size: 5vh;
                color: $theme-color;
            }
        }
    }
    
    .touch-scale{
        transform: scale(.8,.8);
        transform-origin: center;
    }
    
    .click-rotate{
        transform: rotateZ(360deg);
        transform-origin: center;
        transition: all 1s linear;
    }
    
</style>
