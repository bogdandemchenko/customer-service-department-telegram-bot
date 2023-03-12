const {Telegraf} = require('telegraf');

const {leads, users, marketingCompanies, incomingLine} = require('./fixtures');
const {BOT_TOKEN} = require('./constants');
const { Context } = require('telegraf/typings');

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

bot.command('attract', (ctx) => {
    console.log('Начинаю распределять заявки с ВХ!');

    const getDistributionOfLeadsFromHotline = (hotline) => {

        const minNumberOfOperators = 2;
        let operator = '';
        let result;
    
        for (let i = 0; i < hotline.freeOperators.length; i++) {
            if (hotline.freeOperators.length >= minNumberOfOperators) {
        
                const getMaxTimeSpentInStatus = (obj, array, key) => {
                    for (let i = 0; i < array.length; i++) {
                        for (let j = 0; j < array.length; j++) {
                            if (obj[array[i]][key] > obj[array[j]][key]) {
                                let swap = array[i];
                                array[i] = array[j];
                                array[j] = swap;
                            }
                        } 
                    }
                    return array;
                }
        
                let maxTimeSpentInStatus = getMaxTimeSpentInStatus(users, hotline.freeOperators, 'timeSpentInStatus');
        
                for (let i = 0; i < maxTimeSpentInStatus.length - minNumberOfOperators; i++) {
                    operator = users[maxTimeSpentInStatus.shift()].login;
                    result = console.log(`${operator} + 1`);
                }
            }
            
            if (hotline.freeOperators.length <= minNumberOfOperators) {
                result = console.log('Нет свободных операторов');
            }
        }
        return result;
    }

    ctx.reply(getDistributionOfLeadsFromHotline(incomingLine));
})

console.log(Context);

bot.launch();