import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "nuxt-auth-utils"
  ],
  typescript: {
    typeCheck: true
  },
  css: ["~/assets/css/main.css"],
  elementPlus: {
    importStyle: "scss"
  },
  vite: {
    plugins: [tailwindcss()],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/styles/element/index.scss";`
        }
      }
    },
    $server: {
      build: {
        rollupOptions: {
          output: {
            preserveModules: false
          }
        }
      }
    }
  },
  runtimeConfig: {
    public: {
      SHUTTLER_TW_API_BASE_URL: process.env.NUXT_SHUTTLER_TW_API_URL
    }
  }
});
