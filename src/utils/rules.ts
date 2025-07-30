/**
 * 将表单校验单独写道一个文件里面为了页面的复用
 */
const mobileRules = [
  {
    required: true,
    message: '手机号不能为空',
  },
  {
    pattern: /^1[3-9]\d{9}$/,
    message: '手机号格式不正确',
  },
]
const passwordRules = [
  {
    required: true,
    message: '密码不能为空',
  },
  {
    pattern: /^\w{8,24}$/,
    message: '密码长度在6-12位之间',
  },
]
const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码6个数字' },
]
export { mobileRules, passwordRules, codeRules }
