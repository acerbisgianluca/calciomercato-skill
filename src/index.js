const express = require('express');
const app = express();
const utils = require('./utils');

app.get('/', (req, res) => {
    return res.status(200).send('Web Service is online');
});

app.get('/:sport', async (req, res) => {
    const sport = req.params.sport;
    try {
        const items = await utils.getItemsFromFeed(sport);
        const result = utils.buildResponse(items);
        return res.status(200).json(result);
    } catch (err) {
        return res.status(404).send(err.message);
    }
});

// For testing purpose only
//app.listen(3000, () => console.log('Server is on'));

module.exports = app;
