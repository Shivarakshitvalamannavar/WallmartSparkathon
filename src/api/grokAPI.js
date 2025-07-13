// frontend/src/api/grokAPI.js
export async function getGrokSuggestion(product, userData) {
    try {
      const res = await fetch('http://localhost:3001/grok-shopping', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product,
          familySize: userData.familySize,
          nextVisitDays: userData.nextVisit,
        }),
      });
  
      const data = await res.json();
      return { quantity: data.quantity || 1 };
    } catch (err) {
      console.error('Smart Assistant Error:', err);
      return { quantity: 1 }; // fallback
    }
  }
  