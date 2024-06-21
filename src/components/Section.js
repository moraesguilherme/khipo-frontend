import React from 'react';
import './Section.css';

const Section = ({ title, linkText, linkHref, children }) => (
  <div className="section-wrapper">
    <div className="section-header">
      <h2 className="section-title">{title}</h2>
      <a href={linkHref} className="section-link">{linkText}</a>
    </div>
    {children}
  </div>
);

export default Section;