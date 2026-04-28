import './SectionTag.css';

const SectionTag = ({ children, variant = 'default', noIcon = false }) => (
  <div className={`section-tag section-tag--${variant}`}>
    {!noIcon && <i className="fa-solid fa-circle-check" />}
    <span>{children}</span>
  </div>
);

export default SectionTag;
