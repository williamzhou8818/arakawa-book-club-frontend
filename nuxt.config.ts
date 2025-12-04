// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
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
