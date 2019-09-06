import axios from 'axios'
import {message} from 'ant-design-vue'
import Minilog from 'minilog'

if(process.env.NODE_ENV==="development"){
    Minilog.enable()
}else{
    Minilog.disable()
}

let log=Minilog('api')

/**
 * 封装axios
 */
axios.defaults.timeout=5000

axios.interceptors.request.use(function(config){

    return config
},function(error){
    message.warning('网络请求异常',undefined,()=>{
        log.warn('request error --close')
    })
    return Promise.reject(error)
})

axios.interceptors.response.use(function(res){
    if(res.data.status===404){
        log.error('404 55555~')
        return Promise.reject('404~~')
    }else{
        return res
    }
},function(error){
    message.error('网络响应异常',undefined,()=>{
        log.error('response error --close')
    })
    return Promise.reject(error)
})

//封装get
let axiosGet=axios.get
axios.get=function(url,data={}){
    log.debug('wrapper get')
    return axiosGet(url,{
        params:data
    })
}
//封装post
let axiosPost=axios.post
axios.post=function(url,data={}){
    log.debug('wrapper post')
    return axiosPost(url,data)
}

export {axios}

