const Web3 = require('web3');
const { Admin } = require('web3-eth-admin');

exports.getNodeInfo = (provider) => {
    const admin = getAdmin(provider);
    return admin.getNodeInfo();
}

exports.addPeer = (enode, provider) => {
    const admin = getAdmin(provider);
    return admin.addPeer(enode);
}

exports.getPeers = (provider) => {
    const admin = getAdmin(provider);
    return admin.getPeers();
}

function getAdmin(provider) {
    return new Admin(new Web3.providers.HttpProvider(provider));
}