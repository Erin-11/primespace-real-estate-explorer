import { Hono } from "hono";
import type { Env } from './core-utils';
import { UserEntity, ChatBoardEntity, WatchlistEntity } from "./entities";
import { ok, bad, notFound, isStr } from './core-utils';
export function userRoutes(app: Hono<{ Bindings: Env }>) {
  app.get('/api/test', (c) => c.json({ success: true, data: { name: 'CF Workers Demo' }}));
  // WATCHLIST
  app.get('/api/watchlist', async (c) => {
    const page = await WatchlistEntity.list(c.env, null, 100);
    return ok(c, page.items);
  });
  app.post('/api/watchlist', async (c) => {
    const item = await c.req.json();
    if (!item.id || !item.building) return bad(c, 'Invalid watchlist item');
    const created = await WatchlistEntity.create(c.env, { 
      ...item, 
      timestamp: Date.now() 
    });
    return ok(c, created);
  });
  app.delete('/api/watchlist/:id', async (c) => {
    const id = c.req.param('id');
    const deleted = await WatchlistEntity.delete(c.env, id);
    return ok(c, { id, deleted });
  });
  // USERS
  app.get('/api/users', async (c) => {
    await UserEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await UserEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
  app.post('/api/users', async (c) => {
    const { name } = (await c.req.json()) as { name?: string };
    if (!name?.trim()) return bad(c, 'name required');
    return ok(c, await UserEntity.create(c.env, { id: crypto.randomUUID(), name: name.trim() }));
  });
  // CHATS
  app.get('/api/chats', async (c) => {
    await ChatBoardEntity.ensureSeed(c.env);
    const cq = c.req.query('cursor');
    const lq = c.req.query('limit');
    const page = await ChatBoardEntity.list(c.env, cq ?? null, lq ? Math.max(1, (Number(lq) | 0)) : undefined);
    return ok(c, page);
  });
}