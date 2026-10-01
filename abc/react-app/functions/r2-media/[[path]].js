/**
 * Cloudflare Pages Serverless Handler to serve images directly from Cloudflare R2
 * Endpoint: GET /r2-media/*
 * 
 * Streams stored images, WebP assets, and PDFs with high-performance caching headers.
 */
export async function onRequestGet({ request, params, env }) {
  try {
    const rawPath = params.path;
    const key = Array.isArray(rawPath) ? rawPath.join('/') : (rawPath || '');

    if (!key) {
      return new Response('File key is required', { status: 400 });
    }

    const bucket = env.R2_BUCKET || env.BUCKET;
    if (!bucket) {
      return new Response('R2 Bucket not configured on Pages environment', { status: 503 });
    }

    const object = await bucket.get(key);
    if (!object) {
      return new Response('Image Not Found in R2', { status: 404 });
    }

    const headers = new Headers();
    if (object.httpMetadata) {
      object.writeHttpMetadata(headers);
    }
    
    // Ensure proper MIME content type
    if (!headers.get('content-type')) {
      const ext = key.split('.').pop().toLowerCase();
      const mimeTypes = {
        webp: 'image/webp',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        svg: 'image/svg+xml',
        gif: 'image/gif',
        pdf: 'application/pdf',
        ico: 'image/x-icon'
      };
      headers.set('content-type', mimeTypes[ext] || 'image/webp');
    }

    headers.set('cache-control', 'public, max-age=31536000, immutable');
    headers.set('access-control-allow-origin', '*');
    if (object.httpEtag) {
      headers.set('etag', object.httpEtag);
    }

    return new Response(object.body, {
      status: 200,
      headers
    });
  } catch (err) {
    return new Response('Internal error fetching R2 media: ' + err.message, { status: 500 });
  }
}
