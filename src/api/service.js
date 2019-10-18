import {axios} from './axios'

let Service={}

const API='/zyco'

//获取一言
Service.getOneWord=()=>{
    return axios.get('https://v1.hitokoto.cn/')
}

//获取知乎日报最新文章
Service.getZhiHuDaily=()=>{
    return axios.get(API+'/api/3/stories/latest')
}

export default Service