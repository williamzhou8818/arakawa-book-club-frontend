// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-12-04', // 修正为当前日期
  devtools: { enabled: true },
  ssr: false,
  app: {
    baseURL: '/',
    buildAssetsDir: '/_nuxt/',
  },
  nitro: {
    preset: 'static',
    prerender: {
      routes: ['/'],
      crawlLinks: true,
    },
  },
  routeRules: {
    '/**': { ssr: false },
  },
  // 环境变量配置
  runtimeConfig: {
    public: {
      // 从环境变量获取API基础URL
      apiBase: process.env.NUXT_PUBLIC_API_BASE || '/api',
    },
  },

  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'], // 移除了未安装的模块

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // 如果使用标准 sass，不需要特别指定 implementation
          additionalData: `
            $primary-color: #6366f1;
            $indigo-500: #6366f1;
            $indigo-600: #4f46e5;
            $gray-50: #f9fafb;
            $white: #ffffff;
          `,
        },
      },
    },
  },
});
