# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

Copy the environment template before local development or deployment:

```bash
cp .env.example .env
```

The app uses NuxtHub v0.10 as the only database layer, with Neon as the PostgreSQL host:

- `POSTGRES_URL` for your Neon pooled connection string (preferred on Vercel)
- `NUXT_MANAGER_PASSWD` and `NUXT_PUBLIC_BACKEND_URL` for the app runtime config

NuxtHub resolves PostgreSQL env vars in this order: `POSTGRES_URL` -> `POSTGRESQL_URL` -> `DATABASE_URL`.

For this repo:

- when one of those PostgreSQL env vars is present, NuxtHub is configured to use Neon via the `neon-http` driver
- when none are present locally, NuxtHub falls back to embedded `pglite` so development and builds still work without a remote database

If you use Vercel, pulling envs locally is a good match for this setup:

```bash
vercel env pull .env.development.local
```

When schema changes, keep the NuxtHub workflow explicit:

```bash
pnpm exec nuxt db generate
pnpm exec nuxt db migrate
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
