const Web3 = require('web3');

exports.getBalance = async (accountId, provider) => {
    const web3 = getWeb3(provider);
    var balance = await web3.eth.getBalance(accountId);
    return Promise.resolve(web3.utils.fromWei(balance, "ether"));
}

exports.getAccounts = (provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.getAccounts();
}

exports.getAllInfo = async (provider) => {
    const web3 = getWeb3(provider);
    let response = {};
    await web3.eth.getChainId().then((chainId) => {
        response.chainId = chainId;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getNodeInfo().then((nodeInfo) => {
        response.nodeInfo = nodeInfo;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getWork().then((work) => {
        response.currentBlock = work[0];
        response.seedHash = work[1];
        response.workTarget = work[2];
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.isSyncing().then((sync) => {
        response.isSyncing = sync;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getProtocolVersion().then((ver) => {
        response.ProtocolVersion = ver;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getCoinbase().then((acc) => {
        response.coinbase = acc;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getHashrate().then((rate) => {
        response.HashRate = rate;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getGasPrice().then((price) => {
        response.GasPrice = price;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    await web3.eth.getBlockNumber().then((block) => {
        response.BlockNumber = block;
    }).catch((err) => {
        console.log("Error caught: ", err);
    });
    return Promise.resolve(response);
}

function getWeb3(provider) {
    return new Web3(new Web3.providers.HttpProvider(provider));
}