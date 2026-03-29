import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom"],
          three: ["three", "@react-three/fiber", "@react-three/drei"],
          physics: ["@react-three/rapier", "@react-three/cannon"],
          motion: ["gsap", "@gsap/react"],
        },
      },
    },
  },
});
