import Link from 'next/link';
import { upcomingMatches } from '@/data/config';

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
          <Link href="#" className="see_all mb20">
            See All
          </Link>
        </div>
      </div>
      {upcomingMatches.map((item, idx) => (
        <div key={idx}>
          <div className="single_post post_type13 widgets_small">
            <div className="post_img">
              <Link href="/">
                <img src={item.image} alt="icon" />
              </Link>
            </div>
            <div className="single_post_text">
              <h4>
                <Link href="/" className="playing_teams">
                  {item.countries.map((country, cIdx) => (
                    <div key={cIdx}>
                      {country} {cIdx + 1 < item.countries.length ? <span>VS &nbsp;</span> : null}
                    </div>
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
              <svg
                className="CircularProgressbar CircularProgressbarSt"
                viewBox="0 0 100 100"
                data-test-id="CircularProgressbar"
                style={{ width: '100%', height: '100%' }}
              >
                <path
                  className="CircularProgressbar-trail"
                  d="
      M 50,50
      m 0,-44
      a 44,44 0 1 1 0,88
      a 44,44 0 1 1 0,-88
    "
                  strokeWidth="12"
                  fillOpacity="0"
                  style={{
                    stroke: 'rgb(233, 234, 238)',
                    strokeLinecap: 'round',
                    transform: 'rotate(0.5turn)',
                    transformOrigin: 'center center',
                    strokeDasharray: '276.46px, 276.46px',
                    strokeDashoffset: '0px',
                  }}
                />
                <path
                  className="CircularProgressbar-path"
                  d="
      M 50,50
      m 0,-44
      a 44,44 0 1 1 0,88
      a 44,44 0 1 1 0,-88
    "
                  strokeWidth="12"
                  fillOpacity="0"
                  style={{
                    stroke: 'rgb(255, 85, 85)',
                    strokeLinecap: 'round',
                    transform: 'rotate(0.5turn)',
                    transformOrigin: 'center center',
                    transitionDuration: '0.5s',
                    strokeDasharray: '276.46px, 276.46px',
                    strokeDashoffset: '181.358px',
                  }}
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
