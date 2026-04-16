import React from 'react';
import './SectionTag.css';

/**
 * 섹션 레이블 태그 (아이콘 + 텍스트 pill)
 *
 * @param {'default' | 'light'} variant
 *   - 'default' : 밝은 배경 위 (green 텍스트/아이콘)
 *   - 'light'   : 어두운 배경 위 (white 텍스트/아이콘)
 */
const SectionTag = ({ children, variant = 'default', noIcon = false }) => (
  <div className={`section-tag section-tag--${variant}`}>
    {!noIcon && <i className="fa-solid fa-circle-check" />}
    <span>{children}</span>
  </div>
);

export default SectionTag;
