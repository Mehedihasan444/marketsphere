# @marketsphere/web

React 18 + Vite frontend for MarketSphere, part of the [Turborepo monorepo](../../README.md).

## Commands

Run these from the **repo root** so turbo handles them, or from this directory directly:

```bash
npm run dev        # from root: turbo run dev
npm run build      # tsc -b && vite build
npm run typecheck  # tsc -b
npm run lint       # eslint .
```

To run just this package from the root:

```bash
npm run dev:web
```

## Environment

```bash
cp .env.example .env
```

```env
VITE_SERVER_URL=http://localhost:5000/api/v1
```

## Layout

| Path | Contents |
| --- | --- |
| `src/Routes/` | React Router route tree |
| `src/Redux/` | store, slices, redux-persist config |
| `src/Interface/` | TypeScript interfaces |
| `src/Components/` | Shared and dashboard components |
| `src/Layout/` | `Layout`, `DashboardLayout` |
| `src/Pages/` | Route-level pages (`MainPages`, `AuthenticationPages`, `DashboardPages/{Admin,Vendor,Customer}Pages`) |
| `src/Utils/` | Helpers |
| `public/` | Static assets |

## Build output

`dist/` — static bundle, ready for any static host. `vercel.json` rewrites all
routes to `/` so client-side routing works on refresh.

Full documentation — setup, API routes, database schema, deployment — is in the
[root README](../../README.md).
