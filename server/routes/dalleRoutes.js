import express from 'express';
import * as dotenv from 'dotenv';
import OpenAI from 'openai'; // Import OpenAI

dotenv.config();

const router = express.Router();

// Initialize the OpenAI client with the API key from environment variables
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is correctly loaded from your environment variables
});

// Define a route to handle GET requests
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

// Define a route to handle POST requests
router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Generate an image based on the provided prompt
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    const image = aiResponse.data[0].b64_json; // Extract the image data
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;
