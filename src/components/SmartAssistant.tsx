// // src/components/SmartAssistant.tsx

// import React, { useState } from 'react';

// const SmartAssistant: React.FC = () => {
//   const [product, setProduct] = useState('');
//   const [familySize, setFamilySize] = useState('');
//   const [nextVisitDays, setNextVisitDays] = useState('');
//   const [suggestion, setSuggestion] = useState<number | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSuggest = async () => {
//     if (!product || !familySize || !nextVisitDays) return;

//     setLoading(true);
//     const res = await fetch('http://localhost:8000/smart-assistant', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         product,
//         familySize: parseInt(familySize),
//         nextVisitDays: parseInt(nextVisitDays),
//       }),
//     });

//     const data = await res.json();
//     setSuggestion(data.quantity);
//     setLoading(false);
//   };

//   return (
//     <div style={{ padding: 20, maxWidth: 400, margin: 'auto' }}>
//       <h2>🧠 Smart Assistant</h2>
//       <input value={product} onChange={(e) => setProduct(e.target.value)} placeholder="Product name" />
//       <input value={familySize} onChange={(e) => setFamilySize(e.target.value)} placeholder="Family size" type="number" />
//       <input value={nextVisitDays} onChange={(e) => setNextVisitDays(e.target.value)} placeholder="Next visit (days)" type="number" />
//       <button onClick={handleSuggest} disabled={loading}>
//         {loading ? 'Loading...' : 'Suggest Quantity'}
//       </button>
//       {suggestion !== null && <p>Suggested quantity: <strong>{suggestion}</strong></p>}
//     </div>
//   );
// };

// export default SmartAssistant;


import React, { useState } from 'react';
import './SmartAssistant.css'; // Make sure you create and import this CSS file

const categories = ['All', 'Dairy', 'Bakery', 'Personal Care'];

const sampleItems = [
  {
    id: 1,
    name: 'Milk',
    price: 30,
    unit: '1L',
    category: 'Dairy',
    image: 'https://i.imgur.com/EHyR2nP.png',
  },
  {
    id: 2,
    name: 'Curd',
    price: 20,
    unit: '500ml',
    category: 'Dairy',
    image: 'https://i.imgur.com/V0a6bqT.png',
  },
  {
    id: 3,
    name: 'Bread (Whole Wheat)',
    price: 25,
    unit: '400g',
    category: 'Bakery',
    image: 'https://i.imgur.com/aSKOJ5H.png',
  },
  {
    id: 4,
    name: 'Eggs (12 Pack)',
    price: 70,
    unit: '12 pcs',
    category: 'Dairy',
    image: 'https://i.imgur.com/LN8OE2P.png',
  },
  {
    id: 5,
    name: 'Toothpaste (Colgate)',
    price: 55,
    unit: '150g',
    category: 'Personal Care',
    image: 'https://i.imgur.com/RSqLydR.png',
  },
  {
    id: 6,
    name: 'Toothpaste (Sensodyne)',
    price: 90,
    unit: '200g',
    category: 'Personal Care',
    image: 'https://i.imgur.com/CQUW2J3.png',
  },
  {
    id: 7,
    name: 'Chocos',
    price: 120,
    unit: '500g',
    category: 'Bakery',
    image: 'https://i.imgur.com/YtKyaOS.png',
  },
];

const SmartAssistant: React.FC = () => {
  const [familySize, setFamilySize] = useState('');
  const [nextVisitDays, setNextVisitDays] = useState('');
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [loadingItemId, setLoadingItemId] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = sampleItems.filter(
    (item) =>
      (selectedCategory === 'All' || item.category === selectedCategory) &&
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSuggest = async (product: string, id: number) => {
    if (!familySize || !nextVisitDays) return alert('Enter family size and next visit days');

    setLoadingItemId(id);

    try {
      const res = await fetch('http://localhost:3001/grok-shopping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          familySize: parseInt(familySize),
          nextVisitDays: parseInt(nextVisitDays),
        }),
      });

      const data = await res.json();
      setQuantities((prev) => ({ ...prev, [id]: data.quantity }));
    } catch (err) {
      alert('Error fetching suggestion');
    } finally {
      setLoadingItemId(null);
    }
  };

  return (
    <div className="smart-assistant-container">
      <header className="navbar">
        <h1>🛒 Walmart Smart Assistant</h1>
        <input
          className="search-bar"
          type="text"
          placeholder="🔍 Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </header>

      <div className="inputs-row">
        <input
          type="number"
          value={familySize}
          onChange={(e) => setFamilySize(e.target.value)}
          placeholder="👨‍👩‍👧‍👦 Family size"
        />
        <input
          type="number"
          value={nextVisitDays}
          onChange={(e) => setNextVisitDays(e.target.value)}
          placeholder="📅 Next visit (days)"
        />
      </div>

      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={selectedCategory === cat ? 'active' : ''}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredItems.map((item) => (
          <div key={item.id} className="product-card">
            <img
              src={item.image}
              alt={item.name}
              onError={(e) => (e.currentTarget.src = 'https://via.placeholder.com/150')}
            />
            <h3>{item.name}</h3>
            <p>₹{item.price} • {item.unit}</p>
            <button onClick={() => handleSuggest(item.name, item.id)}>
              {loadingItemId === item.id ? 'Calculating...' : 'Suggest'}
            </button>
            {quantities[item.id] !== undefined && (
              <p className="suggestion">Suggested: {quantities[item.id]} units</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SmartAssistant;
