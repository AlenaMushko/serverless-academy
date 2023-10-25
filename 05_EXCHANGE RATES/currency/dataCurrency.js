import NodeCache from "node-cache";

import {getDataCurrency} from "./getDataCurrency.js";

const myCache = new NodeCache({stdTTL: 61});
export const dataCurrency = async () => {
    const cachedDataUSD = myCache.get("dataUSD");
    const cachedDataEUR = myCache.get("dataEUR");

    let dataUSD = null;
    let dataEUR = null;

    if (!cachedDataUSD && !cachedDataEUR) {
        const data = await getDataCurrency();
        const usdM = data.monoData.find(value => value.ccy === 'USD');
        const usdP = data.privateData.find(value => value.ccy === 'USD');
        dataUSD = {
            'ПриватБанк': usdP,
            'Monobank': usdM
        }

        const eurM = data.monoData.find(value => value.ccy === 'EUR');
        const eurP = data.privateData.find(value => value.ccy === 'EUR');
        dataEUR = {
            'ПриватБанк': eurP,
            'Monobank': eurM
        }

        myCache.set("dataEUR", dataEUR);
        myCache.set("dataUSD", dataUSD);
    } else {
        dataUSD = cachedDataUSD;
        dataEUR = cachedDataEUR;
    }

    return {
        dataUSD,
        dataEUR
    }
}
