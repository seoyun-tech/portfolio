import { useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { SITE_URL, SITE_META, OG_IMAGE_PATH } from '../../constants/site';

const setMeta = (attr, key, content) => {
  if (!content) return;
  const selector = `meta[${attr}="${key}"]`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
};

const SiteMeta = () => {
  const { lang } = useLanguage();
  const { title, description } = SITE_META[lang];
  const origin = SITE_URL || window.location.origin;
  const ogImage = `${origin}${OG_IMAGE_PATH}`;

  useEffect(() => {
    document.documentElement.lang = lang === 'ko' ? 'ko' : 'en';
    document.title = title;

    setMeta('name', 'description', description);
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:url', origin);
    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);
  }, [lang, title, description, origin, ogImage]);

  return null;
};

export default SiteMeta;
