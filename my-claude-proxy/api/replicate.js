const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // CORS headers (as before)
  
  const REPLICATE_API_TOKEN = process.env.REPLICATE_API_TOKEN;
  const MODEL_VERSION = "39b3434f194f87a900d1bc2b6d4b983e90f0dde1d5022c27b52c143d670758fa";

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { prompt } = req.body;
  if (!prompt) {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  try {
    const response = await fetch('https://api.replicate.com/v1/predictions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        version: MODEL_VERSION,
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
          'Authorization': `Bearer ${REPLICATE_API_TOKEN}`,
        },
      });
      const status = await statusResponse.json();
      if (status.status === 'succeeded') {
        generatedImageUrl = status.output[0];  // Assuming the first output is the image URL
      } else if (status.status === 'failed') {
        res.status(500).json({ error: 'Image generation failed' });
        return;
      } else {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Wait before polling again
      }
    }

    res.status(200).json({ image_url: generatedImageUrl });
  } catch (error) {
    console.error('Error in Replicate API call:', error);
    res.status(500).json({ error: 'An error occurred', details: error.message });
  }
};