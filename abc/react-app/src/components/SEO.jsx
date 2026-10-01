import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const BASE_URL = 'https://oviyaceramics.in';
const DEFAULT_IMAGE = `${BASE_URL}/oviya_hero_facade.jpg`;
const SITE_NAME = 'Oviya Ceramics';

const updateMetaTag = (attributeName, attributeValue, content) => {
  if (content === undefined || content === null) return;
  let element = document.querySelector(`meta[${attributeName}="${attributeValue}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(attributeName, attributeValue);
    document.head.appendChild(element);
  }
  element.setAttribute('content', content);
};

const updateLinkTag = (rel, href) => {
  if (!href) return;
  let element = document.querySelector(`link[rel="${rel}"]`);
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', rel);
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const updateJsonLd = (schema) => {
  const existing = document.getElementById('route-jsonld');
  if (existing) {
    existing.remove();
  }
  if (!schema) return;
  const script = document.createElement('script');
  script.id = 'route-jsonld';
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * SEO Component for dynamic head management across all pages
 */
const SEO = ({
  title,
  description,
  keywords,
  canonical,
  image,
  type = 'website',
  noindex = false,
  schema = null,
}) => {
  const location = useLocation();

  useEffect(() => {
    // 1. Title formatting
    const formattedTitle = title
      ? (title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`)
      : `${SITE_NAME} | Premium Tiles & Architectural Surfaces`;
    document.title = formattedTitle;

    // 2. Canonical URL
    const canonicalUrl = canonical || `${BASE_URL}${location.pathname}`;
    updateLinkTag('canonical', canonicalUrl);

    // 3. Primary Meta Tags
    if (description) {
      updateMetaTag('name', 'description', description);
    }
    if (keywords) {
      updateMetaTag('name', 'keywords', keywords);
    }
    updateMetaTag(
      'name',
      'robots',
      noindex
        ? 'noindex, nofollow'
        : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    );

    // 4. Open Graph Tags
    const ogImage = image
      ? (image.startsWith('http') ? image : `${BASE_URL}${image.startsWith('/') ? '' : '/'}${image}`)
      : DEFAULT_IMAGE;

    updateMetaTag('property', 'og:site_name', SITE_NAME);
    updateMetaTag('property', 'og:title', formattedTitle);
    if (description) updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:url', canonicalUrl);
    updateMetaTag('property', 'og:type', type);
    updateMetaTag('property', 'og:image', ogImage);

    // 5. Twitter Card Tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', formattedTitle);
    if (description) updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:image', ogImage);

    // 6. Route-Specific JSON-LD Schema
    updateJsonLd(schema);

    return () => {
      // Cleanup route-specific JSON-LD when unmounting
      const script = document.getElementById('route-jsonld');
      if (script) script.remove();
    };
  }, [title, description, keywords, canonical, image, type, noindex, schema, location.pathname]);

  return null;
};

export default SEO;
