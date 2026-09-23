'use client';

interface IconProps extends React.HTMLAttributes<HTMLElement> {
  name?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ name = '', className = '', ...props }) => {
  return <i {...props} className={`fa fa-${name} ${className}`.trim()} />;
};

export default Icon;
