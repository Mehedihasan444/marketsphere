# @marketsphere/api

Express + Prisma REST API for MarketSphere, part of the [Turborepo monorepo](../../README.md).

## Commands

Run these from the **repo root** so turbo handles them, or from this directory directly:

```bash
npm run dev             # ts-node-dev --respawn --transpile-only
npm run build           # tsc -> dist/
npm run typecheck       # tsc --noEmit
npm run start           # node dist/server.js
npm run lint            # eslint .
```

To run just this package from the root:

```bash
npm run dev:api
```

## Environment

```bash
cp .env.example .env
```

`server/.env.example` documents every variable the server reads, in the exact
names used by `src/app/config/index.ts`. At minimum set:

```env
PORT=5000
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/marketsphere?schema=public"
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
CLIENT_URL=http://localhost:5173
```

## Database

```bash
npm run db:generate   # prisma generate
npm run db:migrate    # prisma migrate dev
npm run db:studio     # prisma studio
```

Schema: `prisma/schema.prisma` (26 models, 9 enums). Migrations live in
`prisma/migrations/`.

## Layout

| Path | Contents |
| --- | --- |
| `src/server.ts` | Bootstrap: listen, seeding, crash handlers |
| `src/app.ts` | Express app — CORS, parsers, mounts `/api/v1` |
| `src/app/config/` | Env config, Prisma client, Cloudinary, Multer |
| `src/app/middlewares/` | `auth`, `validateRequest`, `globalErrorHandler`, `notFound` |
| `src/app/modules/` | Feature modules (see API routes below) |
| `src/app/routes/index.ts` | Route mounting table |
| `src/app/utils/` | `sendResponse`, `sendImageToCloudinary`, `seeding`, ... |
| `prisma/` | Schema and migrations |

**Module convention:** `*.route.ts` (HTTP + guards) → `*.controller.ts` →
`*.service.ts` (business logic + Prisma) → `utils`. Validation lives in an
optional `*.validation.ts` using Zod.

## API

Base path `/api/v1`, mounted in `src/app/routes/index.ts`:

`auth`, `users`, `customers`, `admins`, `vendors`, `categories`, `cart`, `orders`,
`products`, `reviews`, `flash-sales`, `follow-shop`, `coupons`, `shops`,
`dashboard`, `payment`, `become-a-vendor`, `transactions`, `wishlist`,
`recent-view-products`

Health check: `GET /` → `{"Message":"Server is running.."}`

## Deployment

`tsc` emits to `dist/`, entry `dist/server.js` (matches `vercel.json`).
Set every variable from `.env.example` and run `npm run db:deploy` against a
managed PostgreSQL instance.

Full documentation is in the [root README](../../README.md).
