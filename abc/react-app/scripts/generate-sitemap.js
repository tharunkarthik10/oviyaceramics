import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_PRODUCTS } from '../src/context/initialProducts.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://oviyaceramics.in';
const TODAY = new Date().toISOString().split('T')[0];

function escapeXml(unsafe) {
  if (!unsafe) return '';
  return String(unsafe).replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

const staticRoutes = [
  {
    path: '/',
    changefreq: 'daily',
    priority: '1.0',
    image: {
      loc: `${BASE_URL}/oviya_hero_facade.jpg`,
      title: 'Oviya Ceramics - Spaces That Inspire',
      caption: 'Flagship showroom and tile manufacturing center in Dindigul, Tamil Nadu'
    }
  },
  {
    path: '/products',
    changefreq: 'daily',
    priority: '0.9',
    image: {
      loc: `${BASE_URL}/luxury_living_tiles_banner.jpg`,
      title: 'Oviya Ceramics - Complete Tile Collections',
      caption: 'Browse glazed vitrified, polished vitrified, wall tiles, elevation tiles and pavers'
    }
  },
  {
    path: '/catalogues',
    changefreq: 'weekly',
    priority: '0.8',
    image: {
      loc: `${BASE_URL}/clean_catalog_cover.jpg`,
      title: 'Oviya Ceramics - Digital Catalogues',
      caption: 'Download high-definition digital catalogues and tile specifications'
    }
  },
  {
    path: '/gallery',
    changefreq: 'weekly',
    priority: '0.8',
    image: {
      loc: `${BASE_URL}/ceramics_hero_bg_1788154769503.jpg`,
      title: 'Oviya Ceramics - Architectural Gallery & Inspirations',
      caption: 'Interior and exterior living room, bathroom, and kitchen tile concepts'
    }
  },
  {
    path: '/about-us',
    changefreq: 'monthly',
    priority: '0.7',
    image: {
      loc: `${BASE_URL}/factory_warehouse.jpg`,
      title: 'Oviya Ceramics - Factory & Plant in Dindigul',
      caption: 'Advanced tile manufacturing machinery, testing labs and dispatch warehouse'
    }
  },
  {
    path: '/contact-us',
    changefreq: 'monthly',
    priority: '0.8',
    image: {
      loc: `${BASE_URL}/oviya_showroom.jpg`,
      title: 'Oviya Ceramics - Dindigul Experience Center',
      caption: 'Bathalagundu Road showroom, Tamil Nadu'
    }
  },
  {
    path: '/privacy-policy',
    changefreq: 'yearly',
    priority: '0.3'
  },
  {
    path: '/terms-of-service',
    changefreq: 'yearly',
    priority: '0.3'
  }
];

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
`;

// Static routes
for (const route of staticRoutes) {
  xml += `  <url>\n`;
  xml += `    <loc>${BASE_URL}${route.path}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
  xml += `    <priority>${route.priority}</priority>\n`;
  if (route.image) {
    xml += `    <image:image>\n`;
    xml += `      <image:loc>${escapeXml(route.image.loc)}</image:loc>\n`;
    xml += `      <image:title>${escapeXml(route.image.title)}</image:title>\n`;
    if (route.image.caption) {
      xml += `      <image:caption>${escapeXml(route.image.caption)}</image:caption>\n`;
    }
    xml += `    </image:image>\n`;
  }
  xml += `  </url>\n`;
}

// Product routes
for (const product of INITIAL_PRODUCTS) {
  const productUrl = `${BASE_URL}/product/${product.id}`;
  const imageUrl = product.image.startsWith('http') 
    ? product.image 
    : `${BASE_URL}${product.image.startsWith('/') ? '' : '/'}${product.image}`;
  const imageTitle = `${product.title} - ${product.category || 'Tiles'} | Oviya Ceramics`;
  const imageCaption = product.description || `${product.title} (${product.size || ''} - ${product.finish || ''})`;

  xml += `  <url>\n`;
  xml += `    <loc>${productUrl}</loc>\n`;
  xml += `    <lastmod>${TODAY}</lastmod>\n`;
  xml += `    <changefreq>weekly</changefreq>\n`;
  xml += `    <priority>0.8</priority>\n`;
  xml += `    <image:image>\n`;
  xml += `      <image:loc>${escapeXml(imageUrl)}</image:loc>\n`;
  xml += `      <image:title>${escapeXml(imageTitle)}</image:title>\n`;
  xml += `      <image:caption>${escapeXml(imageCaption)}</image:caption>\n`;
  xml += `    </image:image>\n`;
  xml += `  </url>\n`;
}

xml += `</urlset>\n`;

const targetPath = path.resolve(__dirname, '../public/sitemap.xml');
fs.writeFileSync(targetPath, xml, 'utf-8');
console.log(`Successfully generated sitemap with ${staticRoutes.length} static routes and ${INITIAL_PRODUCTS.length} product pages.`);
console.log(`Saved to: ${targetPath}`);
