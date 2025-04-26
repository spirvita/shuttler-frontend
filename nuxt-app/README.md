# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

**⚠️ Before starting the project, navigate to the `/work/nuxt-app` directory.**

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

## Environment Setup

Before starting the project, make sure to set up your environment variables:

1. Copy `.env.example` to `.env.local` for local development:

   ```bash
   cp .env.example .env.local
   ```

2. Copy `.env.example` to `.env.production` for production:

   ```bash
   cp .env.example .env.production
   ```

Edit the `.env.local` and `.env.production` files as needed to configure your environment.

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
