import Link from 'next/link';

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
              <Link href="/">
                <img src="/assets/banner-1-C4drpRxY.png" alt="bannerImg" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBannerArea;