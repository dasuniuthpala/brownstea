import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Adjust content margin dynamically based on header height
window.addEventListener('load', () => {
  const header = document.querySelector('.header');
  const content = document.querySelector('.content');
  if (header && content) {
    const headerHeight = header.offsetHeight;
    content.style.marginTop = `${headerHeight}px`;
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
