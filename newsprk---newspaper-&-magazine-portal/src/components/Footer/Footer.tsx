import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { logoDark } from '../../data/newsData';
import { Icon } from '../common/Icon';
import Copyright from './Copyright';

interface FooterProps {
  className?: string;
}

const twitterFeeds = [
  {
    title:
      'Cyber Monday Sale, Save 33% on Jannah theme during our year-end Sale, Purchase a new license for your next project',
    linkText: '@newspark #TECHNOLOGY https://dribbble.com/subash_chandra',
    date: 'March 26, 2020',
  },
  {
    title:
      'Cyber Monday Sale, Save 33% on Jannah theme during our year-end Sale, Purchase a new license for your next project',
    linkText: '@newspark #TECHNOLOGY https://dribbble.com/subash_chandra',
    date: 'March 26, 2020',
  },
];

const extraNews = [
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
  {
    category: 'TECHNOLOGY',
    date: 'March 26, 2020',
    title: 'Nancy zhang a chinese busy woman and dhaka',
  },
];

const mobileIcon =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAZCAYAAAABmx/yAAAABHNCSVQICAgIfAhkiAAAAJNJREFUOE/tlMsRgkAQBftFoCGYgYZACBqBZAJEgEakZqIZmMGjxpIquc3KjWLP2zWf3deyXQM9sCV3nsBJtt9AK+mS4Wy3QBWgJSkDxR3bFXD7gMA9C3';

export const Footer: React.FC<FooterProps> = ({ className = '' }) => {
  const [email, setEmail] = useState('');

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className={`footer footer_area1 ${className}`}>
      <div className="container">
        <div className="cta">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <div className="footer_logo logo">
                <Link to="/">
                  <img src={logoDark} alt="logo" />
                </Link>
              </div>
              <div className="social2">
                <ul className="inline">
                  <li>
                    <Link to="#">
                      <Icon name="twitter" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <Icon name="facebook-f" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <Icon name="youtube-play" />
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      <Icon name="instagram" />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6 col-lg-4 offset-lg-2 align-self-center">
              <div className="signup_form">
                <form onSubmit={handleSignup}>
                  <input
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    className="signup"
                    type="email"
                    placeholder="Your email address"
                    required
                  />
                  <button type="submit" className="cbtn">
                    sign up
                  </button>
                </form>
                <p>We hate spam as much as you do</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border_white" />
        <div className="space-40" />

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-sm-6 col-lg">
                <div className="single_footer_nav border_white_right">
                  <h3 className="widget-title">News categories</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <Link to="/">Politics</Link>
                        </li>
                        <li>
                          <Link to="/">Business</Link>
                        </li>
                        <li>
                          <Link to="/">TECHNOLOGY</Link>
                        </li>
                        <li>
                          <Link to="/">Science</Link>
                        </li>
                        <li>
                          <Link to="/">Health</Link>
                        </li>
                        <li>
                          <Link to="/">Sports</Link>
                        </li>
                        <li>
                          <Link to="/">Entertainment</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <Link to="/">Education</Link>
                        </li>
                        <li>
                          <Link to="/">Obituaries</Link>
                        </li>
                        <li>
                          <Link to="/">Corrections</Link>
                        </li>
                        <li>
                          <Link to="/">Education</Link>
                        </li>
                        <li>
                          <Link to="/">Today’s Paper</Link>
                        </li>
                        <li>
                          <Link to="/">Corrections</Link>
                        </li>
                        <li>
                          <Link to="/">Foods</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg">
                <div className="single_footer_nav">
                  <h3 className="widget-title2">Living</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <Link to="/">Crossword</Link>
                        </li>
                        <li>
                          <Link to="/">Food</Link>
                        </li>
                        <li>
                          <Link to="/">Automobiles</Link>
                        </li>
                        <li>
                          <Link to="/">Education</Link>
                        </li>
                        <li>
                          <Link to="/">Health</Link>
                        </li>
                        <li>
                          <Link to="/">Magazine</Link>
                        </li>
                        <li>
                          <Link to="/">Weddings</Link>
                        </li>
                      </ul>
                    </div>
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <Link to="/">Classifieds</Link>
                        </li>
                        <li>
                          <Link to="/">Photographies</Link>
                        </li>
                        <li>
                          <Link to="/">NYT Store</Link>
                        </li>
                        <li>
                          <Link to="/">Journalisms</Link>
                        </li>
                        <li>
                          <Link to="/">Public Editor</Link>
                        </li>
                        <li>
                          <Link to="/">Tools & Services</Link>
                        </li>
                        <li>
                          <Link to="/">My Account</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-40" />
            <div className="border_white" />
            <div className="space-40" />

            <div className="row">
              <div className="col-sm-6 col-lg-5">
                <div className="single_footer_nav border_white_right">
                  <h3 className="widget-title2">Opinion</h3>
                  <div className="row">
                    <div className="col-lg-6">
                      <ul>
                        <li>
                          <Link to="/">Today’s Opinion</Link>
                        </li>
                        <li>
                          <Link to="/">Op-Ed Contributing</Link>
                        </li>
                        <li>
                          <Link to="/">Contributing Writers</Link>
                        </li>
                        <li>
                          <Link to="/">Business News</Link>
                        </li>
                        <li>
                          <Link to="/">Collections</Link>
                        </li>
                        <li>
                          <Link to="/">Today’s Paper</Link>
                        </li>
                        <li>
                          <Link to="/">Saturday Review</Link>
                        </li>
                        <li>
                          <Link to="/">Product Review</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-7">
                <div className="twitter_feeds">
                  <h3 className="widget-title2">Twitter feed</h3>
                  {twitterFeeds.map((feed, idx) => (
                    <div key={idx} className="single_twitter_feed border_white_bottom">
                      <div className="twitter_feed_icon">
                        <Icon name="twitter" />
                      </div>
                      <h6>
                        {feed.title}… <span>{feed.linkText}</span>
                      </h6>
                      <p>{feed.date}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Col-4 */}
          <div className="col-lg-4">
            <div className="extra_newss border_white_left pl-4">
              <h3 className="widget-title2">More news</h3>
              {extraNews.map((item, idx) => (
                <div key={idx} className="single_extra_news border_white_bottom">
                  <p>
                    {item.category} <span> / {item.date}</span>
                  </p>
                  <Link to="/">{item.title}</Link>
                  <span className="news_counter">{idx + 1}</span>
                </div>
              ))}
              <div className="space-40" />
              <div className="border_white_bottom" />
              <div className="space-40" />

              <div className="footer_contact">
                <h3 className="widget-title2">Newspark news services</h3>
                <div className="single_fcontact">
                  <div className="fcicon">
                    <img src={mobileIcon} alt="mobile" />
                  </div>
                  <Link to="/">On your mobile</Link>
                </div>
                <div className="single_fcontact">
                  <div className="fcicon">
                    <Icon name="volume-up" />
                  </div>
                  <Link to="/">On smart speakers</Link>
                </div>
                <div className="single_fcontact">
                  <div className="fcicon">
                    <Icon name="envelope-o" />
                  </div>
                  <Link to="/">Contact Newspark news</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Copyright />
    </div>
  );
};

export default Footer;
