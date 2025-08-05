import React from 'react';
import './AboutUs.css';
import teaEstateImage from '../components/images/about1.jpg';
import aboutBannerImage from '../components/images/about3.jpg';
import aboutGroupImage from '../components/images/about4.jpg';
import OurPlantationsSection from './OurPlantationsSection';

function AboutUs() {
  return (
    <div className="about-container">
      <div className="about-banner-image">
        <img src={aboutBannerImage} alt="About Us Banner" />
        <div className="banner-text">
          <h1>About Us</h1>
          <p>
            Since our beginning, we've passionately pursued quality, sustainability, and excellence in everything we create.
          </p>
        </div>
      </div>
      <div className="about-content">
        <h2>The Browns TEA Story</h2>
        <p>
          Simple ideas can make dreams come true — and our story began just like that: with a steaming cup of fine tea.
          Browns TEA was born from a small group of Sri Lankan tea lovers determined to share the best pure Ceylon tea with the world.
        </p>

        <div className="about-section">
          <img src={teaEstateImage} alt="Tea Estate" className="about-image" />
          <div>
            <p>
              Supplying the finest Ceylon tea to the world started as a dream by passionate local growers. 
              Today, Browns TEA proudly exports premium tea to over 50 countries, maintaining strict quality standards 
              from leaf to cup.
            </p>
            <p>
              With over 12,000 hectares of lush tea gardens and 40+ state-of-the-art factories, we ensure every sip 
              delivers the taste and purity Ceylon tea is renowned for.
            </p>
            <p>
              Our blends feature distinctive, handpicked flavors, offering aromatic and organic varieties infused with
              Ayurvedic ingredients for discerning customers.
            </p>
            <p>
              Welcome to Browns TEA — where every cup tells a story.
            </p>
          </div>
        </div>
      </div>
      
      {/* Mission & Vision */}
      <div className="mv-section">
        <div className="mv-box">
          <h3>OUR MISSION</h3>
          <p>To be the preferred and most reliable tea exporter in Sri Lanka, upholding quality, sustainability, and trust in every leaf.</p>
        </div>
        <div className="mv-box">
          <h3>OUR VISION</h3>
          <p>To add value to our products and services through innovation and integrity, ensuring long-term growth while caring for all our stakeholders.</p>
        </div>
      </div>

      {/* Values */}
      <div className="values-section">
        <h2>OUR VALUES</h2>
        <div className="values-list">
          <div className="value-item">
            <div className="value-icon">🔰</div>
            <h4>INTEGRITY</h4>
            <p>We are responsible in all our activities to the environment, our customers, and our staff.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🤝</div>
            <h4>RELIABILITY</h4>
            <p>We strive to be a company our customers, staff, and communities can rely on and trust.</p>
          </div>
          <div className="value-item">
            <div className="value-icon">🌱</div>
            <h4>SOCIAL RESPONSIBILITY</h4>
            <p>We take responsibility within our wider community and deliver positive benefits that enrich lives.</p>
          </div>
        </div>
      </div>

      {/* About Browns Group */}
      <div className="group-section">
        <div className="group-text">
          <h2>About Browns Group</h2>
          <p>
            Browns Plantations is the result of a unique synergy between three leading Sri Lankan plantation companies, consolidating over 32 hectares of lush estates. With a legacy of excellence, Browns Group leads the way in sustainable tea cultivation, innovative practices, and community empowerment. Our vision is to set the benchmark for quality and responsibility in the tea industry, both locally and globally.<br /><br />
            We are committed to responsible stewardship, supporting our communities, and delivering the finest Ceylon tea to the world. Our group's strength lies in its diversity, expertise, and unwavering dedication to sustainable growth and customer satisfaction.
          </p>
        </div>
        <div className="group-image">
          <img src={aboutGroupImage} alt="Browns Group" />
        </div>
      </div>

      
      <OurPlantationsSection />
    </div>
  );
}

export default AboutUs;
