import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TeaDetails.css';

const teaTypes = {
  'earl-grey': {
    title: 'Earl Grey',
    description: 'A classic black tea flavored with bergamot oil, offering a distinctive citrus aroma and smooth taste.',
    details: 'Our Earl Grey tea is made from premium black tea leaves infused with natural bergamot oil. The perfect balance of robust black tea and citrus notes makes it an ideal choice for afternoon tea.',
    brewing: 'Steep for 3-5 minutes in water at 95°C',
    image: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'english-breakfast': {
    title: 'English Breakfast',
    description: 'A robust blend of black teas, perfect for starting your day with a rich, full-bodied flavor.',
    details: 'A traditional blend of high-quality black teas from Assam, Ceylon, and Kenya. Known for its strong, full-bodied flavor that pairs perfectly with milk and sugar.',
    brewing: 'Steep for 4-5 minutes in boiling water',
    image: 'https://images.unsplash.com/photo-1587080413959-06b859fb107d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'orange-pekoe': {
    title: 'Orange Pekoe',
    description: 'A high-quality black tea with a delicate flavor and golden color, known for its smooth taste.',
    details: 'Made from the youngest leaves and buds, our Orange Pekoe offers a delicate flavor profile with subtle floral notes.',
    brewing: 'Steep for 3-4 minutes in water at 90°C',
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'broken-orange-pekoe': {
    title: 'Broken Orange Pekoe',
    description: 'A stronger version of Orange Pekoe with broken leaves, offering a more intense flavor.',
    details: 'The broken leaves release more flavor, creating a stronger brew while maintaining the delicate characteristics of Orange Pekoe.',
    brewing: 'Steep for 3-4 minutes in boiling water',
    image: 'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'ceylon-mango': {
    title: 'Ceylon Black Tea with Mango',
    description: 'A delightful blend of Ceylon black tea infused with sweet mango flavor.',
    details: 'Premium Ceylon black tea combined with natural mango flavor creates a tropical twist on a classic.',
    brewing: 'Steep for 3-4 minutes in water at 95°C',
    image: 'https://images.unsplash.com/photo-1547825407-2d060104b7f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'cinnamon-spice': {
    title: 'Cinnamon Spice Tea',
    description: 'A warming blend of black tea with cinnamon and spices, perfect for cozy moments.',
    details: 'A comforting blend of black tea, cinnamon, and warming spices that\'s perfect for cold days.',
    brewing: 'Steep for 4-5 minutes in boiling water',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'pure-green': {
    title: 'Pure Green Tea',
    description: 'A traditional green tea with a fresh, grassy flavor and numerous health benefits.',
    details: 'Sourced from the finest tea gardens, our pure green tea is rich in antioxidants and offers a refreshing taste.',
    brewing: 'Steep for 2-3 minutes in water at 80°C',
    image: 'https://images.unsplash.com/photo-1556881286-fc6915169721?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'sencha': {
    title: 'Sencha Green Tea',
    description: 'A premium Japanese green tea with a refreshing taste and vibrant green color.',
    details: 'Traditional Japanese green tea with a bright, grassy flavor and beautiful emerald color.',
    brewing: 'Steep for 1-2 minutes in water at 70°C',
    image: 'https://images.unsplash.com/photo-1582793988951-9aed5509eb97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'silver-tips-green': {
    title: 'Silver Tips Green Tea',
    description: 'An exquisite green tea made from young tea buds, offering a delicate and sweet flavor.',
    details: 'Made from the finest young tea buds, this premium green tea offers a delicate sweetness and smooth finish.',
    brewing: 'Steep for 2-3 minutes in water at 75°C',
    image: 'https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  },
  'silver-tips-white': {
    title: 'Silver Tips White Tea',
    description: 'A rare white tea made from the finest young tea buds, known for its subtle and complex flavor.',
    details: 'The rarest of our teas, made from carefully selected young tea buds, offering a delicate and complex flavor profile.',
    brewing: 'Steep for 3-4 minutes in water at 80°C',
    image: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80'
  }
};

const TeaDetails = () => {
  const { teaId } = useParams();
  const navigate = useNavigate();
  const tea = teaTypes[teaId];

  if (!tea) {
    return <div>Tea not found</div>;
  }

  return (
    <div className="tea-details">
      <button className="back-button" onClick={() => navigate('/')}>← Back to Collection</button>
      <div className="tea-details-content">
        <div className="tea-image">
          <img src={tea.image} alt={tea.title} />
        </div>
        <div className="tea-info">
          <h1>{tea.title}</h1>
          <p className="description">{tea.description}</p>
          <div className="details-section">
            <h2>Details</h2>
            <p>{tea.details}</p>
          </div>
          <div className="brewing-section">
            <h2>Brewing Instructions</h2>
            <p>{tea.brewing}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeaDetails; 