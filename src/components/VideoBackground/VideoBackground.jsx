import './VideoBackground.css';

const VIDEO_SRC = 'https://elegantbusiness.liquid-themes.com/wp-content/uploads/2024/09/elegant-business-bg.mp4';

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
