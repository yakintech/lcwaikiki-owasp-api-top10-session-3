const { default: axios } = require('axios');
const express = require('express');
const app = express();

let allowedUrls = [
    'https://www.linkedin.com/',
    'https://www.facebook.com/',
    'https://www.instagram.com/',
    'https://www.github.com/',
    'https://www.twitter.com/',
    'https://www.tiktok.com/',
    'https://www.youtube.com/',
    'https://www.example.com/'
]

//user linkedin url, website url, github url, twitter url, facebook url, instagram url, youtube url, tiktok url
app.post('/feth-operation', async (req, res) => {

    //url check
    if (!allowedUrls.includes(req.body.url)) {
        return res.status(400).send('Bad request');
    }

    //port check.
    if (req.body.url.includes('localhost')) {
        return res.status(400).send('Bad request');
    }

    //http check
    if (req.body.url.includes('http://')) {
        return res.status(400).send('Bad request');
    }
    

    const url = req.body.url;
    try {
        const { data } = await axios.get(url);
        res.json(data);
    } catch (error) {
        res.status(500).send('Internal server error');
    }
})



app.listen(3000, () => {
    console.log('Server is running on port 3000');
}
)