<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
// 封装需求：支持 title rightText 属性，支持 click-right 事件，click-left函数内支持返回上一页或默认首页
const onClickLeft = () => {
  //返回上次访问的页面
  if (history.state.back) {
    //如果存在上一个页面则返回
    router.back()
  } else {
    //否则返回首页
    router.push('/')
  }
}
//接收父传子的变量
defineProps({
  title: { type: String, default: '' },
  rightText: { type: String, default: '' },
})
// 父组件调用事件子组件传过去的方法（子）
const emit = defineEmits<{ (e: 'click-right'): void }>()
</script>

<template>
  <van-nav-bar left-arrow @click-left="onClickLeft" fixed :title="title" :right-text="rightText"
    @click-right="emit('click-right')"></van-nav-bar>
</template>

<style lang="scss" scoped>
// 深度作用选择符用于穿透组件样式隔离的特殊语法。
//它允许父组件的样式修改子组件内部的元素样式，突破 CSS 的作用域限制（如 Vue 的scoped属性或 Shadow DOM 的隔离）。
// ::v-deep（Vue 3 推荐，支持所有 CSS 预处理器）
// /deep/（Vue 2 常用，部分预处理器支持）
// >>>（仅支持原生 CSS，不支持 Sass/Scss 等预处理器）
//使用场景：
//当父组件需要修改子组件（包括第三方组件库，如 Element UI、Vant 等）的内部样式，
//且子组件的样式被scoped或隔离机制保护时，普通 CSS 选择器无法生效，此时需要使用深度作用选择符
//注意事项
// 不同框架 版本的语法可能不同（如 Vue 3 推荐::v-deep，Angular 使用::ng-deep），需根据实际环境选择。
// 过度使用深度选择符可能破坏组件的样式封装性，建议仅在必要时使用，优先通过子组件暴露class或props控制样式。
// 在 CSS 预处理器（如 Scss）中，需使用框架推荐的深度选择符（如::v-deep），避免>>>等不兼容语法。

::v-deep() {
  .van-nav-bar {
    &__arrow {
      font-size: 18px;
      color: var(--cp-text1);
    }

    &__text {
      font-size: 15px;
    }
  }
}
</style>