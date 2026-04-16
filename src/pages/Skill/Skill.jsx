import React, { useRef } from 'react';
import useInView from '../../hooks/useInView';
import SectionTag from '../../components/SectionTag/SectionTag';
import { useLanguage } from '../../context/LanguageContext';
import './Skill.css';

const SKILLS_DATA = [
  { name: "HTML",         width: 151 },
  { name: "CSS",          width: 151 },
  { name: "JavaScript",   width: 151 },
  { name: "React",        width: 151 },
  { name: "GitHub",       width: 151 },
  { name: "Figma",        width: 151 },
  { name: "Photoshop",    width: 151 },
  { name: "Illustrator",  width: 151 },
];

const SCROLL_AMOUNT = 300;

const DESCRIPTION = {
  ko: (
    <p>
      <strong>영국 NTU 졸업 후 대기업 MD와 이커머스 창업을 거치며 비즈니스의 전 과정을 주도했습니다. </strong>
      <span className="text-dim">현장에서 체감한 한계를 극복하기 위해 기술을 도구로 선택했고, </span>
      <span className="text-dim">이제 감각적인 직관을 데이터와 로직으로 증명하려 합니다.</span>
    </p>
  ),
  en: (
    <p>
      <strong>After graduating from NTU in the UK, I led end-to-end business operations through a major company MD role and an e-commerce startup. </strong>
      <span className="text-dim">I chose technology as a tool to overcome the limits I felt on the ground, </span>
      <span className="text-dim">and now I am here to prove intuitive instincts with data and logic.</span>
    </p>
  ),
};

const Skill = () => {
  const [sectionRef, isVisible] = useInView();
  const carouselRef = useRef(null);
  const { lang } = useLanguage();

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    const offset = direction === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT;
    carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="skill"
      className={`skill-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="skill-container">

        <div className="skill-header">
          <div className="skill-tag-wrapper">
            <SectionTag>Professional Skills</SectionTag>
          </div>

          <div className="skill-description">
            {DESCRIPTION[lang]}
          </div>
        </div>

        <div className="skill-carousel-wrapper">
          <div className="skill-carousel" ref={carouselRef}>
            {SKILLS_DATA.map((skill, index) => (
              <div
                key={skill.name}
                className="skill-chip"
                style={{
                  minWidth: `${skill.width}px`,
                  animationDelay: `${0.1 + index * 0.1}s`
                }}
              >
                {skill.name}
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button className="control-btn prev" onClick={() => scroll('prev')}>
              <ArrowIcon direction="left" />
            </button>
            <button className="control-btn next" onClick={() => scroll('next')}>
              <ArrowIcon direction="right" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const ArrowIcon = ({ direction }) => (
  <i
    className={direction === 'left' ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right'}
    style={{ color: 'var(--color-primary)', fontSize: '13px' }}
  />
);

export default Skill;
