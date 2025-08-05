import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TeaCollection.css';

const TeaCollection = () => {
  const navigate = useNavigate();

  const featuredProducts = [
    {
      id: 'pure-green',
      title: 'Pure Green Tea',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '$12.99',
      weight: '100g'
    },
    {
      id: 'ceylon-mango',
      title: 'Ceylon Black Tea with Mango',
      image: 'https://images.unsplash.com/photo-1547825407-2d060104b7f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '$14.99',
      weight: '100g'
    },
    {
      id: 'sencha',
      title: 'Sencha Green Tea',
      image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '$16.99',
      weight: '100g'
    },
    {
      id: 'cinnamon-spice',
      title: 'Cinnamon Spice Tea',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
      price: '$13.99',
      weight: '100g'
    }
  ];

  const teaTypes = [
    {
      id: 'earl-grey',
      title: 'Earl Grey',
      description: 'A classic black tea flavored with bergamot oil, offering a distinctive citrus aroma and smooth taste.',
      image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'english-breakfast',
      title: 'English Breakfast',
      description: 'A robust blend of black teas, perfect for starting your day with a rich, full-bodied flavor.',
      image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'orange-pekoe',
      title: 'Orange Pekoe',
      description: 'A high-quality black tea with a delicate flavor and golden color, known for its smooth taste.',
      image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'broken-orange-pekoe',
      title: 'Broken Orange Pekoe',
      description: 'A stronger version of Orange Pekoe with broken leaves, offering a more intense flavor.',
      image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'ceylon-mango',
      title: 'Ceylon Black Tea with Mango',
      description: 'A delightful blend of Ceylon black tea infused with sweet mango flavor.',
      image: 'https://images.unsplash.com/photo-1547825407-2d060104b7f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'cinnamon-spice',
      title: 'Cinnamon Spice Tea',
      description: 'A warming blend of black tea with cinnamon and spices, perfect for cozy moments.',
      image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'pure-green',
      title: 'Pure Green Tea',
      description: 'A traditional green tea with a fresh, grassy flavor and numerous health benefits.',
      image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'sencha',
      title: 'Sencha Green Tea',
      description: 'A premium Japanese green tea with a refreshing taste and vibrant green color.',
      image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'silver-tips-green',
      title: 'Silver Tips Green Tea',
      description: 'An exquisite green tea made from young tea buds, offering a delicate and sweet flavor.',
      image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    },
    {
      id: 'silver-tips-white',
      title: 'Silver Tips White Tea',
      description: 'A rare white tea made from the finest young tea buds, known for its subtle and complex flavor.',
      image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
    }
  ];

  const handleTeaClick = (teaId) => {
    navigate(`/tea/${teaId}`);
  };

  return (
    <div className="tea-collection">
      <div className="hero-section">
        <h1>Our Tea Collection</h1>
        <p>A diverse range of premium quality teas</p>
      </div>

      <div className="collection-intro">
        <p>
          Discover our exquisite selection of premium teas, carefully sourced from the finest tea gardens around the world. Each variety offers a unique taste experience, from classic black teas to delicate white teas.
        </p>
      </div>

      <div className="tea-categories">
        {teaTypes.map((tea) => (
          <div key={tea.id} className="tea-category-card">
            <div className="category-image">
              <img src={tea.image} alt={tea.title} />
            </div>
            <div className="category-content">
              <h3>{tea.title}</h3>
              <p>{tea.description}</p>
              <button 
                className="explore-btn"
                onClick={() => handleTeaClick(tea.id)}
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="featured-products">
        <h2>Featured Products</h2>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-info">
                <h3>{product.title}</h3>
                <div className="product-details">
                  <span className="price">{product.price}</span>
                  <span className="weight">{product.weight}</span>
                </div>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleTeaClick(product.id)}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeaCollection; 