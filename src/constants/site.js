/** 프로덕션 URL — Vercel 환경변수 VITE_SITE_URL 없으면 배포 도메인에 맞게 수정 */
export const SITE_URL =
  import.meta.env.VITE_SITE_URL?.replace(/\/$/, '') || '';

export const SITE_META = {
  ko: {
    title: '박서윤 | 상품기획 MD 포트폴리오',
    description:
      '상품기획 MD 박서윤 — 시즌·바잉·온라인 6년+ 실무. 남영비비안·자사 브랜드 운영과 데이터·디지털 역량.',
  },
  en: {
    title: 'Seo-yun Park | Product Planning MD',
    description:
      'Product Planning MD with 6+ years across seasonal planning, buying, and online channels — corporate MD, brand operations, and digital skills.',
  },
};

export const OG_IMAGE_PATH = '/assets/project-rookiz-scene.jpg';
