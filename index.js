const {Telegraf} = require('telegraf');

const {leads, users, marketingCompanies} = require('./fixtures');
const {BOT_TOKEN} = require('./constants');

const bot = new Telegraf(BOT_TOKEN);

bot.command('amounts', (ctx) => {
    let newLeadsAmount = 0;

    let oldLeadsAmount = 0;

    for (let leadId of leads.ids) {
        const lead = leads[leadId];

        const marketingCompany = marketingCompanies[lead.marketingCompanyId];

        if (marketingCompany === undefined) {
            console.error(`Отсутствует маркетинговая компания "${lead.marketingCompanyId}"`);

            continue;
        }

        if (lead.tries < marketingCompany.tries) {
            oldLeadsAmount += 1;
        } else {
            newLeadsAmount += 1;
        }
    }

    ctx.reply(`В очереди ${newLeadsAmount} новых и ${oldLeadsAmount} перезвонов.`)
});

bot.launch();