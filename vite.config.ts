import { defineConfig } from 'vite'
import preact from '@preact/preset-vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    lib: {
      entry: "src/main.tsx", // replace with the path to your main.jsx file
      name: "MyLib", // the name you want to use when importing the library in HTML
      fileName: "my-lib", // the output file name
      formats: ["umd"] // to support importing in HTML
    }
  }
})
