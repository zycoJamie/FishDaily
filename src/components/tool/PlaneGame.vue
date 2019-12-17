<template>
    <div>
        <canvas ref="stage"></canvas>
    </div>
</template>

<script>
import PlaneImage from '../../assets/img/plane.png'
import StarImage from '../../assets/img/star.png'
import AlienImage from '../../assets/img/alien.png'
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
            state: this.stateList['start'],
            score: 0,
            life: 3,
            plane: null,
            stars: [],
            aliens: [],
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
                this.$log.debug(this.stars)
                if(this.state===this.stateList['start']){
                    this.state=this.stateList['running']
                }
            })

            this.$refs['stage'].addEventListener('mousemove',(e)=>{
                if(this.state===this.stateList['running']){
                    this.plane.move(e.offsetX-this.plane.width/2,e.offsetY-this.plane.height/2)
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
            this.createPlane() //创建玩家飞机
            let starImg=new Image()
            starImg.src=StarImage
            let alienImg=new Image()
            alienImg.src=AlienImage
            setInterval(()=>{
                switch(this.state){
                    case this.stateList['start']:{
                        this.drawWelcome()
                        break
                    }
                    case this.stateList['running']:{
                        this.context.clearRect(0,0,this.stageWidth,this.stageHeight)
                        this.plane.paint()
                        this.drawScore()
                        this.createStar(starImg) //创建星星
                        this.moveStars() //移动星星
                        this.drawStars() //绘制星星
                        this.destroyStars() //销毁星星
                        this.createAlien(alienImg) 
                        this.moveAliens() 
                        this.drawAliens() 
                        this.destroyAliens() 
                        this.crashCheck()
                        break
                    }
                    case this.stateList['over']:{

                        break
                    }
                }
            },10)
            
        },
        Plane(config){
            this.img=config.img
            this.x=config.x
            this.y=config.y
            this.width=config.width
            this.height=config.height
            this.paint=()=>{
                config.context.drawImage(this.img,this.x,this.y,this.width+15,this.height+15)
            }
            this.move=(x,y)=>{
                this.x=x
                this.y=y
            }
        },
        createPlane(){
            let planeImg=new Image()
            planeImg.src=PlaneImage
            const planeCng={
                img:planeImg,
                width:70,
                height:70,
                x:this.stageWidth/2-70/2,
                y:this.stageHeight-70,
                context:this.context
            }
            this.plane=new this.Plane(planeCng)
        },
        //绘制计分板
        drawScore(){
            this.context.font="15px serif"
            this.context.fillText(`SCORE:${this.score}`,this.stageWidth-this.context.measureText(`SCORE:${this.score}`).width-25,20)
            this.context.fillText(`生命:${this.life}`,this.stageWidth-this.context.measureText(`生命:${this.life}`).width-25,40)
        },
        Star(config){
            this.img=config.img
            this.x=Math.random()*(config.stageWidth-config.width)
            this.y=-config.height
            this.width=config.width
            this.height=config.height
            this.paint=()=>{
                config.context.drawImage(this.img,this.x,this.y,this.width,this.height)
            }
            this.friction=0
            this.destroy=false //是否应该销毁
            this.isSubScore=false //未捡到的星星是否造成扣分
            this.move=()=>{
                this.friction++
                if(this.friction%2===0){
                    ++this.y
                    if(this.y>=config.stageHeight){
                        this.destroy=true
                        this.isSubScore=true
                    }
                }
            }
            this.crash=()=>{
                this.destroy=true
            }
        },
        //一定概率创建星星
        createStar(img){
            let threshold=Math.random()*100
            if(threshold>=90 && threshold<=93 && this.stars.length<50){
                const starCng={
                    img,
                    width:30,
                    height:30,
                    stageWidth:this.stageWidth,
                    stageHeight:this.stageHeight,
                    context:this.context
                }
                this.stars.push(new this.Star(starCng))
            }
        },
        drawStars(){
            this.stars.map(star=>{
                star.paint()
            })
        },
        //移动已创建星星
        moveStars(){
            this.stars.map(star=>{
                star.move()
            })
        },
        //销毁星星
        destroyStars(){
            this.stars.map((star,index)=>{
                if(star.isSubScore){
                    this.subScore()
                }
                if(star.destroy){
                    this.stars.splice(index,1)
                }
            })
        },
        //碰撞检测
        crashCheck(){
            this.stars.map(star=>{
                if(this.plane.x+this.plane.width > star.x
                && this.plane.x < star.x+star.width
                && this.plane.y+this.plane.height > star.y
                && this.plane.y < star.y+star.height){
                    star.crash()
                    this.addScore()
                }
            })
            this.aliens.map(alien=>{
                if(this.plane.x+this.plane.width > alien.x+alien.width*0.5
                && this.plane.x < alien.x+alien.width*0.5
                && this.plane.y+this.plane.height > alien.y+alien.height*0.5
                && this.plane.y < alien.y+alien.height*0.5){
                    alien.crash()
                    this.subLife()
                }
            })
        },
        //加分
        addScore(){
            this.score++
        },
        //减分
        subScore(){
            this.score-=5
            if(this.score<=0){
                this.subLife()
            }
        },
        //减生命值
        subLife(){
            this.life--
            if(this.life===0){
                this.state=this.stateList['over']
            }
        },
        Alien(config){
            this.img=config.img
            this.x=Math.random()*(config.stageWidth-config.width)
            this.y=-config.height
            this.width=config.width
            this.height=config.height
            this.paint=()=>{
                config.context.drawImage(this.img,this.x,this.y,this.width,this.height)
            }
            this.destroy=false //是否应该销毁
            this.move=()=>{
                ++this.y
                if(this.y>=config.stageHeight){
                    this.destroy=true
                }
            }
            this.crash=()=>{
                this.destroy=true
            }
        },
        //一定概率创建外星人
        createAlien(img){
            let threshold=Math.random()*100
            if(threshold>=90 && threshold<=94 && this.aliens.length<20){
                const alienCng={
                    img,
                    width:30,
                    height:30,
                    stageWidth:this.stageWidth,
                    stageHeight:this.stageHeight,
                    context:this.context
                }
                this.aliens.push(new this.Alien(alienCng))
            }
        },
        drawAliens(){
            this.aliens.map(alien=>{
                alien.paint()
            })
        },
        //移动已创建外星人
        moveAliens(){
            this.aliens.map(alien=>{
                alien.move()
            })
        },
        //销毁外星人
        destroyAliens(){
            this.aliens.map((alien,index)=>{
                if(alien.destroy){
                    this.aliens.splice(index,1)
                }
            })
        },
    }
}
</script>

<style lang='stylus' scoped>

</style>
