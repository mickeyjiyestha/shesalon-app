import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css", "v-calendar/style.css"],
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: {
        protocol: "wss",
        host: "83bd-103-19-231-253.ngrok-free.app",
        clientPort: 443,
      },
      strictPort: true,
      cors: true,
      allowedHosts: ["83bd-103-19-231-253.ngrok-free.app"],
    },
  },
  app: {
    head: {
      script: [
        {
          src: `https://maps.googleapis.com/maps/api/js?key=AIzaSyBPoaCwvVnCN82FB6avJnARDxtfL-kGT44`,
          async: true,
          defer: true,
        },
      ],
    },
  },
});
