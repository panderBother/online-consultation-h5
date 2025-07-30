// postcss.config.js（如果用 ESM，可改名 postcss.config.mjs 或配置 type: module）
export default {
  plugins: {
    'postcss-px-to-viewport': {
      viewportWidth: 375,
    },
  },
}
