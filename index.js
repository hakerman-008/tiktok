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
    url: 'https://apichatbot.sumiproject.io.vn/tiktok',
    params: {
      search: userKeyword
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
