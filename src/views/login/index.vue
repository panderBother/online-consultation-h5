<script setup lang='ts'>
import { ref, onUnmounted } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules';
import { showToast, showSuccessToast, type FormInstance, showFailToast } from 'vant'
import { loginByPassword, getSmsCode, loginByMobile } from '@/api/user'
import { useUserStore } from '@/stores';
import router from '@/router';
import { useRoute } from 'vue-router'
const toRegister = () => {
  router.push('/register')
  console.log('toRegister')
}
const mobile = ref('');
const password = ref('');
const agree = ref(false);
const show = ref(false);
const useStore = useUserStore();
const route = useRoute();
//控制是密码登录还是手机短信登录
const isPass = ref(true);
//获取的验证码
const code = ref('');
//倒计时
const time = ref(0);
const form = ref<FormInstance>();
let timer: number;
const onSubmit = async () => {
  try {
    if (!agree.value)
      return showToast('请勾选已同意')
    const res = isPass.value
      ? await loginByPassword(mobile.value, password.value)
      : await loginByMobile(mobile.value, code.value)
    useStore.setUserInfo(res)
    console.log(res)
    if (res.token) {
      //如果有回跳地址就跳转，没有就跳转首页
      router.push(route.query.returnUrl as string || '/home')
      showSuccessToast('登录成功')
      console.log('提交表单...')
    } else {
      showFailToast(isPass.value ? '用户名或密码错误' : '验证码错误')
    }
    // 原逻辑...
  } catch (err) {
    console.error('提交出错:', err); // 捕获并打印错误
  }
};
//获取验证码
const getCode = async () => {
  if (time.value > 0)
    return
  // 验证手机号不通过不往下进行
  await form.value?.validate('mobile')
  const res = await getSmsCode(mobile.value, 'login')
  console.log(res.code)
  // code.value = res.code
  showSuccessToast('验证码已发送')
  time.value = 60
  timer = setInterval(() => {
    time.value--
    if (time.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
};
onUnmounted(() => {
  // 组件销毁时清除定时器
  clearInterval(timer)
})
</script>

<template>
  <nav-bar title="登录" rightText="注册" @click-right="toRegister"></nav-bar>
  <div class="login">
    <div class="login-head">
      <h3>{{ isPass ? '密码登录' : '短信验证码登录' }}</h3>
      <a href="javascript:;">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow" @click="isPass = !isPass"></van-icon>
      </a>
    </div>
    <!-- 表单 -->
    <van-form autocomplete="off" @submit="onSubmit">
      <van-cell-group inset>
        <van-field v-model="mobile" name="mobile" :label="isPass ? '用户名' : '手机号'" :placeholder="isPass ? '请输入用户名' : '请输入手机号'"
          :rules="mobileRules" type="tel" />
        <van-field v-if="isPass" v-model="password" :type="show ? 'text' : 'password'" name="密码" label="密码"
          placeholder="请输入密码" :rules="passwordRules">
          <template #button>
            <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
          </template>
        </van-field>
        <van-field v-else label="验证码" v-model="code" :rules="codeRules">
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
        <van-button block round type="primary" native-type="submit">登 录</van-button>
      </div>
      <div class="cp-cell">
        <a href="javascript:;">忘记密码？</a>
      </div>
    </van-form>
  </div>
</template>

<style lang='scss' scoped>
.login {
  padding-top: 46px;

  &-head {
    padding: 30px 30px 50px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    line-height: 1;

    h3 {
      font-size: 24px;
      font-weight: normal;
    }

    a {
      font-size: 15px;
      color: var(--cp-text3);
    }
  }

  .van-form {
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