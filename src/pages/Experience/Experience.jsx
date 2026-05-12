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
    { type: 'career', name: '포레', sub: '개인 브랜드 CEO', period: '2022.05 – 2025.10', duration: '3년 6개월', summary: '상품 기획 · 소싱 · 카테고리 전략 · 재고 관리 · 마케팅 전반 단독 총괄', award: { name: '패션코드 2023 F/W', sub: '한국콘텐츠진흥원(KOCCA) 주관', result: '참가', period: '2023.03' }, works: ['/assets/works/1-1.png', '/assets/works/1-2.png', '/assets/works/1-3.png', '/assets/works/1-4.png'] },
    { type: 'career', name: '㈜남영비비안', sub: '상품기획 MD', period: '2020.03 – 2022.05', duration: '2년 4개월', summary: '시즌 상품 기획 및 수입 바잉 프로세스 내재화, 생산 TNA 관리 담당' },
    { type: 'education', name: 'Nottingham Trent University (UK)', sub: '패션 디자인 학사', period: '2016.09 – 2019.06', duration: '졸업', award: { name: 'River Island 공모전', sub: '2019 Menswear Collection Concept Competition', result: '전체 우승', period: '2018.05' } },
    { type: 'education', name: 'NTU International College (UK)', sub: 'Art & Design', period: '2015.03 – 2016.03', duration: '졸업' },
  ],
  en: [
    { type: 'career', name: 'Poroe', sub: 'Founder & CEO', period: '2022.05 – 2025.10', duration: '3 yrs 6 mos', summary: 'Independently ran all brand functions across product planning, sourcing, category strategy, inventory management and marketing', award: { name: 'Fashioncode 2023 F/W', sub: 'Organised by KOCCA', result: 'Participated', period: 'Mar 2023' }, works: ['/assets/works/1-1.png', '/assets/works/1-2.png', '/assets/works/1-3.png', '/assets/works/1-4.png'] },
    { type: 'career', name: 'Namyoung Vivien Co., Ltd.', sub: 'Product Planning MD', period: '2020.03 – 2022.05', duration: '2 yrs 4 mos', summary: 'Responsible for seasonal product planning, internalising the import buying process, and managing production TNA' },
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
