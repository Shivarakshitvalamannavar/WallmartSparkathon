// src/components/HomePage.tsx
import React from 'react';
import './HomePage.css';

type Props = {
  onPageChange: (page: 'home' | 'store' | 'dashboard' | 'assistant') => void;
};

const HomePage: React.FC<Props> = ({ onPageChange }) => {
  const cards = [
    {
      title: 'Up to 30% off food & beverages',
      cta: 'Shop Deals',
      bg: '#C5E0F5',
      image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-3cf0/k2-_9ff3ceea-3ef8-44cc-bbd0-dfc8a053a05d.v1', // Replace with local image if needed
    },
    {
      title: 'Walmart DEALS\nDon’t miss up to 30% off',
      cta: 'Shop Deals',
      bg: '#9CD6FF',
      image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-15c2/k2-_52b44f3e-ec65-4d5b-b4ae-c389733acb43.v1.png',
    },
    {
      title: 'Up to 40% off outdoors',
      cta: 'Shop Deals',
      bg: '#E2F1FA',
      image: 'https://i5.walmartimages.com/dfw/4ff9c6c9-bb8d/k2-_69a93447-e53f-4d41-bd6a-0cdb8b0ea9ed.v1.png',
    },
    {
      title: 'Use Smart Assistant',
      cta: 'Launch Now',
      bg: '#D9EFFF',
      image: 'https://cdn-icons-png.flaticon.com/512/4712/4712033.png',
      action: () => onPageChange('assistant'),
    },
    {
      title: 'Go to Store',
      cta: 'Start Shopping',
      bg: '#D4F2E7',
      image: 'https://cdn-icons-png.flaticon.com/512/263/263115.png',
      action: () => onPageChange('store'),
    },
    {
      title: 'View Admin Dashboard',
      cta: 'Open Dashboard',
      bg: '#FFE0A3',
      image: 'https://cdn-icons-png.flaticon.com/512/3474/3474361.png',
      action: () => onPageChange('dashboard'),
    },
  ];

  return (
    <div className="homepage">
      <h1 className="homepage-title">🛒 Walmart Smart Clearance System</h1>
      <div className="homepage-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className="homepage-card"
            style={{ backgroundColor: card.bg }}
            onClick={() => card.action?.()}
          >
            <img src={card.image} alt="card" />
            <h3>{card.title}</h3>
            <button>{card.cta}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
