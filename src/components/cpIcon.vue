<script setup lang='ts'>
// 封装的SvgIcon组件
defineOptions({ name: 'IconIndex' })
// 提供name属性
defineProps<{
  name: string
}>()
</script>

<template>
  <svg aria-hidden="true" class="cp-icon">
    <use :href="`#icon-${name}`" />
  </svg>
</template>

<style lang='scss' scoped>
.cp-icon {
  // 说明：em 相对于父元素字体大小
  width: 1em;
  height: 1em;
}
</style>