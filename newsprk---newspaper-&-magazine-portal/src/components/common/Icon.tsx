import React from 'react';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name = '', className = '', ...props }) => {
  const cleanName = name.startsWith('fa-') ? name.slice(3) : name;
  return <i {...props} className={`fa fa-${cleanName} ${className}`.trim()} />;
};

export default Icon;
