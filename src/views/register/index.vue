<script setup lang='ts'>
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules';
import { showToast, showSuccessToast, type FormInstance } from 'vant'
import { getSmsCode, register } from '@/api/user'
import router from '@/router';
const mobile = ref('');
const password = ref('');
const againPassword = ref('');
const agree = ref(false);
const show = ref(false);
const code = ref('');
//倒计时
const time = ref(0);
const form = ref<FormInstance>();
let timer: number;
//跳转到登录页
const toLogin = () => {
  router.push('/login')
};
//获取验证码
const getCode = async () => {
  if (time.value > 0)
    return
  // 验证手机号不通过不往下进行
  await form.value?.validate('mobile')
  await getSmsCode(mobile.value, 'register')
  showSuccessToast('验证码已发送')
  time.value = 60
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
};
//提交表单
/**
 * 后端的接口返回有点毛病，这点写的有点问题
 */
const onSubmit = async () => {
  await form.value?.validate('mobile')
  if (againPassword.value !== password.value) {
    password.value = ''
    againPassword.value = ''
    return showToast('两次输入的密码不一致')
  }
  const res = await register(mobile.value, code.value, password.value)
  if (res.token) {
    showSuccessToast('注册成功')
    router.replace('/login')
  } else {
    showToast('验证码错误')
  }
};
onUnmounted(() => {
  clearInterval(timer);
});
</script>

<template>
  <nav-bar title="注册" rightText="登录" @click-right="toLogin"></nav-bar>
  <div class="login">
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="mobile" name="mobile" label="手机号" placeholder="请输入手机号" :rules="mobileRules" type="tel" />
        <van-field v-model="password" :type="show ? 'text' : 'password'" name="密码" label="密码" placeholder="请输入密码"
          :rules="passwordRules">
          <template #button>
            <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
          </template>
        </van-field>
        <van-field v-model="againPassword" :type="show ? 'text' : 'password'" name="againPassword" label="密码"
          placeholder="请再次输入密码">
          <template #button>
            <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
          </template>
        </van-field>
        <van-field label="验证码" v-model="code" :rules="codeRules">
          <template #button>
            <span :class="{ active: time > 0 }" @click="getCode">{{ time > 0 ? `${time}秒后重新获取` : '获取验证码' }}</span>
          </template>
        </van-field>
      </van-cell-group>
      <div class="cp-cell">
        <van-checkbox v-model="agree">
          <span>我已同意</span>
          <a href="javascript:;">用户协议</a>
          <span>及</span>
          <a href="javascript:;">隐私条款</a>
        </van-checkbox>
      </div>
      <div class="cp-cell">
        <van-button block round type="primary" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<style lang='scss' scoped>
.login {
  padding-top: 46px;

  .van-form {
    margin-top: 20px;
    padding: 0 14px;

    .cp-cell {
      height: 52px;
      padding: 14px 16px;
      box-sizing: border-box;
      display: flex;
      align-items: center;

      .van-checkbox {
        a {
          color: var(--cp-primary);
          padding: 0 5px;
        }
      }
    }
  }
}
</style>