import React from 'react';
import './IconCircle.css';

/**
 * 44px 원형 아이콘 래퍼.
 * hover 상태 (배경색 전환 등)는 부모 컴포넌트 CSS에서 제어한다.
 *
 * @param {string}      className  - 추가 클래스
 * @param {ReactNode}   children   - 내부 아이콘 (Font Awesome <i> 등)
 */
const IconCircle = ({ children, className = '' }) => (
  <div className={`icon-circle ${className}`.trim()}>
    {children}
  </div>
);

export default IconCircle;
