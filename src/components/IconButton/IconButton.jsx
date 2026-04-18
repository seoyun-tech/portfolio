import React from 'react';
import IconCircle from '../IconCircle/IconCircle';
import './IconButton.css';

const IconButton = ({ as: Tag = 'button', icon, iconSize = '12px', children, className = '', ...props }) => (
  <Tag className={`icon-btn ${className}`.trim()} {...props}>
    <IconCircle>
      <i className={icon} style={{ fontSize: iconSize }} />
    </IconCircle>
    <span className="icon-btn-text">{children}</span>
  </Tag>
);

export default IconButton;
