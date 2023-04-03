const TelegramBot = require('node-telegram-bot-api');
const webUrl = "https://unique-dragon-0ce61f.netlify.app"
const bot = new TelegramBot("6101986006:AAHrsH0ByEsO4ihZvI53MJY2u5dSiVstAKQ", {polling: true});
const mongoose = require('mongoose');
const User = require('./models/User.ts');
const {addUser} = require('./services/userService.ts');

bot.on('message', async (msg) => {
    await mongoose.connect(`mongodb+srv://Norland:090902020909@norlandshopdb.lcnwneo.mongodb.net/?retryWrites=true&w=majority`)
    const user_tg_id = msg.chat.id;
    const text = msg.text;
    const user = await User.findOne({user_tg_id});
    if (text === "/start") {

        await bot.sendMessage(user_tg_id, `Добрий день, ${msg.chat.first_name}, це телеграм бот який дозволить вам здійснювати покупки з магазину NorlandShop`);
        if (user) {
            await bot.sendMessage(user_tg_id, `З поверненням, приємних покупок)`, {
                reply_markup: {
                    keyboard: [
                        [{text: "Увійти до магазину", web_app: {url: webUrl}}]
                    ]
                }
            });
        } else {
            await bot.sendMessage(user_tg_id, `Для продовження будь ласка пройдіть реєстрацію`, {
                reply_markup: {
                    keyboard: [
                        [{text: "Зареєструватися", web_app: {url: webUrl + "/registration"}}]
                    ]
                }
            });
        }
    }
    if (!user) {
        if (msg?.web_app_data?.data) {
            try {
                const data = JSON.parse(msg?.web_app_data?.data)
                console.log(data);
                await addUser(data, user_tg_id);
                console.log("Test 122")
            } catch (err) {
                console.log(err)
            }
        }
    } else {
        if (msg?.web_app_data?.data) {
            try {
                const data = JSON.parse(msg?.web_app_data?.data)
                console.log(data);

            } catch (err) {
                console.log(err)
            }
        }
    }
});