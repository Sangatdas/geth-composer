import { LOAD_GETH_INFO, LOAD_ADMIN_INFO, LOAD_ACCOUNTS, LOAD_PEERS } from './loadTypes';

import axios from 'axios';

export const loadGethInfo = (provider) => dispatch => {
    axios
    .create({
        baseURL: 'http://localhost:5000/eth/',
        timeout: 5000,
        headers: {'provider': provider}
    })
    .get('/')
    .then((response) => {   
        dispatch(gethInfoAction(response.data));
    })
    .catch((err) => {
      console.log(err);
    });
}

export const loadAdminInfo = (provider) => dispatch => {
    axios.create({
        baseURL: 'http://localhost:5000/admin/',
        timeout: 5000,
        headers: {'provider': provider}
    }).get('nodeInfo')
    .then((response) => {   
        dispatch(adminInfoAction(response.data));
    })
    .catch((err) => {
        console.log(err);
    });
}

export const loadAccounts = (provider) => dispatch => {
    axios.create({
        baseURL: 'http://localhost:5000/api/',
        timeout: 5000,
        headers: {'provider': provider}
    }).get('accounts')
    .then((response) => {   
        dispatch(accountsAction(response.data));
    })
    .catch((err) => {
        console.log(err);
    });
}

export const loadPeers = (provider) => dispatch => {
    axios
    .create({
        baseURL: 'http://localhost:5000/admin/',
        timeout: 5000,
        headers: {'provider': provider}
    })
    .get('/peers')
    .then((response) => {   
        dispatch(peersAction(response.data));
    })
    .catch((err) => {
      console.log(err);
    });    
}

export const gethInfoAction = (gethInfo) => {
    return {
        type: LOAD_GETH_INFO,
        payload: gethInfo
    }
}

export const adminInfoAction = (adminInfo) => {
    return {
        type: LOAD_ADMIN_INFO,
        payload: adminInfo
    }
}

export const accountsAction = (accounts) => {
    return {
        type: LOAD_ACCOUNTS,
        payload: accounts
    }
}

export const peersAction = (peers) => {
    return {
        type: LOAD_PEERS,
        payload: peers
    }
}