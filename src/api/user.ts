import type { CodeType, User, Code } from '@/types/user'
import request from '@/utils/request'

export const loginByPassword = (mobile: string, password: string) => {
  return request.post<undefined, User>('/login/password', { mobile, password })
}
//获取验证码
export const getSmsCode = (mobile: string, type: CodeType) => {
  return request.get<undefined, Code>('/code', { params: { mobile, type } })
}
// 短信登录
export const loginByMobile = (mobile: string, code: string) =>
  request.post<undefined, User>('/login', { mobile, code })

//注册
export const register = (mobile: string, code: string, password: string) =>
  request.post<undefined, User>('/register', { mobile, code, password })
