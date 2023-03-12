const {user1} = require('./fixtures');

const telegramLoginByUserId = new Map([
    [user1.login, '@b_demchenko']
]);

const BOT_TOKEN = process.env.BOT_TOKEN;

module.exports = {telegramLoginByUserId, telegramLoginByUserId, BOT_TOKEN, statuses};
