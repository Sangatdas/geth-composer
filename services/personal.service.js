const Web3 = require('web3');

exports.createNewAccount = (pwd, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.personal.newAccount(pwd);
}

exports.unlockAccount = (addr, pwd, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.personal.unlockAccount(addr, pwd, 600);
}

exports.lockAccount = (addr, provider) => {
    const web3 = getWeb3(provider);
    return web3.eth.personal.lockAccount(addr);
}

function getWeb3(provider) {
    return new Web3(new Web3.providers.HttpProvider(provider));
}