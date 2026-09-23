import React from 'react';
import { Link } from 'react-router-dom';
import { upcomingMatches } from '../../data/newsData';

interface UpcomingMatchesProps {
  dark?: boolean;
}

export const UpcomingMatches: React.FC<UpcomingMatchesProps> = ({ dark = false }) => {
  return (
    <div className="widget upcomming_macth mb30">
      <div className="row">
        <div className="col-8 align-self-center">
          <h2 className="widget-title">Upcoming Matches</h2>
        </div>
        <div className="col-4 text-right align-self-center">
          <Link to="#" className="see_all mb20">
            See All
          </Link>
        </div>
      </div>
      {upcomingMatches.map((item, idx) => (
        <div key={idx}>
          <div className="single_post post_type13 widgets_small">
            <div className="post_img">
              <Link to="/">
                <img src={item.image} alt="icon" />
              </Link>
            </div>
            <div className="single_post_text">
              <h4>
                <Link to="/" className="playing_teams">
                  {item.countries.map((country, cIdx) => (
                    <span key={cIdx}>
                      {country} {cIdx + 1 < item.countries.length ? <span>VS &nbsp;</span> : null}
                    </span>
                  ))}
                </Link>
              </h4>
              <p className="meta macth_meta">
                {item.date} &nbsp;|&nbsp;
                <span> {item.time} </span>
                &nbsp;
              </p>
            </div>
            <div className="circle_match_time" style={{ maxWidth: '45px', padding: '5px' }}>
              <svg viewBox="0 0 36 36" style={{ width: '100%', height: '100%' }}>
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgb(233, 234, 238)"
                  strokeWidth="3.8"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="#FF5555"
                  strokeWidth="3.8"
                  strokeDasharray="34.4, 100"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
          <div className="space-10" />
          {dark ? <div className="border_white" /> : <div className="border_black" />}
          <div className="space-10" />
        </div>
      ))}
    </div>
  );
};

export default UpcomingMatches;
