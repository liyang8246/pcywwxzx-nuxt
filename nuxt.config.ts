// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxtjs/tailwindcss'],
  plugins: ['~/plugins/flyonui.client.ts'],

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    manager_passwd: process.env.MANAGER_PASSWD,
    public: {
      backendUrl: process.env.BACKEND_URL,
    },
  },
});
