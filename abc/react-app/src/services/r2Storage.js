import { compressImage } from '../utils/imageCompressor';

/**
 * Service to handle client-side image compression and upload to Cloudflare R2
 */
export const uploadImageToR2 = async (file, options = {}) => {
  const {
    folder = 'products',
    maxWidth = 1400,
    maxHeight = 1400,
    quality = 0.8,
    onProgress = null
  } = options;

  if (onProgress) onProgress({ status: 'compressing', progress: 20 });

  // 1. Client-Side Compression
  const compressionResult = await compressImage(file, {
    maxWidth,
    maxHeight,
    quality,
    outputFormat: 'image/webp'
  });

  if (onProgress) {
    onProgress({
      status: 'compressed',
      progress: 60,
      stats: compressionResult
    });
  }

  // 2. Attempt Upload to Cloudflare Pages R2 API (/api/upload)
  try {
    if (onProgress) onProgress({ status: 'uploading', progress: 80 });

    const formData = new FormData();
    formData.append('file', compressionResult.file);
    formData.append('folder', folder);

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      const data = await response.json();
      if (data && data.url) {
        if (onProgress) onProgress({ status: 'complete', progress: 100, url: data.url });
        return {
          success: true,
          url: data.url,
          source: 'r2',
          stats: compressionResult
        };
      }
    }
  } catch (err) {
    console.warn('[R2 Storage Service] Cloudflare /api/upload endpoint not reachable. Using compressed local preview.', err);
  }

  // 3. Graceful Fallback: Use compressed WebP Base64 preview
  // Allows testing on localhost or when R2 bucket is not yet bound
  if (onProgress) onProgress({ status: 'fallback', progress: 100, url: compressionResult.dataUrl });
  return {
    success: true,
    url: compressionResult.dataUrl,
    source: 'local_compressed',
    stats: compressionResult,
    note: 'Compressed successfully and stored locally. (To store permanently in R2, bind R2_BUCKET in Cloudflare Pages dashboard)'
  };
};
