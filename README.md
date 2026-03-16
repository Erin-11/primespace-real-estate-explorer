# Cloudflare Workers Full-Stack Chat Demo

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Erin-11/primespace-real-estate-explorer)

A production-ready full-stack chat application demonstrating Cloudflare Workers with Durable Objects for scalable, stateful backend storage, paired with a modern React frontend using shadcn/ui, Tailwind CSS, and TypeScript.

## Features

- **Backend**: Cloudflare Workers with Hono routing, Durable Objects for entity storage (Users, ChatBoards), automatic indexing for pagination and listing
- **Frontend**: React 18, Vite, shadcn/ui components, TanStack Query, Tailwind CSS with custom animations and themes
- **Real-time Chat**: Per-chat Durable Object instances storing messages, with CRUD operations for users and chats
- **Type Safety**: Full TypeScript support across frontend, backend, and shared types
- **Dark Mode**: Automatic theme detection with manual toggle
- **Responsive Design**: Mobile-first layout with sidebar navigation
- **Error Handling**: Global error boundaries and client-side error reporting
- **Seed Data**: Mock users, chats, and messages auto-populated on first access
- **Pagination**: Efficient cursor-based listing for users and chats

## Tech Stack

- **Backend**: Cloudflare Workers, Hono, Durable Objects, TypeScript
- **Frontend**: React 18, Vite, shadcn/ui, Tailwind CSS, Lucide React icons, TanStack Query, React Router, Sonner (toasts), Framer Motion
- **State Management**: Immer (via TanStack Query), Zustand-ready
- **Utilities**: clsx, Tailwind Merge, Zod (validation-ready), uuid
- **Dev Tools**: Bun, ESLint, TypeScript 5, Wrangler

## Quick Start

1. **Clone the repo**:
   ```
   git clone <your-repo-url>
   cd primespace-6zf8meiudmyo1dfe0-jal
   ```

2. **Install dependencies** (using Bun):
   ```
   bun install
   ```

3. **Run locally**:
   ```
   bun dev
   ```
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8787/api (proxied via Vite)

4. **Type generation** (for Cloudflare bindings):
   ```
   bun run cf-typegen
   ```

## Local Development

- **Development Server**: `bun dev` (starts Vite dev server with Workers proxy)
- **Build for Production**: `bun build` (builds frontend assets)
- **Preview Production Build**: `bun preview`
- **Linting**: `bun lint`
- **Worker-Only Dev**: Edit `wrangler.jsonc` and use `wrangler dev` for backend testing

### Environment Setup

No additional env vars required for local dev. For production, configure via Wrangler dashboard or CLI.

### Frontend Customization

- Replace `src/pages/HomePage.tsx` with your app logic
- Use `src/components/layout/AppLayout.tsx` for sidebar layouts
- API calls via `src/lib/api-client.ts` (auto-typed responses)
- Shared types in `shared/types.ts`

### Backend Customization

- Add routes in `worker/user-routes.ts` (auto-loaded)
- Extend entities in `worker/entities.ts` using `IndexedEntity` base class
- Core utils (`worker/core-utils.ts`) provide CRUD, pagination, indexing out-of-the-box

## API Endpoints

All endpoints return `{ success: boolean; data?: T; error?: string }`

### Users
- `GET /api/users?cursor=&limit=10` - Paginated list
- `POST /api/users` - `{ name: string }`
- `DELETE /api/users/:id`
- `POST /api/users/deleteMany` - `{ ids: string[] }`

### Chats
- `GET /api/chats?cursor=&limit=10` - Paginated list
- `POST /api/chats` - `{ title: string }`
- `DELETE /api/chats/:id`
- `POST /api/chats/deleteMany` - `{ ids: string[] }`

### Messages
- `GET /api/chats/:chatId/messages` - List messages
- `POST /api/chats/:chatId/messages` - `{ userId: string; text: string }`

### Health & Utils
- `GET /api/health`
- `POST /api/client-errors` - Error reporting endpoint

Test with `curl` or frontend integration.

## Deployment

Deploy to Cloudflare Workers with a single command:

```
bun run deploy
```

This builds the frontend assets and deploys the Worker globally.

### Production Checklist

1. Update `wrangler.jsonc` with your account ID if needed
2. Set custom domain in Wrangler dashboard
3. Monitor via Cloudflare dashboard (logs, metrics enabled)
4. Generate types post-deploy: `bun run cf-typegen`

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Erin-11/primespace-real-estate-explorer)

### Workers Paid Tier

Durable Objects require Workers Paid plan for production use. Free tier suitable for dev/testing.

## Contributing

1. Fork the repo
2. `bun install`
3. Make changes
4. Test locally: `bun dev`
5. Lint: `bun lint`
6. PR with clear description

## License

MIT License. See [LICENSE](LICENSE) for details.