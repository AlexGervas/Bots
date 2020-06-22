const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const session = require('node-vk-bot-api/lib/session')

const bot = new VkBot(process.env.TOKEN);

// bot.on((ctx) => {
//     ctx.session.counter = ctx.session.counter || 0;
//     ctx.session.counter++;
//
//     ctx.reply(`You wrote ${ctx.session.counter} messages.`);
// });

bot.command('Начать', (ctx) => {
    console.log('keeeek');
    ctx.reply('Hello!');

    ctx.reply('How are you doing?', null, Markup
        .keyboard([
            [
                Markup.button('Normally', 'primary'),
            ],
            [
                Markup.button('Fine', 'positive'),
                Markup.button('Bad', 'negative'),
            ],
        ]),
    )
})

bot.startPolling(() => {
    console.log('Bot started.');
});
