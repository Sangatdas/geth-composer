// const Web3 = require('web3');
// const { Miner } = require('web3-eth-miner');

// exports.startMiner = (provider) => {
//     const miner = getMiner(provider);
//     return miner.startMining(2);
// }

// exports.stopMiner = (provider) => {
//     const miner = getMiner(provider);
//     return miner.stopMining();
// }

// exports.isMining = (provider) => {
//     const web3 = getWeb3(provider);
//     return web3.eth.isMining();
// }

// function getWeb3(provider) {
//     return new Web3(new Web3.providers.HttpProvider(provider));
// }

// function getMiner(provider) {
//     return new Miner(provider);
// }