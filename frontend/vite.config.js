// // import path from "path"
// // import react from "@vitejs/plugin-react"
// // import { defineConfig } from "vite"

// // export default defineConfig({
// //   plugins: [react()],
// //   resolve: {
// //     alias: {
// //       "@": path.resolve(__dirname, "./src"),
// //     },
// //   },
// //   base: './',
// // })



// import path from "path"
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// export default defineConfig({
//   base: './',
//   plugins: [react()],
//   build: {
//     target: 'esnext',
//     outDir: 'dist',
//     assetsDir: 'assets',
//     rollupOptions: {
//       output: {
//         format: 'es',
//         entryFileNames: 'assets/[name].js',  // Optional: cleaner output
//         chunkFileNames: 'assets/[name].js',
//         assetFileNames: 'assets/[name].[ext]'
//       }
//     },
//     commonjsOptions: {
//       transformMixedEsModules: true  // <--- 🔥 IMPORTANT
//     }
//   },
  
// });

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        format: 'es' // ✅ ensures we use ESM output
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
});
