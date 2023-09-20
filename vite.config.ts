import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { resolve } from 'path'
import Inspect from 'vite-plugin-inspect'

// 路径查找
const pathResolve = (dir) => {
  return resolve(__dirname, dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), Inspect()],
  resolve: {
    alias: {
      '@': pathResolve('src'),
      components: pathResolve('./src/components'),
      api: pathResolve('./src/api'),
      assets: pathResolve('./src/assets'),
      hooks: pathResolve('./src/hooks'),
      utils: pathResolve('./src/utils'),
      router: pathResolve('./src/router'),
      store: pathResolve('./src/store'),
      views: pathResolve('./src/views'),
      static: pathResolve('./public/static')
    }
  },
  server: {
    open: true
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    },
    // 配置 css-module
    modules: {
      // 开启 camelCase 格式变量名转换
      localsConvention: 'camelCase',
      // 类名 前缀
      generateScopedName: '[local]-[hash:base64:5]'
    }
  }
})
