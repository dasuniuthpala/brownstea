import React, { useState, useEffect } from 'react';
import './MainContent.css';
// Import all banner images
import h1Image from './images/h1.jpg';
import h2Image from './images/h2.jpg';
import h3Image from './images/h3.jpg';
import h4Image from './images/h4.jpg';
import h5Image from './images/h5.jpg';
import h6Image from './images/h6.jpg';
// Import tea images
import greenTeaImage from './images/gtea.jpg';
import blackTeaImage from './images/btea.jpg';
import herbalTeaImage from './images/htea.jpg';
import whiteTeaImage from './images/wtea.jpg';
import cookingTeaImage from './images/ctea.jpg';
import chiliTeaImage from './images/chilitea.jpg';
import poster1 from './images/poster1.png';
import poster2 from './images/poster2.png';
import poster3 from './images/poster3.png';

// Define the features array
const features = [
  {
    icon: '🌱', // Replace with an actual icon if needed
    title: 'Sustainability',
    description: 'Our teas are sourced from sustainable plantations.',
  },
  {
    icon: '☕',
    title: 'Premium Quality',
    description: 'We ensure the highest quality in every blend.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Get your favorite teas delivered quickly to your doorstep.',
  },
];

const MainContent = () => {
  const images = [h1Image, h2Image, h3Image, h4Image, h5Image, h6Image]; // All images to rotate
  const [currentImage, setCurrentImage] = useState(images[0]); // Initial image

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length;
        return images[nextIndex];
      });
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  return (
    <main className="main-content">
      <section className="hero" style={{ backgroundImage: `url(${currentImage})` }}>
        <div className="hero-content">
          <h1>Browns Tea</h1>
          <p>Discover Nature's Finest Tea Selection</p>
          <p>Indulge in the rich heritage of Ceylon's finest leaves.</p>
          <p>Handpicked from the lush hills and valleys of Sri Lanka.</p>
          <p>Every sip delivers unmatched aroma, flavor, and warmth.</p>
          <p>From classic black to soothing green and herbal blends.</p>
          <p>Carefully crafted for tea lovers who value authenticity.</p>
          <p>Perfect for tranquil mornings or relaxing evening rituals.</p>
          <p>Experience the true essence of Browns Tea in every cup.</p>
        </div>
      </section>

      <section className="tea-variety">
        <h2>TEA VARIETY: ENTIRE UNIQUE SELECTION IN OUR CATALOG</h2>
        <div className="tea-grid">
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={greenTeaImage} alt="Green Tea" className="tea-image" />
            </div>
            <h3>Green Tea</h3>
            <p>$75.50</p>
          </div>
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={blackTeaImage} alt="Black Tea" className="tea-image" />
            </div>
            <h3>Black Tea</h3>
            <p>$78.00</p>
          </div>
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={herbalTeaImage} alt="Herbal Tea" className="tea-image" />
            </div>
            <h3>Herbal Tea</h3>
            <p>$67.50</p>
          </div>
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={whiteTeaImage} alt="White Tea" className="tea-image" />
            </div>
            <h3>White Tea</h3>
            <p>$88.50</p>
          </div>
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={cookingTeaImage} alt="Cooking Tea" className="tea-image" />
            </div>
            <h3>Cooking Tea</h3>
            <p>$89.50</p>
          </div>
          <div className="tea-card">
            <div className="tea-image-container">
              <img src={chiliTeaImage} alt="Chili Blender" className="tea-image" />
            </div>
            <h3>Chili Blender</h3>
            <p>$90.50</p>
          </div>
        </div>
      </section>

      <section className="featured-teas">
        <div className="tea-highlight">
          <h3>Royal English Breakfast</h3>
          <p>A warm and flavorful fresh blend, perfect for your morning routine. Unbeatable taste and recyclable packaging.</p>
        </div>
        <div className="tea-highlight">
          <h3>Earl Grey Elspacer</h3>
          <p>Featuring a smooth, aromatic bergamot flavor with a delicate balance. Perfect for any time of day.</p>
        </div>
        <div className="tea-highlight">
          <h3>Anson Gold Reserve</h3>
          <p>A premium selection for all occasions. Enjoy this delicious blend for breakfast or afternoon relaxation.</p>
        </div>
        <div className="tea-highlight">
          <h3>Dwieding Harmony</h3>
          <p>A natural blend with gluten-free ingredients and yogurt flavor. A rare and nutritious beverage for our valued customers.</p>
        </div>
      </section>

      <section className="poster-carousel">
        <div className="carousel-container">
          <div className="carousel-track">
            <div className="carousel-slide">
              <img src={poster1} alt="Special Offer 1" className="poster-img" />
            </div>
            <div className="carousel-slide">
              <img src={poster2} alt="Special Offer 2" className="poster-img" />
            </div>
            <div className="carousel-slide">
              <img src={poster3} alt="Special Offer 3" className="poster-img" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-emerald-50">
        <div className="container-custom">
          <h2 className="text-center mb-12">Why Choose Browns Tea?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-emerald-700">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

export default MainContent;