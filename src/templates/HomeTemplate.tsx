import TrendingCarousel from '@/components/Layout/sections/TrendingCarousel';
import GallerySection from '@/components/Layout/sections/GallerySection';
import FeatureNews from '@/components/Layout/sections/FeatureNews';
import TrendingNews from '@/components/Layout/sections/TrendingNews';
import FollowUs from '@/components/Layout/Sidebar/FollowUs';
import MostViewed from '@/components/Layout/Sidebar/MostViewed';
import MixArea from '@/components/Layout/sections/MixArea';
import VideoNews from '@/components/Layout/sections/VideoNews';
import EntertainmentNews from '@/components/Layout/sections/EntertainmentNews';
import SportsNews from '@/components/Layout/sections/SportsNews';
import BusinessNews from '@/components/Layout/sections/BusinessNews';
import MostShared from '@/components/Layout/Sidebar/MostShared';
import UpcomingMatches from '@/components/Layout/Sidebar/UpcomingMatches';
import NewsletterWidget from '@/components/Layout/Sidebar/NewsletterWidget';
import CategoriesWidget from '@/components/Layout/Sidebar/CategoriesWidget';
import BannerWidget from '@/components/Layout/Sidebar/BannerWidget';
import AdSlot from '@/components/ui/AdSlot';
import type { Article, Category } from '@/types';

interface HomePageProps {
  dark?: boolean;
  allArticles?: Article[];
  featuredPosts?: Article[];
  trendingPosts?: Article[];
  entertainmentPosts?: Article[];
  businessPosts?: Article[];
  sportsPosts?: Article[];
  latestPosts?: Article[];
  categories?: Category[];
}

export const HomePage: React.FC<HomePageProps> = ({
  dark = false,
  allArticles = [],
  featuredPosts = [],
  trendingPosts = [],
  entertainmentPosts = [],
  businessPosts = [],
  sportsPosts = [],
  latestPosts = [],
  categories = [],
}) => {
  const trendingCarouselPosts = trendingPosts.slice(0, 6);
  const trendingNewsCarousel = trendingPosts.slice(0, 3);
  const trendingNewsList = trendingPosts.slice(0, 6);
  const mostViewedPosts = trendingPosts.slice(0, 12);
  const mostSharedPosts = trendingPosts.slice(0, 10);
  const videoNewsFeatured = latestPosts.slice(0, 1);
  const videoNewsSidebar = latestPosts.slice(0, 10);
  const sportsFeatured = sportsPosts.slice(0, 1);
  const sportsSidebar = sportsPosts.slice(0, 6);

  return (
    <>
      {/* Top leaderboard: below header, above hero/trending sections */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="homepage"
              position="top-leaderboard"
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-30"
              afterSpaceClass="space-30"
            />
          </div>
        </div>
      </div>
      <TrendingCarousel className="fifth_bg" posts={trendingCarouselPosts} />
      <GallerySection className="fifth_bg" dark={dark} posts={allArticles} />
      <FeatureNews posts={featuredPosts} />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews
              dark={dark}
              carouselPosts={trendingNewsCarousel}
              listPosts={trendingNewsList}
            />
            <AdSlot
              pageType="homepage"
              position="in-content-1"
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-30"
            />
          </div>
          <div className="col-md-12 col-lg-4">
            <FollowUs title="Follow Us" />
            <MostViewed dark={dark} posts={mostViewedPosts} />
          </div>
        </div>
      </div>
      <MixArea className="half_bg1" dark={dark} posts={entertainmentPosts} />
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="homepage"
              position="video-section"
              width="728px"
              height="90px"
              responsive
              fullWidth
              beforeSpaceClass="space-30"
              afterSpaceClass="space-30"
            />
          </div>
        </div>
      </div>
      <VideoNews
        className="pt30 half_bg60"
        dark={dark}
        featuredPost={videoNewsFeatured[0]}
        posts={videoNewsSidebar}
      />
      <div className="entertrainments">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <div className="row">
                <div className="col-12">
                  <div className="heading">
                    <h2 className="widget-title">Entertrainment News</h2>
                  </div>
                </div>
              </div>
              <div className="entertrainment_carousel mb30">
                <div className="entertrainment_item">
                  <div className="row justify-content-center">
                    <EntertainmentNews entertainments={entertainmentPosts} />
                  </div>
                </div>
              </div>
              <SportsNews dark={dark} featuredPost={sportsFeatured[0]} posts={sportsSidebar} />
              <AdSlot
                pageType="homepage"
                position="mid-leaderboard"
                width="728px"
                height="90px"
                responsive
                fullWidth
                wrapperClassName="banner_area mt50 mb60 xs-mt60"
              />
              <BusinessNews businessNews={businessPosts} />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <MostShared title="Most share" dark={dark} posts={mostSharedPosts} />
                </div>
                <div className="col-lg-12">
                  <UpcomingMatches dark={dark} />
                </div>
                <div className="col-lg-12">
                  <NewsletterWidget />
                </div>
                <div className="col-lg-12">
                  <CategoriesWidget />
                </div>
                <div className="col-lg-12">
                  <BannerWidget />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-70" />
      {/* Bottom leaderboard: above the footer */}
      <div className="container">
        <div className="row">
          <div className="col-12">
            <AdSlot
              pageType="homepage"
              position="bottom-leaderboard"
              width="728px"
              height="90px"
              responsive
              fullWidth
            />
          </div>
        </div>
      </div>
      <div className="space-70" />
    </>
  );
};

export default HomePage;
