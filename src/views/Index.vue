<template>
    <div class="content" :style="backgroundObj">
        
    </div>
</template>

<script>

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
            ]
        }
    },
    computed:{
        backgroundObj(){
            this.background['backgroundImage']=`url(${this.bgList[0]})`
            return this.background
        }
    },
    mounted(){
        
    }
}
</script>

<style lang='scss'>
    
</style>
