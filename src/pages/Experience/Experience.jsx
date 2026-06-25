import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Experience.css';

const LABELS = {
  ko: { sectionTag: '경력 & 학력', career: '경력', education: '학력', training: '교육' },
  en: { sectionTag: 'Career & Education', career: 'Career', education: 'Education', training: 'Training' },
};

const EXPERIENCES = {
  ko: [
    { type: 'career', name: '포레', sub: '개인 브랜드 대표', period: '2022.05 – 2025.10', duration: '3년 6개월', summary: '상품 기획, 소싱, 재고, 마케팅 전 과정 직접 운영', description: ['시즌당 32 SKU 운영, 재고 효율 극대화', '브랜드 피벗 후 매출 30%↑, D2C 운영 안정화', '카테고리 및 타겟 피벗으로 재고 리스크 해소, 수익성 개선'] },
    { type: 'career', name: '㈜남영비비안', sub: '상품기획 MD', period: '2020.03 – 2022.05', duration: '2년 4개월', summary: '시즌 상품 기획, 수입 바잉, 생산관리, 온라인 채널 운영', description: ['라이선스 350 SKU + 수입 브랜드 150 SKU, 시즌당 총 500 SKU 기획 및 운영', '3개국 신규 브랜드 포트폴리오 재편 및 런칭, 첫 시즌 판매 호조 달성', '온라인 채널 리뉴얼 기획, 하반기 매출 전년 대비 유의미한 성장 달성'] },
    { type: 'training', name: 'MBC 아카데미 (종로)', sub: '웹 개발 과정', period: '2025.10 – 2026.04', duration: '수료', summary: 'AI 기반 콘텐츠 기획, 반응형 웹 개발(HTML, CSS, JS, React), 영상 제작' },
    { type: 'education', name: 'Nottingham Trent University (UK)', sub: '패션 디자인 학사', period: '2016.09 – 2019.06', duration: '졸업', award: { name: 'River Island 공모전', sub: '2019 Menswear Collection Concept Competition', result: '전체 우승', period: '2018.05' } },
    { type: 'education', name: 'NTU International College (UK)', sub: 'Art & Design', period: '2015.03 – 2016.03', duration: '졸업' },
  ],
  en: [
    { type: 'career', name: 'Poroe', sub: 'Founder & CEO', period: '2022.05 – 2025.10', duration: '3 yrs 6 mos', summary: 'Product planning, sourcing, inventory, marketing — end-to-end', description: ['32 SKUs per season, maximised inventory efficiency', 'Sales +30% post-pivot, D2C operations stabilised', 'Category and target pivot, resolved inventory risk, improved profitability'] },
    { type: 'career', name: 'Namyoung Vivien Co., Ltd.', sub: 'Product Planning MD', period: '2020.03 – 2022.05', duration: '2 yrs 4 mos', summary: 'Seasonal product planning, import buying, production management, online channel operations', description: ['Licensed 350 SKUs + imported brands 150 SKUs — total 500 SKUs planned and operated per season', 'Restructured and launched a new brand portfolio across 3 countries, strong sales in the first season', 'Planned online channel renewal, achieved meaningful YoY sales growth in H2'] },
    { type: 'training', name: 'MBC Academy (Jongno)', sub: 'Web Development', period: 'Oct 2025 – Apr 2026', duration: 'Completed', summary: 'AI-based content planning, responsive web development (HTML, CSS, JS, React), video production' },
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
                    {item.type === 'career' ? labels.career : item.type === 'training' ? labels.training : item.type === 'education' ? labels.education : '수상'}
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
