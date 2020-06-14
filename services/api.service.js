const EthService = require('../services/eth.service');
const EthTransactionService = require('../services/eth.transaction.service');

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