import React from 'react';
import './VideoBackground.css';

const VIDEO_SRC = 'https://elegantbusiness.liquid-themes.com/wp-content/uploads/2024/09/elegant-business-bg.mp4';

/**
 * 어두운 섹션 공통 배경 비디오 레이어.
 * About / Education / Contact 에서 동일하게 사용.
 *
 * @param {number} videoOpacity - 비디오 투명도 (기본 0.4)
 * @param {string} overlay      - 오버레이 background CSS 값
 */
const VideoBackground = ({ videoOpacity = 0.4, overlay }) => (
  <div className="video-bg">
    <video
      className="video-bg__video"
      autoPlay muted loop playsInline
      src={VIDEO_SRC}
      preload="auto"
      style={{ opacity: videoOpacity }}
    />
    <div className="video-bg__overlay" style={{ background: overlay }} />
  </div>
);

export default VideoBackground;
