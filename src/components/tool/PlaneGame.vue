<template>
    <div>
        <canvas ref="stage"></canvas>
    </div>
</template>

<script>
import PlaneImage from '../../assets/img/plane.png'
export default {
    name: "PlaneGame",
    data(){
        this.stateList={
            'start':0,
            'running':1,
            'over':2,
            'pause':-1,
        }
        return {
            stageWidth: 0,
            stageHeight: 0,
            context: null,
            state:this.stateList['start'],
        }
    },
    mounted(){
        this.$nextTick(()=>{
            this.initStage()
            this.drawWelcome()
            this.runTime()
        })
    },
    methods:{
        //初始化canvas
        initStage(){
            this.stageWidth=document.documentElement.clientWidth
            this.stageHeight=document.documentElement.clientHeight
            this.stageHeight=this.stageHeight-this.stageHeight*0.072 //去掉header的高度
            this.$log.debug(this.stageWidth,this.stageHeight)
            this.$refs['stage'].style.width=this.stageWidth+'px'
            this.$refs['stage'].style.height=this.stageHeight+'px'
            this.$refs['stage'].style.backgroundColor='#000'
            //设置画布坐标系宽高
            this.$refs['stage'].setAttribute('width',this.stageWidth)
            this.$refs['stage'].setAttribute('height',this.stageHeight)

            this.$refs['stage'].addEventListener('click',()=>{
                this.$log.debug('click stage')
                if(this.state===this.stateList['start']){
                    this.state=this.stateList['running']
                }
            })
            

            this.context=this.$refs['stage'].getContext('2d')
        },
        //绘制开始界面
        drawWelcome(){
            this.context.clearRect(0,0,this.stageWidth,this.stageHeight)
            this.context.font="bold 50px 微软雅黑"
            this.context.fillStyle='#fff'
            const txtWidth=this.context.measureText('飞机大战').width
            //You can get a very close approximation of the vertical height by checking the length of a capital M.
            const txtHeight=this.context.measureText('M').width
            this.context.fillText('飞机大战',this.stageWidth/2-txtWidth/2,this.stageHeight/2-txtHeight/2)
            // this.$log.debug('drawWelcome',this.stageWidth/2-txtWidth/2,this.stageHeight/2-txtHeight/2)
        },
        runTime(){
            let planeImg=new Image()
            planeImg.src=PlaneImage
            const planeCng={
                img:planeImg,
                width:100,
                height:100,
                x:this.stageWidth/2-100/2,
                y:this.stageHeight-100,
                context:this.context
            }
            let plane=new this.Plane(planeCng)
            setInterval(()=>{
                switch(this.state){
                    case this.stateList['start']:{
                        this.drawWelcome()
                        break
                    }
                    case this.stateList['running']:{
                        this.context.clearRect(0,0,this.stageWidth,this.stageHeight)
                        plane.paint()
                        break
                    }
                }
            },30)
            
        },
        Plane(config){
            this.img=config.img
            this.x=config.x
            this.y=config.y
            this.width=config.width
            this.height=config.height
            this.paint=()=>{
                config.context.drawImage(this.img,this.x,this.y,this.width,this.height)
            }
        },

    }
}
</script>

<style lang='stylus' scoped>

</style>
