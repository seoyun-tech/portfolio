import React from 'react';
import useInView from '../../hooks/useInView';
import VideoBackground from '../../components/VideoBackground/VideoBackground';
import { useLanguage } from '../../context/LanguageContext';
import './Education.css';

const CARDS = {
  ko: [
    {
      number: '01',
      name: 'NTU International College(UK)',
      details: ['Art & Design', '2015.03 - 2016.03(졸업)'],
      description: [
        '디자인적 사고 및 비주얼 커뮤니케이션 학습',
        '창의적 문제 해결을 위한 리서치 및 분석 기법 학습',
      ],
      opacity: 0.94,
    },
    {
      number: '02',
      name: 'Nottingham Trent University(UK)',
      details: ['Fashion Degree(학사)', '2016.09 - 2019.06(졸업)'],
      description: [
        '상업적 디자인 설계 및 컬렉션 기획 프로세스 이수',
        '글로벌 패션 트렌드 분석 및 시장 지향적 리서치 수행',
      ],
      opacity: 0.75,
    },
  ],
  en: [
    {
      number: '01',
      name: 'NTU International College(UK)',
      details: ['Art & Design', '2015.03 - 2016.03(Graduated)'],
      description: [
        'Studied design thinking and visual communication',
        'Developed research and analytical skills for creative problem solving',
      ],
      opacity: 0.94,
    },
    {
      number: '02',
      name: 'Nottingham Trent University(UK)',
      details: ['Fashion Degree(BA)', '2016.09 - 2019.06(Graduated)'],
      description: [
        'Completed commercial design and collection planning processes',
        'Conducted global fashion trend analysis and market-oriented research',
      ],
      opacity: 0.75,
    },
  ],
};

const Education = () => {
  const [ref, isVisible] = useInView();
  const { lang } = useLanguage();

  return (
    <section
      className={`education-section ${isVisible ? 'is-visible' : ''}`}
      id="education"
      ref={ref}
    >
      <VideoBackground
        videoOpacity={0.35}
        overlay="linear-gradient(190deg, rgba(25, 64, 45, 0.9) 0%, var(--color-primary) 100%)"
      />

      <div className="edu-inner">
        <h2 className="edu-title">
          <strong>Academic</strong> <em>Qualification</em>
        </h2>


        <div className="edu-grid">
          {CARDS[lang].map((card) => (
            <div key={card.number} className="edu-card" style={{ opacity: card.opacity }}>
              <span className="edu-num">{card.number}</span>
              <p className="edu-name">{card.name}</p>
              {card.details.length > 0 && (
                <div className="edu-details">
                  {card.details.map((line, i) => <span key={i}>{line}</span>)}
                </div>
              )}
              <ul className="edu-desc">
                {card.description.map((item, i) => <li key={i}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
