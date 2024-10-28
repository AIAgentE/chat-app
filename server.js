require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

app.post('/message', async (req, res) => {
    const userMessage = req.body.message;

    if (!userMessage || typeof userMessage !== 'string') {
        return res.status(400).json({ reply: 'Message content is required and must be a string.' });
    }

    console.log('User Message Received:', userMessage); // Debugging line to check the input

    try {
        // Request to OpenAI API
        const openaiResponse = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
                model: 'gpt-4',
                messages: [
                    { role: 'system', content: "You are an assistant that helps generate detailed work scopes for roofing projects." },
                    { role: 'user', content: userMessage }
                ],
                max_tokens: 1000,
                temperature: 0.7,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
            }
        );

        console.log('OpenAI Response:', openaiResponse.data); // Debugging line to see the response from OpenAI

        if (openaiResponse.data && openaiResponse.data.choices && openaiResponse.data.choices.length > 0) {
            const workScope = openaiResponse.data.choices[0].message.content.trim();
            res.json({ reply: workScope, done: true });
        } else {
            console.error('Unexpected response structure from OpenAI:', openaiResponse.data);
            res.status(500).json({ reply: 'Sorry, received an unexpected response structure.' });
        }
    } catch (error) {
        console.error('Error fetching response from OpenAI:', error.message);
        if (error.response) {
            console.error('Response status:', error.response.status);
            console.error('Response data:', error.response.data);
        }

        res.status(500).json({ reply: 'Sorry, something went wrong.' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});




