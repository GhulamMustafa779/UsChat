import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import fs from 'fs';
import path from 'path';
import { __DIRNAME } from "./src/utils/constants";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.join(__DIRNAME, 'key.pem'), 'utf8'),
      cert: fs.readFileSync(path.join(__DIRNAME, 'cert.pem'), 'utf8')
    },
    host: '192.168.228.220',
    port: 5173,
    // port: 5173,
    // cors: true,
    // proxy: {
    //   "/api": {
    //     target: "http://localhost:3001",
    //     changeOrigin: true,
    //     rewrite:(path) => path.replace(/^\/api/,'')
    //   },
    // },
  },
});
