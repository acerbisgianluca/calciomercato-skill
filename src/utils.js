const ParserPackage = require('rss-parser');
const parser = new ParserPackage();

const FEED_URL = 'https://www.gazzetta.it/rss/{sport}.xml';
const DOMAIN = 'https://www.gazzetta.it';

exports.getItemsFromFeed = async (sport) => {
    try {
        const feed = await parser.parseURL(FEED_URL.replace('{sport}', sport));
        return feed.items.splice(0, 5);
    } catch (err) {
        throw new Error("Feed doesn't exist");
    }
};

exports.buildResponse = (items) => {
    const result = items.map((item) => {
        const newItem = {
            uid: item.guid,
            updateDate: item.isoDate,
            titleText: item.title
                .trim()
                .replace('\n', '. ')
                .replace(/\:/g, ',')
                .replace(/[^a-zA-Z0-9À-ú\ \.\,\;\!\?\:]/gi, ''),
            mainText: item.contentSnippet
                .trim()
                .replace('\n', '. ')
                .replace(/\:/g, ',')
                .replace(/[^a-zA-Z0-9À-ú\ \.\,\;\!\?\:]/gi, ''),
            redirectionUrl: item.link.startsWith('/')
                ? DOMAIN + item.link
                : item.link,
        };
        return newItem;
    });
    return result;
};
