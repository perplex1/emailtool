const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Access-Control-Allow-Headers, X-Requested-With');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    console.log('Sending request to OpenAI API...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify(req.body),
    });

    const responseText = await response.text();
    console.log('Raw OpenAI API response:', responseText);

    if (!response.ok) {
      console.error('OpenAI API response not OK:', response.status, response.statusText, responseText);
      return res.status(response.status).json({ error: `OpenAI API error: ${response.statusText}`, details: responseText });
    }

    let openaiData;
    try {
      openaiData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing OpenAI API response:', parseError);
      return res.status(500).json({ error: 'Error parsing OpenAI API response', details: responseText });
    }

    console.log('Parsed OpenAI API response:', JSON.stringify(openaiData, null, 2));

    res.status(200).json(openaiData);
  } catch (error) {
    console.error('Error in OpenAI API call:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};