const fetch = require('node-fetch');

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allows any origin
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;

  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const apiKey = process.env.REPLICATE_API_TOKEN;

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: '39b3434f194f87a900d1bc2b6d4b983e90f0dde1d5022c27b52c143d670758fa', // Replace with the correct version ID
        input: {
          prompt: prompt,
          guidance: 3.5,
          num_outputs: 1,
          aspect_ratio: '1:1',
        },
      }),
    });

    const prediction = await response.json();

    if (response.status !== 201) {
      res.status(response.status).json({ error: prediction.detail });
      return;
    }

    // Poll until the prediction is complete
    let generatedImageUrl;
    while (!generatedImageUrl) {
      const statusResponse = await fetch(prediction.urls.get, {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      });
      const status = await statusResponse.json();

      if (status.status === 'succeeded') {
        generatedImageUrl = status.output;
      } else if (status.status === 'failed') {
        res.status(500).json({ error: 'Image generation failed' });
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before polling again
      }
    }

    res.status(200).json({ image_url: generatedImageUrl });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
