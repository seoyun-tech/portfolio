import './IconCircle.css';

const IconCircle = ({ children, className = '' }) => (
  <div className={`icon-circle ${className}`.trim()}>
    {children}
  </div>
);

export default IconCircle;
