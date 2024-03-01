const { default: axios } = require('axios');
const express = require('express');
const app = express();



//user linkedin url, website url, github url, twitter url, facebook url, instagram url, youtube url, tiktok url
app.post('/feth-operation', async (req, res) => {
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