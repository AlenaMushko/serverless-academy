import {dataCurrency} from "./dataCurrency.js";
import bot, {currencyMenu} from '../app.js';

export const getRate = async (chatId, messageText) => {
    try {
        const data = await dataCurrency();

        const dataUSD = data.dataUSD;
        const dataEUR = data.dataEUR;

        switch (messageText) {
            case 'USD':
              await  sendMessageWithCurrencyRates(chatId, messageText, dataUSD);
                bot.sendMessage(chatId, 'Оберіть валюту:', {
                    reply_markup: {
                        keyboard: currencyMenu,
                        resize_keyboard: true
                    }
                });
                break;
            case 'EUR':
               await sendMessageWithCurrencyRates(chatId, messageText, dataEUR);
                bot.sendMessage(chatId, 'Оберіть валюту:', {
                    reply_markup: {
                        keyboard: currencyMenu,
                        resize_keyboard: true
                    }
                });
                break;
            default:
                bot.sendMessage(chatId, 'Оберіть валюту:', {
                    reply_markup: {
                        keyboard: currencyMenu,
                        resize_keyboard: true
                    }
                });
                break;
        }

    } catch (e) {
        console.log(e.message)
    }
};

const sendMessageWithCurrencyRates = async (chatId, messageText, data) => {
    try {
        bot.sendMessage(
            chatId,
            `<b> Курс - ${messageText} в ПриватБанку</b>
   Покупка - ${data['ПриватБанк'].buy}
   Monobank - ${data['ПриватБанк'].sale}
                  
 <b> Курс - ${messageText} в Monobank</b>
    Покупка - ${data['Monobank'].buy}
    Monobank - ${data['Monobank'].sale}
    
 <b>Незабудьте задонатити на захист нашої держави 🛡️</b>`,
            {parse_mode: 'HTML'}
        );
    } catch (err) {
        bot.sendMessage(
            chatId,
            `Вибачте, дані оновлюються. Спробуйте згодом`,
            {parse_mode: 'HTML'}
        );
    }
}




