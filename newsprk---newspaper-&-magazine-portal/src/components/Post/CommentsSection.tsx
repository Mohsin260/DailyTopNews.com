import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface CommentsSectionProps {
  dark?: boolean;
  theme?: number;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({ dark = false, theme }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const changeHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="comment_form">
      <div className="container">
        <div className="row">
          <div className="col-12 col-lg-10 m-auto">
            <form onSubmit={submitHandler}>
              <div className="row">
                <div className="col-md-6">
                  <input
                    value={formData.name}
                    name="name"
                    onChange={changeHandler}
                    type="text"
                    placeholder="Full name"
                    required
                  />
                </div>
                <div className="col-md-6">
                  <input
                    value={formData.email}
                    name="email"
                    onChange={changeHandler}
                    type="text"
                    placeholder="Email address"
                    required
                  />
                </div>
                <div className="col-12">
                  <textarea
                    value={formData.message}
                    onChange={changeHandler}
                    name="message"
                    id="message"
                    cols={30}
                    rows={5}
                    placeholder="Tell us about your opinion…"
                    required
                  />
                </div>
                <div className="col-12">
                  <button
                    className={theme === 3 ? 'cbtn4' : 'cbtn2'}
                    type="submit"
                  >
                    POST OPINION
                  </button>
                  {submitted && (
                    <span style={{ marginLeft: 15, color: '#4CAF50' }}>
                      You submitted the form and stuff!
                    </span>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="space-60" />

        <div className="comment_list">
          <div className="row">
            <div className="col-12 col-lg-10 m-auto">
              <h3>Our latest news</h3>
              <div className="single_comment">
                <div className="comment_img">
                  <img src="/assets/comments-1-CECU4M-l.png" alt="author2" />
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Link to="/">QuomodoSoft</Link>
                  </div>
                  <div className="col-sm-6">
                    <div className="replay text-right">
                      <p style={{ cursor: 'pointer' }}>replay</p>
                    </div>
                  </div>
                </div>
                <div className="space-5" />
                <p>
                  We’ve invested every aspect of how we serve our users over the past Pellentesque
                  rutrum ante in nulla suscipit, vel posuere leo tristique.
                </p>
              </div>

              <div className="space-15" />
              {dark ? <div className="border_white" /> : <div className="border_black" />}
              <div className="space-15" />

              <div className="single_comment">
                <div className="comment_img">
                  <img src="/assets/comments-1-CECU4M-l.png" alt="author2" />
                </div>
                <div className="row">
                  <div className="col-sm-6">
                    <Link to="/">QuomodoSoft</Link>
                  </div>
                  <div className="col-sm-6">
                    <div className="replay text-right">
                      <p style={{ cursor: 'pointer' }}>replay</p>
                    </div>
                  </div>
                </div>
                <div className="space-5" />
                <p>
                  We’ve invested every aspect of how we serve our users over the past Pellentesque
                  rutrum ante in nulla suscipit, vel posuere leo tristique.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
