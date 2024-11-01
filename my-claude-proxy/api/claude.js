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

  const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;

  try {
    console.log('Sending request to Anthropic API...');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: req.body.model,
        max_tokens: req.body.max_tokens,
        system: req.body.system,
        messages: req.body.messages
      }),
    });

    const responseText = await response.text();
    console.log('Raw Anthropic API response:', responseText);

    if (!response.ok) {
      console.error('Anthropic API response not OK:', response.status, response.statusText, responseText);
      return res.status(response.status).json({ error: `Anthropic API error: ${response.statusText}`, details: responseText });
    }

    let anthropicData;
    try {
      anthropicData = JSON.parse(responseText);
    } catch (parseError) {
      console.error('Error parsing Anthropic API response:', parseError);
      return res.status(500).json({ error: 'Error parsing Anthropic API response', details: responseText });
    }

    console.log('Parsed Anthropic API response:', JSON.stringify(anthropicData, null, 2));

    if (!anthropicData.content || !Array.isArray(anthropicData.content) || anthropicData.content.length === 0 || !anthropicData.content[0].text) {
      console.error('Unexpected response format from Anthropic:', anthropicData);
      return res.status(500).json({ error: 'Unexpected response format from Anthropic API', details: JSON.stringify(anthropicData) });
    }

    res.status(200).json(anthropicData);
  } catch (error) {
    console.error('Error in Claude API call:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};