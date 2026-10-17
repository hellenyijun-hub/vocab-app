import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // 相对路径：保证部署到 GitHub Pages 的 /vocab-app/ 子路径下资源可正常加载
  base: './',
  plugins: [react(), tailwindcss()],
})
