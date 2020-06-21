const VkBot = require('node-vk-bot-api');
const Markup = require('node-vk-bot-api/lib/markup');
const Session = require('node-vk-bot-api/lib/session')

const session = new Session()

const bot = new VkBot(process.env.TOKEN);

bot.command('Начать', (ctx) => {
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
});

bot.startPolling(() => {
    console.log('Bot started.');
});
