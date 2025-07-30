import type { User } from '@/types/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'

/**
 * 存储用户登录的相关信息
 */
export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<User>({} as User)
    // 设置用户信息
    const setUserInfo = (user: User) => {
      userInfo.value = user
    }
    //删除用户信息
    const removeUserInfo = () => {
      userInfo.value = {} as User
    }
    //返回变量和方法
    return { userInfo, setUserInfo, removeUserInfo }
  },
  // 方式一：持久化存储全部的数据
  {
    persist: true,
  },
  // 方式二：持久化存储指定的数据
  // {
  //   persist: {
  //     storage: sessionStorage,
  //     paths: ['userInfo'],
  //   },
  // },
)
