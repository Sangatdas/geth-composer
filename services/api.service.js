const EthService = require('../services/eth.service');
const EthTransactionService = require('../services/eth.transaction.service');
const AdminService = require('../services/admin.service');

exports.getAccountsInfo = async (provider) => {
    var accountsInfoResponse = {
        accounts: []
    }
    await EthService.getAccounts(provider).then((accounts) => {
        accounts.forEach((account) => {
            accountsInfoResponse.accounts.push(createAccountData(account, provider));
        });
        
    }).catch((err) => {
        console.log("Error caught: ", err);
        throw err;
    });
    return Promise.all(accountsInfoResponse.accounts);
}

exports.getNodeInfo = async (provider) => {
    var nodeInfoResponse = {}
    await AdminService.getNodeInfo(provider).then((nodeInfo) => {
        nodeInfoResponse.nodeInfo = nodeInfo;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
    await AdminService.getPeers(provider).then((peers) => {
        nodeInfoResponse.peers = peers;
    }).catch((err) => {
        console.log(err);
        throw err;
    });
    return nodeInfoResponse;
}

async function createAccountData(account, provider) {
    var acc = {}
    acc.address = account;
    await EthService.getBalance(account, provider).then((balance) => {
        acc.balance = balance;
    });
    await EthTransactionService.getTransactionCount(account, provider).then((count) => {
        acc.count = count;
    });
    return acc;
}