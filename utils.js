const ParserPackage = require('rss-parser');
const parser = new ParserPackage();

const FEED_URL = 'https://www.gazzetta.it/rss/calciomercato.xml';
const DOMAIN = 'https://www.gazzetta.it';

exports.getItemsFromFeed = async () => {
    const feed = await parser.parseURL(FEED_URL);
    return feed.items.splice(0, 5);
};

exports.buildResponse = (items) => {
    const result = items.map((item) => {
        const newItem = {
            uid: item.guid,
            updateDate: item.isoDate,
            titleText: item.title.trim(),
            mainText: item.contentSnippet.replace('\n', '. '),
            redirectionUrl: item.link.startsWith('/')
                ? DOMAIN + item.link
                : item.link,
        };
        return newItem;
    });
    return result;
};
