import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from '../components/common/Breadcrumb';
import { Icon } from '../components/common/Icon';
import TabWidget from '../components/Sidebar/TabWidget';
import TrendingNewsWidget from '../components/Sidebar/TrendingNewsWidget';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import FollowUs from '../components/Sidebar/FollowUs';
import LatestBlogSection from '../components/Post/LatestBlogSection';
import CommentsSection from '../components/Post/CommentsSection';
import BottomBannerArea from '../components/common/BottomBannerArea';
import { quoteIconBase64 } from '../data/base64Assets';

export const PostDetailsPage: React.FC = () => {
  return (
    <div className="archives post post1">
      <Breadcrumb className="shadow5 padding-top-30" title="Archive / post 1" />
      <span className="space-30" />
      <div className="container">
        <div className="row">
          <div className="col-md-6 col-lg-8">
            <div className="row">
              <div className="col-6 align-self-center">
                <div className="page_category">
                  <h4>HEALTH</h4>
                </div>
              </div>
              <div className="col-6 text-right">
                <div className="page_comments">
                  <ul className="inline">
                    <li>
                      <Icon name="comment" /> 563
                    </li>
                    <li>
                      <Icon name="fire" /> 563
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-30" />

            <div className="single_post_heading">
              <h1>Japan’s virus success has puzzled the world. Is its luck running out?</h1>
              <div className="space-10" />
              <p>
                The property, complete with 30-seat screening from room, a 100-seat amphitheater and
                a swimming pond with sandy shower…
              </p>
            </div>

            <div className="space-40" />
            <img src="/assets/s-post-1-D2oF6sU9.jpg" alt="thumb" />
            <div className="space-20" />

            <div className="row">
              <div className="col-lg-6 align-self-center">
                <div className="author">
                  <div className="author_img">
                    <div className="author_img_wrap">
                      <img src="/assets/author2-CSlD6d0V.png" alt="author2" />
                    </div>
                  </div>
                  <Link to="/">Shuvas Chandra</Link>
                  <ul>
                    <li>
                      <Link to="/">March 26, 2020</Link>
                    </li>
                    <li>Updated 1:58 p.m. ET</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="author_social inline text-right">
                  <ul>
                    <li>
                      <Link to="/">
                        <Icon name="instagram" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Icon name="facebook-f" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Icon name="youtube-play" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/">
                        <Icon name="twitter" />
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="space-20" />
            <p className="font_mian">
              The property, complete with 30-seat screening from room, a 100-seat amphitheater and a
              swimming pond with sandy shower, is for sale.
              <br />
              <br />
              There are also arguments about how pathogens are transmitted through the air, what
              distance people should keep themselves from each other, and whether masks are useful
              when used by the public.
              <br />
              <br />
              Masks may also help lower the risk of individuals catching the virus through the
              droplets from another person’s sneeze or a cough - and people can be taught how put
              masks on and take them off correctly, they argue.
            </p>

            <div className="space-40" />

            <div className="points_bar border_black">
              <div className="row">
                <div className="col-md-5">
                  <img src="/assets/qoute-1-C18y2Pee.jpg" alt="quote" />
                </div>
                <div className="col-md-7">
                  <div className="qhote">
                    <img src={quoteIconBase64} alt="quote" />
                    <p>
                      I must explain to you how all this mistake idea denouncing pleasure and praising
                      pain was born and I will give you a complete account of the system, and
                      expound the actual teachings of the great explorer of the truth, the
                      master-builder of human happiness. .
                    </p>
                    <div className="author">
                      <div className="author_img">
                        <div className="author_img_wrap">
                          <img src="/assets/author2-CSlD6d0V.png" alt="author2" />
                        </div>
                      </div>
                      <Link to="/">Shuvas Chandra</Link>
                      <ul>
                        <li>Founder at Seative Digital</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-40" />

            <p className="font_mian">
              The property, complete with 30-seat screening from room, a 100-seat amphitheater and a
              swimming pond with sandy shower, is for sale.
              <br />
              <br />
              There are also arguments about how pathogens are transmitted through the air, what
              distance people should keep themselves from each other, and whether masks are useful
              when used by the public.
            </p>

            <div className="space-40" />
            <h3>Which states are not in lockdown?</h3>
            <div className="space-20" />
            <p className="font_mian">
              Both the relaxations, that have been given to certain businesses from April 20, and the
              plan for graded exit have to be seen against the overarching context of need to give a
              fillip to economic activity without compromising the primary objective of containing
              the coronavirus infection.
            </p>

            <div className="space-40" />
            <img src="/assets/s-post-2-CN7Q8l7K.jpg" alt="big1" />
            <p className="img_desc">
              <span>I just had a baby - now I’m going to the frontline.</span>
            </p>

            <div className="space-40" />
            <p className="font_mian">
              Both the relaxations, that have been given to certain businesses from April 20, and the
              plan for graded exit have to be seen against the overarching context of need to give a
              fillip to economic activity without compromising the primary objective of containing
              the coronavirus infection.
            </p>

            <div className="space-40" />
            <img src="/assets/s-post-3-q7oN2qN3.jpg" alt="big2" />

            <div className="space-40" />
            <div className="tags">
              <ul className="inline">
                <li className="tag_list">
                  <Icon name="tag" /> tags
                </li>
                <li>
                  <Link to="/">Health</Link>
                </li>
                <li>
                  <Link to="/">World</Link>
                </li>
                <li>
                  <Link to="/">Corona</Link>
                </li>
              </ul>
            </div>

            <div className="space-40" />
            <div className="border_black" />
            <div className="space-40" />

            <div className="next_prev">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="next_prv_single border_left3">
                    <p>PREVIOUS NEWS</p>
                    <h3>
                      <Link to="/">
                        Kushner puts himself in middle of white house’s chaotic coronavirus response.
                      </Link>
                    </h3>
                  </div>
                </div>
                <div className="col-lg-6 align-self-center">
                  <div className="next_prv_single border_left3">
                    <p>NEXT NEWS</p>
                    <h3>
                      <Link to="/">
                        C.I.A. Hunts for authentic virus totals in china, dismissing government tallies
                      </Link>
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-4">
            <TabWidget />
            <TrendingNewsWidget />
            <NewsletterWidget />
            <FollowUs title="Follow Us" />
            <div className="banner2 mb30">
              <Link to="/">
                <img src="/assets/banner-2-zRgCfOgB.jpg" alt="thumb" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="space-60" />
      <LatestBlogSection dark={true} />
      <div className="space-60" />
      <CommentsSection dark={true} />
      <div className="space-60" />
      <BottomBannerArea className="parimay_bg padding5050" />
      <div className="space-30" />
    </div>
  );
};

export default PostDetailsPage;
