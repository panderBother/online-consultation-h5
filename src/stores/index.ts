import { createPinia } from 'pinia'
//导入数据持久化的插件
import persist from 'pinia-plugin-persistedstate'
//创建pinia实列
const pinia = createPinia()
pinia.use(persist)
//导出
export default pinia
export * from './modules/user'
