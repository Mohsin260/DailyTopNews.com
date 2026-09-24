import AdSlot from '@/components/ui/AdSlot';

interface BannerWidgetProps {
  className?: string;
  pageType?: 'homepage' | 'article' | 'category' | 'website';
}

export const BannerWidget: React.FC<BannerWidgetProps> = ({
  className = '',
  pageType = 'homepage',
}) => {
  return (
    <AdSlot
      pageType={pageType}
      position="sidebar-rectangle"
      width="350px"
      height="280px"
      responsive
      fullWidth
      wrapperClassName={`banner2 mb30 ${className}`}
    />
  );
};

export default BannerWidget;
