import React, { useState } from 'react';
import { Icon } from '../components/common/Icon';
import FollowUs from '../components/Sidebar/FollowUs';
import NewsletterWidget from '../components/Sidebar/NewsletterWidget';
import BottomBannerArea from '../components/common/BottomBannerArea';
import { scrollIconBase64, phoneIconBase64 } from '../data/base64Assets';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    email: '',
    phone: '',
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
      setFormData({ name: '', subject: '', email: '', phone: '', message: '' });
      setTimeout(() => setSubmitted(false), 4000);
    }
  };

  return (
    <>
      <div className="inner inner_bg inner_overlay">
        <div className="container">
          <div className="inner_wrap">
            <div className="row">
              <div className="col-lg-6">
                <div className="title_inner">
                  <h6>CONTACT US</h6>
                  <h1>let's Contact</h1>
                </div>
              </div>
            </div>
            <div className="inner_scroll">
              <div className="scrollIcon">
                <img src={scrollIconBase64} alt="scrollIcon" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contacts section-padding">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <div className="box single_contact_box">
                <div className="contact_title">
                  <h3>Headquarters</h3>
                </div>
                <div className="contact_details">
                  <div className="contact_details_icon">
                    <Icon name="map-marker-alt" />
                  </div>
                  <p>LOCATION:</p>
                  <h6>44 Canal Center Plaza #200 Alexandria, VA 22314, USA</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box single_contact_box">
                <div className="contact_title">
                  <h3>Headquarters</h3>
                </div>
                <div className="contact_details">
                  <div className="contact_details_icon">
                    <img src={phoneIconBase64} alt="black_phone" />
                  </div>
                  <p>LOCATION:</p>
                  <h6>44 Canal Center Plaza #200 Alexandria, VA 22314, USA</h6>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box single_contact_box">
                <div className="contact_title">
                  <h3>Headquarters</h3>
                </div>
                <div className="contact_details">
                  <div className="contact_details_icon">
                    <Icon name="envelope" />
                  </div>
                  <p>LOCATION:</p>
                  <h6>44 Canal Center Plaza #200 Alexandria, VA 22314, USA</h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="contact_form padding-bottom">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="map">
                <iframe
                  title="map"
                  frameBorder={0}
                  height="450px"
                  width="100%"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.9147703055!2d-74.11976314309273!3d40.69740344223377!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew+York%2C+NY%2C+USA!5e0!3m2!1sen!2sbd!4v1547528325671"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="space-50" />

          <div className="row">
            <div className="col-lg-8">
              <div className="cotact_form">
                <div className="row">
                  <div className="col-12">
                    <h3>
                      Let’s work together! <br /> Fill out the form.
                    </h3>
                  </div>
                  <div className="col-12">
                    <form onSubmit={submitHandler}>
                      <div className="row">
                        <div className="col-lg-6">
                          <input
                            name="name"
                            value={formData.name}
                            onChange={changeHandler}
                            type="text"
                            placeholder="Full Name"
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            name="subject"
                            value={formData.subject}
                            onChange={changeHandler}
                            type="text"
                            placeholder="Subject"
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            name="email"
                            value={formData.email}
                            onChange={changeHandler}
                            type="email"
                            placeholder="Email Adress"
                            required
                          />
                        </div>
                        <div className="col-lg-6">
                          <input
                            name="phone"
                            value={formData.phone}
                            onChange={changeHandler}
                            type="number"
                            placeholder="Phone Number"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={changeHandler}
                            id="message"
                            cols={30}
                            rows={5}
                            placeholder="Tell us about your message…"
                            required
                          />
                        </div>
                        <div className="col-12">
                          <div className="space-20" />
                          <button className="cbtn1" type="submit">
                            Sent Messege
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
              </div>
            </div>

            <div className="col-lg-4">
              <FollowUs title="Follow Us" />
              <NewsletterWidget />
            </div>
          </div>
        </div>
      </div>
      <BottomBannerArea />
    </>
  );
};

export default ContactPage;
