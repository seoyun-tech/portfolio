import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Experience.css';

const LABELS = {
  ko: { sectionTag: '경력 & 학력', career: '경력', education: '학력' },
  en: { sectionTag: 'Career & Education', career: 'Career', education: 'Education' },
};

const EXPERIENCES = {
  ko: [
    { type: 'education', name: 'MBC 아카데미 (종로)', sub: '웹 개발 과정 수료', period: '2025.10 – 2026.04', duration: '6개월', summary: 'AI 기반 콘텐츠 기획 · 반응형 웹 개발(HTML · CSS · JS · React) · 영상 제작 전 과정 수료' },
    { type: 'career', name: '포레', sub: '개인 브랜드 CEO', period: '2022.05 – 2025.10', duration: '3년 6개월', summary: '상품 기획 · 소싱 · 카테고리 전략 · 재고 관리 · 마케팅 전반 직접 운영', description: ['시즌당 약 32 SKU 소품종 집중 운영, 선택과 집중 기반 재고 효율 극대화', '브랜드 피벗 직후 매출 30%↑ 달성 및 D2C 운영 안정화', '카테고리 믹스 전략 및 니치 마켓 피벗으로 재고 리스크 해소·수익성 개선'],  works: ['/assets/works/1-1.png', '/assets/works/1-2.png', '/assets/works/1-3.png', '/assets/works/1-4.png'] },
    { type: 'career', name: '㈜남영비비안', sub: '상품기획 MD', period: '2020.03 – 2022.05', duration: '2년 4개월', summary: '시즌 상품 기획 및 수입 바잉 프로세스 내재화, 생산 TNA 관리 담당', description: ['시즌당 약 350 SKU 담당, 카테고리별 기획·발주·납기 관리 전반 수행', '3개국(프랑스·미국·벨기에) 신규 브랜드 바잉 기획·구축 → 전년 대비 매출 8.2%↑, 목표 대비 108% 초과 달성', '온라인 채널 리빌딩 주도 → 하반기 전년 대비 매출 31%↑, 촬영 시간 2배 확보 및 운영 비용 절감'] },
    { type: 'education', name: 'Nottingham Trent University (UK)', sub: '패션 디자인 학사', period: '2016.09 – 2019.06', duration: '졸업', award: { name: 'River Island 공모전', sub: '2019 Menswear Collection Concept Competition', result: '전체 우승', period: '2018.05' } },
    { type: 'education', name: 'NTU International College (UK)', sub: 'Art & Design', period: '2015.03 – 2016.03', duration: '졸업' },
  ],
  en: [
    { type: 'education', name: 'MBC Academy (Jongno)', sub: 'Web Development Course — Completed', period: 'Oct 2025 – Apr 2026', duration: '6 mos', summary: 'AI-based content planning · Responsive web development (HTML · CSS · JS · React) · Video production — full course completed' },
    { type: 'career', name: 'Poroe', sub: 'Founder & CEO', period: '2022.05 – 2025.10', duration: '3 yrs 6 mos', summary: 'Directly managed product planning, sourcing, category strategy, inventory management and marketing across all brand functions', description: ['Managed approx. 32 SKUs per season — maximised inventory efficiency through a focused, curated lineup', 'Sales +30% post-pivot and D2C operations stabilised', 'Resolved inventory risk and improved profitability through category mix strategy and niche market pivot'],  works: ['/assets/works/1-1.png', '/assets/works/1-2.png', '/assets/works/1-3.png', '/assets/works/1-4.png'] },
    { type: 'career', name: 'Namyoung Vivien Co., Ltd.', sub: 'Product Planning MD', period: '2020.03 – 2022.05', duration: '2 yrs 4 mos', summary: 'Responsible for seasonal product planning, internalising the import buying process, and managing production TNA', description: ['Managed approx. 350 SKUs per season across planning, ordering, and lead time management', 'Planned and built buying process for brands across 3 countries (FR·US·BE) — 108% of target, sales +8.2% YoY', 'Led online channel rebuild → H2 sales +31% YoY, shoot time doubled, operating costs reduced'] },
    { type: 'education', name: 'Nottingham Trent University (UK)', sub: 'Fashion Design, BA', period: '2016.09 – 2019.06', duration: 'Graduated', award: { name: 'River Island Competition', sub: '2019 Menswear Collection Concept Competition', result: 'Overall Winner', period: 'May 2018' } },
    { type: 'education', name: 'NTU International College (UK)', sub: 'Art & Design', period: '2015.03 – 2016.03', duration: 'Graduated' },
  ],
};


const Experience = () => {
  const { lang } = useLanguage();
  const [ref, isVisible] = useInView();
  const experiences = EXPERIENCES[lang];
  const labels = LABELS[lang];

  return (
    <section className={`experience${isVisible ? ' is-visible' : ''}`} id="experience" ref={ref}>
        <div className="experience-container page-container">
          <div className="experience-tag">
            <SectionTag>{labels.sectionTag}</SectionTag>
          </div>

          <div className="exp-list">
            {experiences.map((item, i) => (
              <div key={i} className={`exp-item ${item.type}`} style={{ '--delay': `${0.2 + i * 0.15}s` }}>
                <div className="exp-left">
                  <span className={`exp-type ${item.type}`}>
                    {item.type === 'career' ? labels.career : item.type === 'education' ? labels.education : '수상'}
                  </span>
                </div>
                <div className="exp-right">
                  <div className="exp-header">
                    <h3 className="exp-name">{item.name}</h3>
                    <span className="exp-period">{item.period}</span>
                  </div>
                  <p className="exp-sub">
                    {item.sub}{item.duration && <span className="exp-duration"> · {item.duration}</span>}
                  </p>
                  {item.summary && (
                    <p className="exp-summary">{item.summary}</p>
                  )}
                  {item.description && (
                    <ul className="exp-desc">
                      {item.description.map((d, j) => <li key={j}>{d}</li>)}
                    </ul>
                  )}
                  {item.award && (
                    <p className="exp-award">
                      <span className="award-chip">{item.award.result}</span>
                      {item.award.name} · {item.award.sub} · {item.award.period}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
    </section>
  );
};

export default Experience;
