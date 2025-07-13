// // backend/smart/index.cjs
// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const axios = require('axios');
// require('dotenv').config(); // Load .env variables

// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// // Load Groq API key from environment variable
// //const GROQ_API_KEY = process.env.GROQ_API_KEY;
// console.log('🔐 GROQ_API_KEY:', process.env.GROQ_API_KEY ? '✅ Loaded' : '❌ Missing');

// // Smart Assistant endpoint
// app.post('/grok-shopping', async (req, res) => {
//   const { product, familySize, nextVisitDays } = req.body;

//   // Validation
//   if (!product || !familySize || !nextVisitDays) {
//     return res.status(400).json({ error: 'Missing required fields' });
//   }

//   // Dynamic prompt for Groq
//   const prompt = `
// You are a smart Walmart shopping assistant.

// A user with a family of ${familySize} is planning to visit the store again in ${nextVisitDays} days. They are interested in buying "${product}".

// Estimate how many units of "${product}" they should purchase to last until their next visit. Only return a number.
// `;

//   try {
//     const response = await axios.post(
//       'https://api.groq.com/openai/v1/chat/completions',
//       {
//         model: 'llama3-8b-8192',
//         messages: [
//           { role: 'system', content: 'You are a helpful Walmart shopping assistant.' },
//           { role: 'user', content: prompt }
//         ],
//         max_tokens: 50,
//       },
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.GROQ_API_KEY}`, // ✅ Using correct variable
//           'Content-Type': 'application/json',
//         },
//       }
//     );

//     const reply = response.data.choices[0].message.content;
//     const quantity = parseInt(reply.match(/\d+/)?.[0] || '1');

//     res.json({ quantity });
//   } catch (error) {
//     console.error('❌ Groq API Error:', error.response?.data || error.message);
//     res.status(500).json({
//       error: 'Failed to fetch from Groq',
//       details: error.response?.data || error.message,
//     });
//   }
// });

// // Start server
// app.listen(3001, () => {
//   console.log('🚀 Smart Assistant backend running on http://localhost:3001');
// });


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

console.log('🔧 Using rule-based Smart Assistant');

app.post('/grok-shopping', (req, res) => {
  const { product, familySize, nextVisitDays } = req.body;

  if (!product || !familySize || !nextVisitDays) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const baseQuantities = {
    'milk': 1,
    'curd': 1,
    'bread': 0.5,
    'eggs': 2,
    'toothpaste 100g': 0.1,
    'toothpaste 200g': 0.15,
    'chocos': 0.3,
  };

  const base = baseQuantities[product.toLowerCase()] || 0.5;

  // Simple formula: base * familySize * (days / 7)
  const quantity = Math.ceil(base * familySize * (nextVisitDays / 7));

  return res.json({ quantity });
});

app.listen(3001, () => {
  console.log('🚀 Smart Assistant running with mock logic at http://localhost:3001');
});
