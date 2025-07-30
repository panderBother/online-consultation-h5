import axios from 'axios'
import { useUserStore } from '@/stores'
import router from '@/router'
import { showFailToast } from 'vant'
const baseURL = 'https://consult-api.itheima.net/'
// 创建实例时配置默认值
const instance = axios.create({
  baseURL,
  timeout: 5000,
})

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const userStore = useUserStore()
    if (userStore.userInfo?.token) {
      config.headers.Authorization = `Bearer ${userStore.userInfo.token}`
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    if (response.data?.code !== 10000) {
      showFailToast(response.data)
    }
    // 对响应数据做点什么
    return response.data?.data || response.data
  },
  function (error) {
    if (error.response.status === 401) {
      //删除用户信息
      const userStore = useUserStore()
      showFailToast('登录信息已过期，请重新登录')
      userStore.removeUserInfo()
      //跳转登录页面
      router.push(`/login?redirect=${router.currentRoute.value.fullPath}`)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
  },
)
export default instance
export { baseURL }
