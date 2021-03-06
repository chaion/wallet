import { ApiClient } from 'makkiijs/packages/makkii-core';
import { AionApiClient } from 'makkiijs/packages/app-aion';
import { BtcApiClient } from 'makkiijs/packages/app-btc';
import { EthApiClient } from 'makkiijs/packages/app-eth';
import { TronApiClient } from 'makkiijs/packages/app-tron';

import Config from 'react-native-config';
import { HttpClient } from 'lib-common-util-js/src';
import { COINS } from './support_coin_list';
import customApi from './customApi';
import { getOrRequestToken } from '../services/setting.service';

const isTestNet = Config.is_testnet === 'true';

export const client = new ApiClient();
export const getApiConfig = async () => {
    const url = `${Config.app_server_api}/config/apiServers`;
    const token = await getOrRequestToken();
    const header = {
        Authorization: `Bearer ${token}`,
    };
    try {
        let { data } = await Promise.race([HttpClient.get(url, undefined, false, header), new Promise(resolve => setTimeout(() => resolve({ data }), 5 * 1000))]);
        if (typeof data === 'string') {
            data = JSON.parse(data);
        }
        console.log('api config resp=>', data);
        CustomApiConfig(data);
    } catch (e) {
        //
    }
};

const initClient = () => {
    const aionClient = new AionApiClient({
        network: isTestNet ? 'amity' : 'mainnet',
        jsonrpc: '',
    });
    const btcClient = new BtcApiClient({
        network: isTestNet ? 'BTCTEST' : 'BTC',
        insight_api: '',
    });
    const ethClient = new EthApiClient({
        network: isTestNet ? 'ropsten' : 'mainnet',
        jsonrpc: '',
    });
    const ltcClient = new BtcApiClient({
        network: isTestNet ? 'LTCTEST' : 'LTC',
        insight_api: '',
    });
    const tronClient = new TronApiClient({
        network: isTestNet ? 'shasta' : 'mainnet',
        trongrid_api: '',
    });

    Object.keys(COINS).forEach(c => {
        switch (c.toLowerCase()) {
            case 'aion':
                client.addCoin('aion', aionClient);
                break;
            case 'btc':
                client.addCoin('btc', btcClient);
                break;
            case 'eth':
                client.addCoin('eth', ethClient);
                break;
            case 'ltc':
                client.addCoin('ltc', ltcClient);
                break;
            case 'trx':
                client.addCoin('trx', tronClient);
                break;
            default:
        }
    });
    CustomApiConfig(customApi);
};

const CustomApiConfig = config => {
    const { coins = {} } = config;
    Object.keys(client.coins).forEach(symbol => {
        if (coins[symbol] && coins[symbol].networks) {
            const { networks } = coins[symbol];
            const network = client.coins[symbol].getNetwork();
            if (networks[network]) {
                client.coins[symbol].updateConfiguration(networks[network]);
            }
        }
    });
};

initClient();

export const {
    getTokenIconUrl,
    getBlockByNumber,
    getTransactionExplorerUrl,
    getTransactionsByAddress,
    getBlockNumber,
    getTransactionStatus,
    getBalance,
    sendTransaction,
    sameAddress,
    getCoinPrices,
    getTokenDetail,
    getAccountTokenTransferHistory,
    getAccountTokenBalance,
    getTopTokens,
    searchTokens,
    buildTransaction,
} = client;
