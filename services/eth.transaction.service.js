const Web3 = require('web3');

exports.getTransaction = (txHash, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.getTransaction(txHash);
}

exports.getPendingTransactions = (provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.getPendingTransactions();
}

exports.getTransactionReceipt = (txHash, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.getTransactionReceipt(txHash);
}

exports.getTransactionCount = (addr, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.getTransactionCount(addr);
}

exports.sendTransaction = async (txObject, provider) => {
    const web3 = getWeb3(provider);
    console.log(txObject);
    await web3.eth.personal.unlockAccount(txObject.from, txObject.password);
    return web3.eth.sendTransaction(txObject);
}

function getWeb3(provider) {
    return new Web3(new Web3.providers.HttpProvider(provider));
}