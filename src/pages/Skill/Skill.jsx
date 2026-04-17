import React, { useRef, useState, useCallback } from 'react';
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
      <strong>영국 NTU 졸업 후 대기업 MD와 이커머스 창업을 통해 비즈니스 전 과정을 주도했습니다. </strong>
      <span className="text-dim">현장에서 마주한 한계를 기술력으로 돌파하고자 코딩을 익혔고, </span>
      <span className="text-dim">이제 데이터와 로직을 바탕으로 시장의 문제를 실효적인 기획으로 풀어냅니다.</span>
    </p>
  ),
  en: (
    <p>
      <strong>Having led the full scope of business operations through an MD role at a major corporation and an e-commerce venture, </strong>
      <span className="text-dim">I took up coding to overcome the limitations I encountered on the ground. </span>
      <span className="text-dim">I now draw on data and logic to shape market challenges into considered, actionable plans.</span>
    </p>
  ),
};

const Skill = () => {
  const [sectionRef, isVisible] = useInView();
  const carouselRef = useRef(null);
  const { lang } = useLanguage();
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(Math.ceil(el.scrollLeft + el.clientWidth) < el.scrollWidth);
  }, []);

  const scroll = (direction) => {
    if (!carouselRef.current) return;
    carouselRef.current.scrollBy({ left: direction === 'next' ? SCROLL_AMOUNT : -SCROLL_AMOUNT, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="skill"
      className={`skill-section ${isVisible ? 'is-visible' : ''}`}
    >
      <div className="skill-container">

        <div className="skill-header">
          <SectionTag>Professional Skills</SectionTag>

          <div className="skill-description">
            {DESCRIPTION[lang]}
          </div>
        </div>

        <div className={`skill-carousel-wrapper${!canScrollLeft ? ' scroll-start' : !canScrollRight ? ' scroll-end' : ' scroll-middle'}`}>
          <div className="skill-carousel" ref={carouselRef} onScroll={checkScroll}>
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
        </div>

        <div className="carousel-controls">
          <button
            className="control-btn prev"
            onClick={() => scroll('prev')}
            disabled={!canScrollLeft}
          >
            <ArrowIcon direction="left" />
          </button>
          <button
            className="control-btn next"
            onClick={() => scroll('next')}
            disabled={!canScrollRight}
          >
            <ArrowIcon direction="right" />
          </button>
        </div>

      </div>
    </section>
  );
};

const ArrowIcon = ({ direction }) => (
  <i className={direction === 'left' ? 'fa-solid fa-chevron-left' : 'fa-solid fa-chevron-right'} />
);

export default Skill;
