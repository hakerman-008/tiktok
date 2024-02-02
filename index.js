const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.get('/kshitiz', async (req, res) => {
  const userKeyword = req.query.keyword;

  if (!userKeyword) {
    return res.status(400).json({ error: 'Missing keyword parameter' });
  }

  const options = {
    method: 'GET',
    url: 'https://tiktok-scraper7.p.rapidapi.com/feed/search',
    params: {
      keywords: userKeyword,
      region: 'us',
      count: '10',
      cursor: '0',
      publish_time: '0',
      sort_type: '0'
    },
    headers: {
      'X-RapidAPI-Key': '719775e815msh65471c929a0203bp10fe44jsndcb70c04bc42',
      'X-RapidAPI-Host': 'tiktok-scraper7.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);

    const videos = response.data.data.videos.map((video) => {
      return {
        title: video.title,
        videoUrl: video.play
      };
    });

    res.json(videos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
