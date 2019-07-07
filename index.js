const express = require('express');
const app = express();
const utils = require('./utils');

app.get('/', async (req, res) => {
    const items = await utils.getItemsFromFeed();
    const result = utils.buildResponse(items);
    return res.status(200).json(result);
});

/**
 * For testing purpose only
 * app.listen(3000, () => console.log('Server is on'));
 */

module.exports = app;
