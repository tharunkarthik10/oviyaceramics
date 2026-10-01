/**
 * Cloudflare Pages Serverless Function for R2 Image Uploads
 * Endpoint: POST /api/upload
 * 
 * Works seamlessly on Cloudflare Pages when R2 Bucket is bound as 'R2_BUCKET'
 * Free tier: 10 GB free storage, 0 bandwidth fees forever!
 */

export async function onRequestPost({ request, env }) {
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };

  try {
    const contentType = request.headers.get('content-type') || '';
    if (!contentType.includes('multipart/form-data')) {
      return new Response(
        JSON.stringify({ error: 'Request must be multipart/form-data with a file field.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    const folder = (formData.get('folder') || 'products').replace(/[^a-zA-Z0-9_-]/g, '');

    if (!file || typeof file === 'string') {
      return new Response(
        JSON.stringify({ error: 'No file provided in form data.' }),
        { status: 400, headers: corsHeaders }
      );
    }

    // 1. Verify R2 Bucket Binding in Cloudflare Pages Environment
    const bucket = env.R2_BUCKET || env.BUCKET;
    if (!bucket) {
      return new Response(
        JSON.stringify({
          error: 'Cloudflare R2 Bucket is not bound yet.',
          setupGuide: 'In Cloudflare Pages Dashboard -> Settings -> Functions -> R2 Bucket Bindings -> Bind variable name "R2_BUCKET" to your bucket.'
        }),
        { status: 503, headers: corsHeaders }
      );
    }

    // 2. Generate a clean, collision-free key
    const rawName = file.name || 'image.webp';
    const ext = rawName.split('.').pop().toLowerCase() || 'webp';
    const timestamp = Date.now();
    const randomHex = Math.random().toString(36).substring(2, 8);
    const key = `${folder}/${timestamp}_${randomHex}.${ext}`;

    // 3. Put into Cloudflare R2 Bucket
    await bucket.put(key, file.stream(), {
      httpMetadata: {
        contentType: file.type || 'image/webp',
        cacheControl: 'public, max-age=31536000, immutable'
      }
    });

    // 4. Construct Public URL
    // Can be custom domain (e.g. https://media.oviyaceramics.in) or Cloudflare r2.dev public URL
    const publicDomain = env.R2_PUBLIC_URL || env.PUBLIC_R2_URL || '';
    const publicUrl = publicDomain
      ? `${publicDomain.replace(/\/$/, '')}/${key}`
      : `/r2-media/${key}`;

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl,
        key,
        size: file.size,
        contentType: file.type
      }),
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || 'R2 upload failed' }),
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400'
    }
  });
}
