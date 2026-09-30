# MarketSphere

**Multi-vendor e-commerce platform** — React 18 + Vite frontend, Express + Prisma backend, orchestrated as a single **Turborepo** monorepo.

---

## Table of Contents

- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Root Scripts](#root-scripts)
- [Environment Variables](#environment-variables)
- [Database](#database)
- [API Routes](#api-routes)
- [Project Layout](#project-layout)
- [Turbo Tasks](#turbo-tasks)
- [Deployment](#deployment)
- [Notes & Known Issues](#notes--known-issues)
- [License](#license)

---

## Overview

MarketSphere lets customers shop across multiple vendors, lets vendors run their own shops
and manage products, and gives administrators oversight of the whole platform.

**Role model** (Prisma `Role` enum): `ADMIN`, `SUPER_ADMIN`, `VENDOR`, `CUSTOMER`.

**Feature areas**

| Area | Highlights |
| --- | --- |
| Customer | Multi-vendor browsing, search & filtering, cart, wishlist, orders, reviews, shop following, recently-viewed, coupons |
| Vendor | Shop CRUD, product CRUD, inventory, order management, coupons, flash sales, sales dashboard, review monitoring |
| Admin | User & vendor management, shop blacklisting, category management, vendor applications, transaction monitoring, flash-sale management, platform dashboard |
| Shared | JWT auth with access/refresh tokens, Cloudinary image uploads, Nodemailer email, Zod validation |

---

## Monorepo Structure

Turborepo with **npm workspaces**. There is a single `node_modules` and a single
`package-lock.json` at the root; dependencies are hoisted.

```
marketsphere/                 ← monorepo root
├── package.json              ← workspaces + all turbo scripts
├── package-lock.json         ← the ONE lockfile
├── turbo.json                ← task graph & caching
├── README.md
├── .gitignore
│
├── client/                   ← @marketsphere/client  (React 18 + Vite)
│   ├── package.json
│   ├── vite.config.ts
│   ├── index.html
│   ├── .env.example
│   ├── public/
│   └── src/
│
└── server/                   ← @marketsphere/server  (Express + Prisma)
    ├── package.json
    ├── tsconfig.json
    ├── eslint.config.mjs
    ├── .env.example
    ├── prisma/
    │   ├── schema.prisma
    │   └── migrations/
    └── src/
```

**Workspace packages**

| Package | Path | Description |
| --- | --- | --- |
| `@marketsphere/client` | `client/` | React 18 SPA (Vite, Redux Toolkit, Ant Design, Tailwind) |
| `@marketsphere/server` | `server/` | Express REST API (TypeScript, Prisma, PostgreSQL) |

---

## Tech Stack

Versions below are the **actually installed** versions in this repo.

### Frontend — `client/`

| Package | Version |
| --- | --- |
| React / React DOM | 18.3.1 |
| React Router DOM | 7.18.4 |
| Redux Toolkit | 2.13.0 |
| React Redux | 9.3.0 |
| redux-persist | 6.0.0 |
| Ant Design | 5.29.3 |
| Tailwind CSS | 3.4.19 |
| Framer Motion | 12.43.0 |
| Vite | 6.4.3 |
| TypeScript | 5.6.3 |
| lucide-react | 0.479.0 |
| react-image-gallery | 1.4.0 |
| localforage | 1.10.0 |

### Backend — `server/`

| Package | Version |
| --- | --- |
| Express | 4.22.3 |
| TypeScript | 5.6.3 |
| Prisma / @prisma/client | 6.19.3 |
| jsonwebtoken | 9.0.3 |
| bcryptjs | 2.4.3 |
| Zod | 3.25.76 |
| Multer | 1.4.5-lts.2 |
| cloudinary | 1.41.3 |
| nodemailer | 6.10.1 |
| cors | 2.8.6 |
| cookie-parser | 1.4.7 |
| dotenv | 16.6.1 |
| ts-node-dev | 2.0.0 |

### Tooling

| Tool | Version |
| --- | --- |
| Turborepo | 2.11.5 |
| ESLint | 9.39.5 |
| typescript-eslint | 8.71.0 |
| Node.js | 22.x (`engines: >=18`) |
| npm | 12.x |

---

## Prerequisites

- **Node.js** ≥ 18 (developed on 22.x)
- **npm** ≥ 10
- **PostgreSQL** — required for the API's database work
- Accounts for **Cloudinary** (images) and **SMTP** (email) if you exercise those features

---

## Getting Started

```bash
# 1. Install everything for both workspaces (from the repo root)
npm install

# 2. Create the API environment file
cp server/.env.example server/.env
#    then edit server/.env and fill in your real values

# 3. Create the web environment file
cp client/.env.example client/.env

# 4. Generate the Prisma client
npm run db:generate

# 5. Create the database schema
npm run db:migrate      # or: npm run db:push

# 6. Start BOTH apps with one command
npm run dev
```

`npm run dev` starts both workspaces in parallel:

| Service | URL |
| --- | --- |
| API | http://localhost:5000 |
| Web | http://localhost:5173 |

The API health check is `GET /` → `{"Message":"Server is running.."}`.

To run one side only:

```bash
npm run dev:server
npm run dev:client
```

---

## Root Scripts

All commands run from the repo root.

| Script | Description |
| --- | --- |
| `npm run dev` | Run `dev` in every workspace (client + server), in parallel |
| `npm run dev:client` | Run only the client dev server |
| `npm run dev:server` | Run only the API dev server |
| `npm run build` | Build all workspaces (cached) |
| `npm run lint` | ESLint across all workspaces |
| `npm run typecheck` | Type-check all workspaces without emitting |
| `npm run test` | Run `test` in all workspaces (no test runner configured yet) |
| `npm run clean` | Remove build output, `node_modules` and the turbo cache |
| `npm run turbo -- <args>` | Pass raw arguments to the turbo CLI |
| `npm run db:generate` | `prisma generate` in the server workspace |
| `npm run db:migrate` | `prisma migrate dev` |
| `npm run db:deploy` | `prisma migrate deploy` (production) |
| `npm run db:push` | `prisma db push` (no migration files) |
| `npm run db:studio` | `prisma studio` |

### Per-package scripts

`client/` — `dev`, `build` (`tsc -b && vite build`), `typecheck`, `lint`, `lint:fix`, `preview`, `clean`

`server/` — `dev`, `build`, `typecheck`, `start`, `lint`, `lint:fix`, `clean`, `prisma:generate`, `prisma:migrate`, `prisma:deploy`, `prisma:studio`, `prisma:push`

---

## Environment Variables

### `client/.env`

```env
VITE_SERVER_URL=http://localhost:5000/api/v1
```

### `server/.env`

These names match `server/src/app/config/index.ts` exactly. Copy from
`server/.env.example` and fill in real values.

```env
# Runtime
NODE_ENV=development
PORT=5000

# URLs
CLIENT_URL=http://localhost:5173
SERVER_URL=http://localhost:5000

# Database (PostgreSQL / Prisma)
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/marketsphere?schema=public"

# Auth
BCRYPT_SALT_ROUNDS=12
DEFAULT_PASS=Pass1234
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d

# Seed accounts (used by src/app/utils/seeding.ts on boot)
ADMIN_EMAIL=
ADMIN_PASSWORD=
ADMIN_PROFILE_PHOTO=
ADMIN_MOBILE_NUMBER=
VENDOR_EMAIL=
VENDOR_PASSWORD=

# Cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Search
MEILISEARCH_HOST=
MEILISEARCH_MASTER_KEY=

# Email (Nodemailer)
SENDER_EMAIL=
SENDER_APP_PASS=

# Payments
STRIPE_SECRET_KEY=
STORE_ID=
SIGNATURE_KEY=
PAYMENT_URL=
PAYMENT_VERIFY_URL=

# Appended to CLIENT_URL to build the password-reset link
RESET_PASS_UI_LINK=/reset-password
```

> `CORS` on the API is driven by `CLIENT_URL` (see `server/src/app.ts`), so it must
> match the client's origin for cookie-based auth to work.

---

## Database

PostgreSQL via Prisma ORM. Schema: [`server/prisma/schema.prisma`](server/prisma/schema.prisma).

**26 models** — `User`, `Admin`, `Customer`, `Vendor`, `CustomerDashboard`,
`VendorDashboard`, `AdminDashboard`, `Shop`, `Category`, `Product`, `Cart`,
`CartItem`, `Wishlist`, `WishlistItem`, `Follow`, `Transaction`, `Order`,
`OrderItem`, `Coupon`, `CouponItem`, `FlashSale`, `FlashSaleItem`, `Review`,
`ReviewItem`, `BecomeVendorRequest`, `RecentProduct`

**9 enums**

| Enum | Values |
| --- | --- |
| `Role` | `ADMIN`, `SUPER_ADMIN`, `VENDOR`, `CUSTOMER` |
| `UserStatus` | `ACTIVE`, `BLOCKED`, `DELETED`, `SUSPENDED` |
| `OrderStatus` | `CONFIRMED`, `DELIVERED`, `CANCELLED`, `SHIPPED`, `PENDING` |
| `OrderShippingType` | `DELIVERY`, `PICK_UP` |
| `ShopStatus` | `ACTIVE`, `RESTRICTED`, `DELETED`, `SUSPENDED` |
| `PaymentStatus` | `PAID`, `UNPAID` |
| `TransactionStatus` | `PENDING`, `SUCCESS`, `FAILED` |
| `TransactionMethod` | `CASH_ON_DELIVERY`, `CREDIT_CARD`, `DEBIT_CARD`, `NET_BANKING`, `UPI` |
| `BecomeVendorRequestStatus` | `PENDING`, `APPROVED`, `REJECTED` |

**Migrations present:** `20241230163547_new_version`, `20241231111209_update_product_model`,
`20250214061658_initial_setup`, `20251016050223_add_nested_categories`

Apply in production with `npm run db:deploy`.

---

## API Routes

Base path: **`/api/v1`** (plus a root health check at `GET /`).

Registered in [`server/src/app/routes/index.ts`](server/src/app/routes/index.ts):

| Path | Module |
| --- | --- |
| `/api/v1/auth` | Authentication |
| `/api/v1/users` | User profile & auth |
| `/api/v1/customers` | Customer |
| `/api/v1/admins` | Admin |
| `/api/v1/vendors` | Vendor |
| `/api/v1/categories` | Categories |
| `/api/v1/cart` | Cart |
| `/api/v1/orders` | Orders |
| `/api/v1/products` | Products |
| `/api/v1/reviews` | Reviews |
| `/api/v1/flash-sales` | Flash sales |
| `/api/v1/follow-shop` | Shop following |
| `/api/v1/coupons` | Coupons |
| `/api/v1/shops` | Shops |
| `/api/v1/dashboard` | Dashboards |
| `/api/v1/payment` | Payments |
| `/api/v1/become-a-vendor` | Vendor applications |
| `/api/v1/transactions` | Transactions |
| `/api/v1/wishlist` | Wishlist |
| `/api/v1/recent-view-products` | Recently viewed |

Each module lives in `server/src/app/modules/<name>/` and follows the same
`*.controller.ts` / `*.service.ts` / `*.route.ts` (+ optional `*.validation.ts`) split.

---

## Project Layout

```
client/src/
├── main.tsx                 # React root: Provider → PersistGate → RouterProvider
├── App.tsx
├── Routes/                  # React Router route tree
├── Redux/                   # store + slices + persist config
├── Interface/               # TypeScript interfaces
├── Components/              # shared + dashboard components
├── Layout/                  # Layout, DashboardLayout
├── Pages/                   # route-level pages
│   ├── MainPages/
│   ├── AuthenticationPages/
│   └── DashboardPages/      # AdminPages / VendorPages / CustomerPages
└── Utils/

server/src/
├── server.ts                # bootstrap, listen, seeding, crash handlers
├── app.ts                   # express app: cors, parsers, /api/v1 mount
├── app/
│   ├── config/              # env config, prisma client, cloudinary, multer
│   ├── middlewares/         # auth, validateRequest, errorHandler, notFound
│   ├── modules/             # feature modules (see API Routes)
│   ├── routes/index.ts      # route mounting
│   ├── utils/               # sendResponse, sendImageToCloudinary, seeding, ...
│   └── errors/              # duplicate-key error handling
└── utils/                   # seed scripts
```

**Backend layering:** `route` (HTTP + guards) → `controller` (thin) → `service`
(business logic + Prisma) → `utils`. Responses go through `sendResponse`, and
errors through `globalErrorHandler` / `notFound`.

---

## Turbo Tasks

Defined in `turbo.json`:

| Task | Cached | Depends on | Notes |
| --- | --- | --- | --- |
| `build` | yes | `^build` | Outputs `dist/**` |
| `typecheck` | yes | `^build` | No emit |
| `lint` | yes | `^build` | |
| `test` | yes | `^build` | No test runner configured yet |
| `dev` | **no** | — | `persistent: true`, never cached |
| `clean` | no | — | |

Cache lives in `.turbo/` at the root. Useful commands:

```bash
npx turbo run build --filter @marketsphere/server   # one package
npx turbo run build --dry                           # show the plan
npx turbo run build --force                          # ignore cache
npm run clean                                       # nuke node_modules + .turbo
```

---

## Deployment

Each app deploys independently — set **Root Directory** in your host to
`client` or `server` respectively.

- **Client** — Vite static build → `client/dist`. `client/vercel.json` rewrites all
  routes to `/` for client-side routing.
- **Server** — `tsc` → `server/dist`, entry `dist/server.js` (matches
  `server/vercel.json`). Set all variables from the
  [Environment Variables](#environment-variables) section, and run
  `npm run db:deploy` against a managed PostgreSQL instance.

> With a monorepo, the build command should be run from the repo root
> (`npm run build`) or scoped with `--filter`, since the host's install step
> handles the workspaces.

---

## Notes & Known Issues

Things worth knowing, all verified in this repo:

1. **Express types are pinned to v4.** `express@4.22.3` is paired with
   `@types/express@4.x` via an `overrides` block in the root `package.json`.
   The v5 type definitions were incompatible and produced ~45 compile errors
   across the route modules.

2. **One lockfile.** The old `client/package-lock.json` and
   `server/package-lock.json` were removed — npm workspaces use the single root
   `package-lock.json`.

3. **npm 12 install scripts.** `esbuild` and `prisma` install scripts are
   explicitly allowed via the `allowScripts` field in the root `package.json`.
   Without this, `prisma generate` and the esbuild binary are silently skipped
   and the build fails. `core-js` is explicitly denied.

4. **Seeding no longer kills the API.** `server/src/utils/seed-nested-categories.ts`
   used to self-invoke at import time and call `process.exit(1)` when the
   database was unreachable, which terminated the whole server on every boot
   without a live DB. Seeding is now only triggered from `server.ts`, inside a
   `try/catch`. The API starts and serves requests even with no database —
   database-backed routes return `500` instead.

5. **Seeding runs on every boot.** `server.ts` calls `seed()` and
   `seedNestedCategories()` on each start. Move these behind a flag or a
   separate script before running it against production data.

6. **No test suite.** `turbo run test` is wired up but no test runner is
   configured in either package.

7. **Client bundle is large.** The main client chunk is ~2.1 MB (644 kB gzipped)
   and Vite warns about it. Consider route-level `React.lazy` / dynamic imports.

8. **History was merged, not restarted.** The monorepo is a single repository
   containing the full history of both originals — all 164 frontend and 87
   backend commits are ancestors of `main` (255 commits total). Each commit's
   tree was rewritten with `git filter-repo --to-subdirectory-filter` so its
   files live under `client/` and `server/`, which means per-file history
   (`git log -- client/src/App.tsx`) works normally. The two original GitHub
   repos are now **stale** — do not push to them. Verbatim copies and bare
   mirrors of both live in
   `../_marketsphere-archive-20260930/` (see its `ARCHIVE.md`).

9. **No remote is configured yet.** This repo has no `origin`. Create the
   monorepo on GitHub and then:
   ```bash
   git remote add origin <your-monorepo-url>
   git push -u origin main
   ```
   You may want to rename the two old repos to `*-archive` (or archive them on
   GitHub) so nobody pushes stale history to them.

---

## License

MIT. See [LICENSE](LICENSE).
