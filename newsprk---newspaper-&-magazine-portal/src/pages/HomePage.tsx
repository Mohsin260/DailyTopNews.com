import React from 'react';
import { Link } from 'react-router-dom';
import TrendingCarousel from '../components/TrendingCarousel/TrendingCarousel';
import GallerySection from '../components/GallerySection/GallerySection';
import FeatureNews from '../components/FeatureNews/FeatureNews';
import TrendingNews from '../components/TrendingNews/TrendingNews';
import FollowUs from '../components/Sidebar/FollowUs';
import MostViewed from '../components/Sidebar/MostViewed';
import MixArea from '../components/MixArea/MixArea';
import VideoNews from '../components/VideoNews/VideoNews';
import EntertainmentNews from '../components/Entertainment/EntertainmentNews';
import SportsNews from '../components/Sports/SportsNews';
import BusinessNews from '../components/Business/BusinessNews';
import MostShared from '../components/Sidebar/MostShared';
import UpcomingMatches from '../components/Sidebar/UpcomingMatches';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import CategoriesWidget from '../components/Sidebar/CategoriesWidget';
import BannerWidget from '../components/Sidebar/BannerWidget';
import { bannerMiddle, businessPosts, entertainmentPosts } from '../data/newsData';

interface HomePageProps {
  dark?: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({ dark = false }) => {
  return (
    <>
      <TrendingCarousel className="fifth_bg" />
      <GallerySection className="fifth_bg" dark={dark} />
      <FeatureNews />
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <TrendingNews dark={dark} />
          </div>
          <div className="col-md-12 col-lg-4">
            <FollowUs title="Follow Us" />
            <MostViewed dark={dark} />
          </div>
        </div>
      </div>
      <MixArea className="half_bg1" dark={dark} />
      <VideoNews className="pt30 half_bg60" dark={dark} />
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
              <SportsNews dark={dark} />
              <div className="banner_area mt50 mb60 xs-mt60">
                <Link to="/">
                  <img src={bannerMiddle} alt="banner1" />
                </Link>
              </div>
              <BusinessNews businessNews={businessPosts} />
            </div>
            <div className="col-lg-4">
              <div className="row">
                <div className="col-lg-12">
                  <MostShared title="Most share" dark={dark} />
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
    </>
  );
};

export default HomePage;
