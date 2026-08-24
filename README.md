# Starter Web

> Starter web

## Tech stack

- Angular 22.1 with standalone components and signals
- Angular SSR 22.1 with Express 5
- Angular Material and Angular CDK
- Tailwind CSS 4 through PostCSS
- TypeScript 6 in strict mode
- pnpm 11 and Node.js 24
- ESLint 10, Prettier 3, Husky, and Commitlint

## Prerequisites

- Node.js 24 (the Docker image and Node type definitions use version 24)
- pnpm 11, preferably enabled through Corepack
- The starter API running locally on `http://localhost:8000` for development

Enable pnpm if needed:

```bash
corepack enable
```

## Getting started

Install the locked dependency versions:

```bash
pnpm install --frozen-lockfile
```

Start the Angular development server:

```bash
pnpm start
```

Open [http://localhost:4200](http://localhost:4200). The development build sends API requests to `http://localhost:8000`.

## Environment configuration

API base URLs are defined in Angular environment files:

| Build configuration | File                                          | API URL                   |
| ------------------- | --------------------------------------------- | ------------------------- |
| Development         | `src/environments/environment.development.ts` | `http://localhost:8000`   |
| Production          | `src/environments/environment.ts`             | `https://api.starter.com` |

Angular replaces the production environment with the development environment for `ng serve` and development builds. There is no runtime `.env` file or environment-variable override for the API URL at present.

The HTTP interceptor prefixes every Angular `HttpClient` request with the configured API URL and sets `withCredentials: true`.

## Available commands

| Command             | Description                                                             |
| ------------------- | ----------------------------------------------------------------------- |
| `pnpm start`        | Run the development server on port 4200                                 |
| `pnpm build`        | Create the production browser and SSR bundles in `dist/starter-web`     |
| `pnpm watch`        | Rebuild continuously with the development configuration                 |
| `pnpm start:prod`   | Run a previously built SSR bundle; defaults to port 4000 or uses `PORT` |
| `pnpm lint`         | Lint TypeScript and Angular templates                                   |
| `pnpm ng -- <args>` | Pass arguments to the Angular CLI                                       |

## Routing and rendering

The root route lazy-loads the website domain and its home feature. Unknown routes are redirected to `/` by the website layout. Server routing uses `RenderMode.Server` for every path, and browser hydration is enabled with `provideClientHydration()`.

The production server serves static browser assets with a one-year cache and hands all other requests to Angular's server engine. It listens on `PORT` when set and otherwise uses port `4000`.

## Styling, icons, and theming

Global styles enter through `src/styles/styles.css`, which loads Tailwind, the Angular CDK overlay styles, the Material Azure Blue base theme, project typography, and component overrides.

The application uses bundled Geist fonts. Lucide SVG icons are registered centrally through `provideIcons()`. The theme service generates primary and error tonal palettes as CSS variables for the light-only interface.

## Docker

Run the development container with source bind mounts and hot reload:

```bash
docker compose -f compose.dev.yml -p starter-web up --build
```

Run a production build and the Express SSR server:

```bash
docker compose -f compose.prod.yml -p starter-web up --build
```

Both Compose configurations expose the application at [http://localhost:4200](http://localhost:4200). The production Compose file sets the SSR server's `PORT` to `4200`.

When developing in Docker, remember that `localhost` inside server-side rendering refers to the web container. If SSR must reach an API running on the host, update the development API URL or provide an appropriate container network/host mapping.

## Code quality and conventions

- TypeScript and Angular template strictness are enabled.
- ESLint checks TypeScript, inline templates, HTML templates, accessibility rules, unused imports, and JSDoc rules.
- Prettier formats Angular templates and sorts Tailwind classes.
- `.husky/pre-commit` runs `pnpm lint`.
- `.husky/commit-msg` validates Conventional Commit messages with Commitlint.
- Components are standalone and routed features are lazy-loaded.
- API reads use Angular `httpResource`; local filter and pagination state use signals and computed signals.
