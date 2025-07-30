/**
 * 用户相关的ts定义文件
 */
// 用户信息
export type User = {
  token: string
  id: string
  account: string
  mobile: string
  avatar: string
}
// 短信验证码类型
export type CodeType = 'login' | 'register'
//短信验证码
export type Code = {
  code: string
}
