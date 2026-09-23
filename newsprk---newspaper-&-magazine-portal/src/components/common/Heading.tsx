import React from 'react';

interface HeadingProps {
  title: string;
  className?: string;
}

export const Heading: React.FC<HeadingProps> = ({ title, className = '' }) => {
  return (
    <div className={`heading ${className}`}>
      <h2 className="widget-title">{title}</h2>
    </div>
  );
};

export default Heading;
