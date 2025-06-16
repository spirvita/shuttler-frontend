// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import tailwindcss from "@tailwindcss/vite";
import * as dotenv from "dotenv";
import { resolve } from "path";

dotenv.config({ path: resolve(__dirname, "../.env") });

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    baseURL: process.env.NUXT_BASE_URL,
    head: {
      title: "羽神同行",
      htmlAttrs: {
        lang: "zh-Hant"
      },
      link: [{ rel: "icon", type: "image/x-icon", href: "/logo.ico" }]
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxt/icon",
    "@pinia/nuxt",
    "@element-plus/nuxt",
    "nuxt-auth-utils",
    [
      "@nuxtjs/google-fonts",
      {
        families: {
          Roboto: true,
          "Noto Sans": true
        }
      }
    ],
    "nuxt-swiper"
  ],
  pinia: {
    storesDirs: ["./stores/**"]
  },
  typescript: {
    typeCheck: true
  },
  css: ["~/assets/css/main.css"],
  elementPlus: {
    importStyle: "scss"
  },
  vite: {
    plugins: [
      tailwindcss(),
      {
        name: "vite-plugin-ignore-sourcemap-warnings",
        apply: "build",
        configResolved(config) {
          config.build.rollupOptions.onwarn = (warning, warn) => {
            if (
              warning.code === "SOURCEMAP_BROKEN" &&
              warning.plugin === "@tailwindcss/vite:generate:build"
            ) {
              return;
            }

            warn(warning);
          };
        }
      }
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/assets/css/styles/element/index.scss";`
        }
      }
    },
    server: {
      hmr: {
        port: process.env.NITRO_PORT || 3000
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
      API_BASE_URL: process.env.NUXT_API_BASE_URL
    }
  }
});
