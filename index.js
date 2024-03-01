const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;


const rapidApiKeys = [
  '3fa82b3121msh60993f970f09819p15c22cjsncc0b065b5f1c',
  'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
  '0820ec24afmsh10d1bef860c3651p10e3f6jsn715a93754ace',
  '6301897cd7msh67799971767a436p155bb3jsn86052462c350',
  '4bd76967f9msh2ba46c8cf871b4ep1eab38jsn19c9067a90bb',
  '3d43bf625amsh2825ff448cc01fbp11fb40jsn5de7b0149a14'
];

let currentApiKeyIndex = 0;

function getNextApiKey() {
 
  currentApiKeyIndex = (currentApiKeyIndex + 1) % rapidApiKeys.length;
  return rapidApiKeys[currentApiKeyIndex];
}

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
      'X-RapidAPI-Key': getNextApiKey(),
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
