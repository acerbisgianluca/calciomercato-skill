const express = require('express');
const app = express();
const utils = require('./utils');

app.get('/', async (req, res) => {
    const items = await utils.getItemsFromFeed();
    const result = utils.buildResponse(items);
    return res.status(200).json(result);
});

//app.listen(3000, () => console.log('Server on'));

module.exports = app;
