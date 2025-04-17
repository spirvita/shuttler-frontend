import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@pinia/nuxt", "@element-plus/nuxt"],
  typescript: {
    typeCheck: true,
  },
  css: ["~/assets/css/main.css"],
  elementPlus: {
    importStyle: "scss",
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/styles/element/index.scss";`,
        },
      },
    },
  },
});
