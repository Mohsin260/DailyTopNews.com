import Link from 'next/link';

interface BreadcrumbProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ title, className = '', children }) => {
  return (
    <div className={`inner_table ${className}`}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="bridcrumb">
              <Link href="/">Home</Link> / {title}
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Breadcrumb;
