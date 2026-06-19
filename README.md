# Web Apps Starter

A production-oriented Angular monorepo starter for building a public website and an admin application from the same codebase.

This template uses Nx, pnpm, Angular SSR, shared libraries, and a shared styling layer so new web apps can start with routing, theming, linting, server rendering, and workspace structure already in place.

## What's Included

- **Two Angular applications**
  - `website` for the public-facing app
  - `admin` for the authenticated/dashboard app
- **Server-side rendering** for both apps
- **Nx workspace tooling** for builds, linting, caching, and project orchestration
- **Shared libraries**
  - `@libs/core` for application services such as theming, media, storage, and interceptors
  - `@libs/utils` for reusable interfaces, errors, and utility types
- **Shared styles** under `styles/`, including Tailwind CSS, base styles, components, and third-party overrides
- **Path aliases** for cleaner imports across apps and libraries

## Tech Stack

- Angular 22
- Nx 23
- pnpm
- TypeScript 6
- Tailwind CSS 4
- Angular Material / CDK
- NgRx Signals
- Express SSR
- Vitest-ready tooling

## Requirements

- Node.js `>=24.0.0`
- pnpm

Install pnpm if needed:

```bash
npm install -g pnpm
```

## Getting Started

Install dependencies:

```bash
pnpm install
```

Run the public website:

```bash
pnpm dev:website
```

The website runs on `http://localhost:4200`.

Run the admin app:

```bash
pnpm dev:admin
```

The admin app runs on `http://localhost:4000`.

## Available Scripts

```bash
pnpm build
```

Builds both `website` and `admin`.

```bash
pnpm build:website
pnpm build:admin
```

Builds one app at a time.

```bash
pnpm lint
```

Runs linting for both apps.

```bash
pnpm lint:website
pnpm lint:admin
```

Runs linting for a single app.

```bash
pnpm ssr:website
pnpm ssr:admin
```

Runs the built SSR server output. Build the target app before using these commands.

## Project Structure

```text
apps/
  admin/              Admin/dashboard application
  website/            Public website application

libs/
  core/               Shared application infrastructure
  utils/              Shared interfaces, errors, and utility exports

public/               Static assets copied into each app build
styles/               Shared CSS, Tailwind layers, and component styles

eslint.config.ts      Workspace ESLint configuration
nx.json               Nx workspace configuration
tsconfig.base.json    Shared TypeScript configuration and path aliases
```

## Import Aliases

The workspace defines these aliases in `tsconfig.base.json`:

```ts
import { ... } from '@libs/core';
import { ... } from '@libs/utils';
import { ... } from '@admin/app/...';
import { ... } from '@website/app/...';
```

Use `@libs/core` for reusable infrastructure and `@libs/utils` for shared types or lightweight utilities. Keep app-specific code inside its app folder unless it is clearly useful across applications.

## Styling

Global styles are loaded from:

```text
styles/styles.css
```

That file pulls from the shared style system:

- `styles/base/` for reset, typography, and base rules
- `styles/components/` for reusable component-level CSS
- `styles/tailwind/` for Tailwind theme, utilities, and variants
- `styles/third-party/` for vendor-specific style overrides

Static assets, including fonts, live in `public/`.

## Building For Production

Build both apps:

```bash
pnpm build
```

The SSR output is generated under:

```text
dist/website/
dist/admin/
```

Run the built servers locally:

```bash
pnpm ssr:website
pnpm ssr:admin
```

For deployment, point your host or process manager at the generated server entry:

```text
dist/website/server/server.mjs
dist/admin/server/server.mjs
```

## Development Notes

- Prefer adding shared, framework-level behavior to `libs/core`.
- Prefer adding reusable interfaces and small utility exports to `libs/utils`.
- Keep route-level features colocated inside the owning app.
- Keep global visual decisions in `styles/` so both apps stay consistent.
- Use Nx commands when adding new projects, libraries, or targets so workspace metadata stays in sync.

## License

This starter is private project template code. See `package.json` for the current license metadata.
