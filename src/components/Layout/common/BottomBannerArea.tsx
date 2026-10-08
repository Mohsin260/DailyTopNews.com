import AdSlot from '@/components/ui/AdSlot';

interface BottomBannerAreaProps {
  className?: string;
}

export const BottomBannerArea: React.FC<BottomBannerAreaProps> = ({ className }) => {
  return (
    <div className={className || 'padding5050 fourth_bg'}>
      <div className="container">
        <div className="row">
          <div className="col-lg-8 m-auto">
            <div className="banner1">
              <AdSlot
                pageType="website"
                position="above-footer"
                width="728px"
                height="90px"
                responsive
                fullWidth
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBannerArea;
