import tailwindcss from '@tailwindcss/vite';

const postgresUrl = process.env.POSTGRES_URL || process.env.POSTGRESQL_URL || process.env.DATABASE_URL || '';
const isRemotePostgres = Boolean(postgresUrl);

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: ['@nuxthub/core'],
  css: ['./app/assets/main.css'],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['flyonui/flyonui'],
    },
  },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  runtimeConfig: {
    managerPasswd: '',
    public: {
      backendUrl: '',
    },
  },

  hub: {
    db: {
      dialect: 'postgresql',
      driver: isRemotePostgres ? 'neon-http' : 'pglite',
    },
  },
});
