const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Endpoint to fetch data from the new TikTok API and extract play URLs
app.get('/kshitiz', async (req, res) => {
    try {
        const keyword = req.query.keyword; 

        // Fetch data from the new TikTok API
        const response = await axios.get(`https://api.shannmoderz.xyz/search/tiktok?query=${keyword}`);

        // Extract no_watermark video URL
        const videoData = response.data.result;
        const playUrls = [{
            title: videoData.title,
            videoUrl: videoData.no_watermark
        }];

        res.json(playUrls);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
