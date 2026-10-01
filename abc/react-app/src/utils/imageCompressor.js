/**
 * Advanced Client-Side Image Compressor & Optimizer for Oviya Ceramics
 * 
 * - Supports Ultra-HD 2.5K resolutions (up to 2560px) for razor-sharp tile veining & textures
 * - Smart bypass: Preserves original pixel-perfect quality if file is already web-ready (< 3.5MB, <= 2560px)
 * - Multi-step bicubic downsampling prevents canvas resampling blur on large camera photos
 * - High-fidelity WebP encoding (0.94 quality) maintains stone grain clarity with low file size
 */

export const formatFileSize = (bytes) => {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

/**
 * High-quality stepped downsampling to eliminate standard canvas bilinear blur
 */
const drawHighQualityDownscale = (sourceImg, targetWidth, targetHeight) => {
  let curWidth = sourceImg.width;
  let curHeight = sourceImg.height;

  // If resizing down by more than 2x, step down in halves for razor-sharp interpolation
  let curCanvas = document.createElement('canvas');
  curCanvas.width = curWidth;
  curCanvas.height = curHeight;
  let curCtx = curCanvas.getContext('2d');
  curCtx.imageSmoothingEnabled = true;
  curCtx.imageSmoothingQuality = 'high';
  curCtx.drawImage(sourceImg, 0, 0, curWidth, curHeight);

  while (curWidth > 2 * targetWidth && curHeight > 2 * targetHeight) {
    const nextWidth = Math.round(curWidth / 2);
    const nextHeight = Math.round(curHeight / 2);
    const nextCanvas = document.createElement('canvas');
    nextCanvas.width = nextWidth;
    nextCanvas.height = nextHeight;
    const nextCtx = nextCanvas.getContext('2d');
    nextCtx.imageSmoothingEnabled = true;
    nextCtx.imageSmoothingQuality = 'high';
    nextCtx.drawImage(curCanvas, 0, 0, nextWidth, nextHeight);

    curCanvas = nextCanvas;
    curWidth = nextWidth;
    curHeight = nextHeight;
  }

  const finalCanvas = document.createElement('canvas');
  finalCanvas.width = targetWidth;
  finalCanvas.height = targetHeight;
  const finalCtx = finalCanvas.getContext('2d');
  finalCtx.imageSmoothingEnabled = true;
  finalCtx.imageSmoothingQuality = 'high';
  finalCtx.drawImage(curCanvas, 0, 0, targetWidth, targetHeight);

  return finalCanvas;
};

/**
 * Compresses or optimizes an image file with maximum clarity preservation
 */
export const compressImage = (file, options = {}) => {
  const {
    maxWidth = 2560,
    maxHeight = 2560,
    quality = 0.94,
    outputFormat = 'image/webp'
  } = options;

  return new Promise((resolve, reject) => {
    if (!file || !file.type.startsWith('image/')) {
      return reject(new Error('Invalid file type. Please upload a valid image (JPG, PNG, WebP).'));
    }

    const originalSize = file.size;
    const reader = new FileReader();

    reader.onerror = () => reject(new Error('Failed to read image file.'));

    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to load image for compression.'));

      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Smart Bypass: If image is already reasonably sized (< 3.5MB) and within dimensions,
        // preserve 100% of original photo clarity with zero re-encoding loss
        const isReasonablySized = originalSize <= 3.5 * 1024 * 1024;
        const isWithinDimensions = width <= maxWidth && height <= maxHeight;
        const isSupportedFormat = file.type === 'image/webp' || file.type === 'image/jpeg' || file.type === 'image/png';

        if (isReasonablySized && isWithinDimensions && isSupportedFormat) {
          return resolve({
            blob: file,
            file: file,
            dataUrl: dataUrl,
            originalSize,
            compressedSize: originalSize,
            originalSizeFormatted: formatFileSize(originalSize),
            compressedSizeFormatted: formatFileSize(originalSize),
            reductionPercent: 0,
            dimensions: { width, height },
            bypassed: true
          });
        }

        // Calculate aspect-ratio preserving dimensions
        if (width > height) {
          if (width > maxWidth) {
            height = Math.round((height * maxWidth) / width);
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = Math.round((width * maxHeight) / height);
            height = maxHeight;
          }
        }

        // Use high quality stepped canvas downscaling to preserve crisp edge and stone texture
        const canvas = drawHighQualityDownscale(img, width, height);

        // Test if browser supports WebP canvas export
        let selectedFormat = outputFormat;
        const testData = canvas.toDataURL('image/webp');
        if (!testData.startsWith('data:image/webp')) {
          selectedFormat = 'image/jpeg';
        }

        // Generate dataUrl for instant preview
        const finalDataUrl = canvas.toDataURL(selectedFormat, quality);

        // Convert canvas to Blob / File for direct cloud upload
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              return reject(new Error('Failed to create compressed image blob.'));
            }

            const compressedSize = blob.size;
            const reduction = originalSize > 0 
              ? Math.max(0, Math.round(((originalSize - compressedSize) / originalSize) * 100)) 
              : 0;

            const cleanFileName = (file.name || 'image')
              .replace(/\.[^/.]+$/, '')
              .replace(/[^a-zA-Z0-9_-]/g, '_')
              .toLowerCase();

            const extension = selectedFormat === 'image/webp' ? 'webp' : 'jpg';
            const compressedFile = new File([blob], `${cleanFileName}.${extension}`, {
              type: selectedFormat,
              lastModified: Date.now()
            });

            resolve({
              blob,
              file: compressedFile,
              dataUrl: finalDataUrl,
              originalSize,
              compressedSize,
              originalSizeFormatted: formatFileSize(originalSize),
              compressedSizeFormatted: formatFileSize(compressedSize),
              reductionPercent: reduction,
              dimensions: { width, height }
            });
          },
          selectedFormat,
          quality
        );
      };

      img.src = dataUrl;
    };

    reader.readAsDataURL(file);
  });
};
