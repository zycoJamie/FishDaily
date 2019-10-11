import {axios} from './axios'

let Service={}
const Gank='/gank'

//获取一言
Service.getOneWord=()=>{
    return axios.get('https://v1.hitokoto.cn/')
}

//获取Daily模块的目录
Service.getDailyCategory=()=>{
    return axios.get(Gank+'/api/xiandu/category/wow')
}

export default Service