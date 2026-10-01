/**
 * Cloudflare Pages Function: JSON Data API
 * Endpoint: GET  /api/data?type=products|gallery|catalogues
 *           POST /api/data  { type, action: 'seed'|'add'|'update'|'delete', payload }
 * 
 * Stores products.json, gallery.json, catalogues.json directly in Cloudflare R2.
 * This is the shared database for all devices - mobile, laptop, etc.
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Content-Type': 'application/json'
};

const VALID_TYPES = ['products', 'gallery', 'catalogues'];

// Read JSON from R2
const readData = async (bucket, type) => {
  const key = `data/${type}.json`;
  try {
    const obj = await bucket.get(key);
    if (!obj) return null;
    const text = await obj.text();
    return JSON.parse(text);
  } catch (e) {
    return null;
  }
};

// Write JSON to R2
const writeData = async (bucket, type, data) => {
  const key = `data/${type}.json`;
  const json = JSON.stringify(data);
  await bucket.put(key, json, {
    httpMetadata: {
      contentType: 'application/json',
      cacheControl: 'no-cache, no-store, must-revalidate'
    }
  });
};

// ── GET /api/data?type=products ────────────────────────────────────────────────
export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const type = url.searchParams.get('type');

  if (!VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: 'Invalid type. Use: products, gallery, catalogues' }), { status: 400, headers: CORS });
  }

  const bucket = env.R2_BUCKET || env.BUCKET;
  if (!bucket) {
    return new Response(JSON.stringify({ error: 'R2 bucket not bound.' }), { status: 503, headers: CORS });
  }

  const data = await readData(bucket, type);
  if (data === null) {
    // Collection does not exist yet — return empty so client can seed
    return new Response(JSON.stringify({ exists: false, items: [] }), { status: 200, headers: CORS });
  }

  return new Response(JSON.stringify({ exists: true, items: data }), { status: 200, headers: CORS });
}

// ── POST /api/data ─────────────────────────────────────────────────────────────
export async function onRequestPost({ request, env }) {
  const bucket = env.R2_BUCKET || env.BUCKET;
  if (!bucket) {
    return new Response(JSON.stringify({ error: 'R2 bucket not bound.' }), { status: 503, headers: CORS });
  }

  let body;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), { status: 400, headers: CORS });
  }

  const { type, action, payload } = body;

  if (!VALID_TYPES.includes(type)) {
    return new Response(JSON.stringify({ error: 'Invalid type.' }), { status: 400, headers: CORS });
  }

  const validActions = ['seed', 'add', 'update', 'delete', 'set'];
  if (!validActions.includes(action)) {
    return new Response(JSON.stringify({ error: 'Invalid action. Use: seed, add, update, delete, set' }), { status: 400, headers: CORS });
  }

  try {
    if (action === 'seed' || action === 'set') {
      // Seed: write entire dataset (only if empty, or force-set)
      if (action === 'seed') {
        const existing = await readData(bucket, type);
        if (existing !== null && existing.length > 0) {
          return new Response(JSON.stringify({ ok: true, skipped: true, message: 'Already seeded.' }), { status: 200, headers: CORS });
        }
      }
      await writeData(bucket, type, Array.isArray(payload) ? payload : []);
      return new Response(JSON.stringify({ ok: true, action }), { status: 200, headers: CORS });
    }

    // Read current data
    let items = await readData(bucket, type) || [];

    if (action === 'add') {
      if (!payload || typeof payload !== 'object') {
        return new Response(JSON.stringify({ error: 'payload must be an object for add.' }), { status: 400, headers: CORS });
      }
      const newItem = { ...payload, id: payload.id || Date.now(), _createdAt: Date.now() };
      items = [newItem, ...items];
      await writeData(bucket, type, items);
      return new Response(JSON.stringify({ ok: true, item: newItem }), { status: 200, headers: CORS });
    }

    if (action === 'update') {
      const { id, fields } = payload || {};
      if (!id || !fields) {
        return new Response(JSON.stringify({ error: 'payload must have id and fields for update.' }), { status: 400, headers: CORS });
      }
      items = items.map(item => item.id === id ? { ...item, ...fields, _updatedAt: Date.now() } : item);
      await writeData(bucket, type, items);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS });
    }

    if (action === 'delete') {
      const { id } = payload || {};
      if (!id) {
        return new Response(JSON.stringify({ error: 'payload must have id for delete.' }), { status: 400, headers: CORS });
      }
      items = items.filter(item => item.id !== id);
      await writeData(bucket, type, items);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS });
    }

  } catch (err) {
    return new Response(JSON.stringify({ error: err.message || 'Operation failed.' }), { status: 500, headers: CORS });
  }
}

// ── OPTIONS (CORS preflight) ───────────────────────────────────────────────────
export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}
