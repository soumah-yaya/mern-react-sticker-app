import axios from 'axios'

axios.defaults.baseURL = "http://127.0.0.1:5000/api"

axios.interceptors.request.use((config)=>{
    const token = window.localStorage.getItem("token")
    
    config.headers.Authorization = token || ""

    return config
})

export default axios