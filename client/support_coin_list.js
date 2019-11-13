import Config from 'react-native-config';

const isTestNet = Config.is_testnet === 'true';

export const COINS = {
    AION: {
        name: 'AION',
        symbol: 'AION',
        icon: require('../assets/coin_aion.png'),
        tokenSupport: true,
        txFeeSupport: true,
        gasPriceUnit: 'AMP',
        defaultGasPrice: '10',
        defaultGasLimit: '21000',
        defaultGasLimitForContract: '90000',
        network: isTestNet ? 'mastery' : 'mainnet',
        bip38Supported: false,
        ledgerSupport: true,
        isTestNet,
    },
    BTC: {
        name: 'BITCOIN',
        symbol: 'BTC',
        icon: require('../assets/coin_btc.png'),
        tokenSupport: false,
        gasPriceUnit: '',
        network: isTestNet ? 'BTCTEST' : 'BTC',
        bip38Supported: true,
        WIFSupported: true,
        ledgerSupport: true,
        isTestNet,
    },
    ETH: {
        name: 'ETHEREUM',
        symbol: 'ETH',
        icon: require('../assets/coin_eth.png'),
        tokenSupport: true,
        txFeeSupport: true,
        tokenExchangeSupport: true,
        gasPriceUnit: 'Gwei',
        defaultGasPrice: '20',
        defaultGasLimit: '21000',
        defaultGasLimitForContract: '60000',
        network: isTestNet ? 'ropsten' : 'mainnet',
        bip38Supported: false,
        ledgerSupport: true,
        isTestNet,
    },
    // 'EOS': {
    //     name: 'EOS',
    //     symbol: 'EOS',
    //     icon: require('../assets/coin_eos.png'),
    //     tokenSupport: false,
    //     gasPriceUnit: '',
    //     api: eos_api,
    // },
    LTC: {
        name: 'LITECOIN',
        symbol: 'LTC',
        icon: require('../assets/coin_ltc.png'),
        tokenSupport: false,
        gasPriceUnit: '',
        network: isTestNet ? 'LTCTEST' : 'LTC',
        bip38Supported: true,
        WIFSupported: true,
        ledgerSupport: false,
        isTestNet,
    },
    TRX: {
        name: 'TRON',
        symbol: 'TRX',
        icon: require('../assets/coin_trx.png'),
        tokenSupport: false,
        txFeeSupport: false,
        network: isTestNet ? 'shasta' : 'mainnet',
        bip38Supported: false,
        ledgerSupport: false,
        isTestNet,
    },
};
