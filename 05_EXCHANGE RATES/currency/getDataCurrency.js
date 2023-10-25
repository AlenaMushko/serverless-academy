import {getMonoCurrencyRate, getPrivateCurrencyRate} from "../services/getCurrencyRate.js";
import {botConstant} from "../constant/index.js";

export const getDataCurrency = async () => {
    const mono = await getMonoCurrencyRate();

    const monoData = mono.data.reduce((acc, value) => {
        const {currencyCodeB, currencyCodeA, rateBuy, rateSell} = value;
        if (currencyCodeB === botConstant.codeUAH) {
            if (currencyCodeA === botConstant.codeUSD) {
                acc.push(
                    {ccy: 'USD', base_ccy: 'UAH', buy: String(rateBuy), sale: String(rateSell)});
            }
            if (currencyCodeA === botConstant.codeEUR) {
                acc.push(
                    {ccy: 'EUR', base_ccy: 'UAH', buy: String(rateBuy), sale: String(rateSell)});
            }
        }
        return acc;
    }, []);

    const privateD = await getPrivateCurrencyRate();
    const privateData = privateD.data;

    return {
        monoData,
        privateData
    }
}
