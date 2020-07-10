const fs = require('fs');
const TelegramBot = require('node-telegram-bot-api');
const token = 'TOKEN';

const bot = new TelegramBot(token, {polling: true});

bot.onText(/\/start/, function (msg, match) {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, 'Hello, ' + msg.chat.first_name + '!');
    newQuestion(msg);
    //openKlava(chatId);
});

function getRandomQuestion() {
    return questions[Math.floor(Math.random() * questions.length)];
}

function newQuestion(msg) {
    var arr = getRandomQuestion();
    var text = arr.title;
    var options = {
        reply_markup: JSON.stringify({
            inline_keyboard: arr.buttons,
            parse_mode: 'Markdown'
        })
    };
    chat = msg.hasOwnProperty('chat') ? msg.chat.id : msg.from.id;
    bot.sendMessage(chat, text, options);
}

bot.on('callback_query', function (msg) {
    var answer = msg.data.split('_');
    var index = answer[0];
    var button = answer[1];

    if (questions[index].right_answer == button) {
        bot.sendMessage(msg.from.id, 'Ответ верный ✅');
    } else {
        bot.sendMessage(msg.from.id, 'Ответ неверный ❌');
    }

    bot.answerCallbackQuery(msg.id, 'Вы выбрали: ' + msg.data, true);
    newQuestion(msg);
});

bot.on('Тест', (query) => {
    const chatId = query.message.chat.id;
    //newQuestion(msg);
});

function openKlava(chatId) {
    bot.sendMessage(chatId, '', {
        reply_markup: {
            keyboard: [
                [
                    {
                        text: 'Тест',
                    }
                ]
            ],
            one_time_keyboard: true
        }
    })
}

bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    const first_name = msg.chat.first_name;

    if (msg.text) {
        const text = msg.text.toLowerCase();

        if (~text.indexOf("Привет")) {
            bot.sendMessage(chatId, 'Привет, ' + first_name + '!');
        } else if (~text.indexOf("Тест")) {
            bot.sendMessage(chatId, 'Пройди интересный тест!');
            newQuestion(msg);
        }
    }
});

var questions = [
    {
        title: 'Сколько параметров можно передать функции ?',
        buttons: [
            [{text: 'Ровно столько, сколько указано в определении функции.', callback_data: '0_1'}],
            [{text: 'Сколько указано в определении функции или меньше.', callback_data: '0_2'}],
            [{text: 'Сколько указано в определении функции или больше.', callback_data: '0_3'}],
            [{text: 'Любое количество.', callback_data: '0_4'}]
        ],
        right_answer: 4
    },
    {
        title: 'Чему равна переменная name?\nvar name = "пупкин".replace("п", "д")',
        buttons: [
            [{text: 'дудкин', callback_data: '1_1'}],
            [{text: 'дупкин', callback_data: '1_2'}],
            [{text: 'пупкин', callback_data: '1_3'}],
            [{text: 'ляпкин-тяпкин', callback_data: '1_4'}]
        ],
        right_answer: 2
    },
    {
        title: 'Чему равно 0 || "" || 2 || true ?',
        buttons: [
            [{text: '0', callback_data: '2_1'}],
            [{text: '""', callback_data: '2_2'}],
            [{text: '2', callback_data: '2_3'}],
            [{text: 'true', callback_data: '2_4'}]
        ],
        right_answer: 3
    },
    {
        title: 'Какое из этих числе не является натуральным ?',
        buttons: [
            [{text: '1', callback_data: '3_1'}],
            [{text: '5', callback_data: '3_2'}],
            [{text: '2,6', callback_data: '3_3'}]
        ],
        right_answer: 3
    },
    {
        title: 'В чём заключается теорема Пифагора ?',
        buttons: [
            [{text: 'Сумма углов треугольника на евклидовой плоскости равно 180 градусов', callback_data: '4_1'}],
            [{text: 'Квадрат длины гипотенузы равен сумме квадратов длин катетов', callback_data: '4_2'}],
            [{
                text: 'Длина любой стороны треугольника всегда меньше суммы длин других его сторон',
                callback_data: '4_3'
            }]
        ],
        right_answer: 2
    },
];
