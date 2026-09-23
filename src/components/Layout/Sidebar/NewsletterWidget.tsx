'use client';

import { useState } from 'react';

interface NewsletterWidgetProps {
  className?: string;
  input_white?: boolean;
  titleClass?: string;
}

export const NewsletterWidget: React.FC<NewsletterWidgetProps> = ({
  className = '',
  input_white = false,
  titleClass = '',
}) => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      alert(`Thank you for subscribing: ${email}`);
      setEmail('');
    }
  };

  return (
    <div className={`box widget news_letter mb30 ${className}`}>
      <h2 className={`widget-title ${titleClass}`}>News Letter</h2>
      <p>Your email address will not be this published. Required fields are News Today.</p>
      <div className="space-20" />
      <div className="signup_form">
        <form onSubmit={handleSubscribe}>
          <input
            className={`signup ${input_white ? 'white_bg' : ''}`}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
          />
          <button type="submit" className="cbtn">
            sign up
          </button>
        </form>
        <div className="space-10" />
        <p>We hate spam as much as you do</p>
      </div>
    </div>
  );
};

export default NewsletterWidget;
