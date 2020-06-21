import { SET_PROVIDER, LOAD_GETH_INFO, LOAD_ADMIN_INFO, LOAD_ACCOUNTS, ADD_ACCOUNT } from './types';

import axios from 'axios';

export const setProvider = (provider) => {
    return {
        type: SET_PROVIDER,
        payload: provider
    }
}

export const addAccount = (account) => {
    return {
        type: ADD_ACCOUNT,
        payload: account
    }
}

export const loadInfo = () => {
    loadGethInfo();
    loadAdminInfo();
    loadAccounts();        
}

export const loadGethInfo = () => {
    axios.create({
        baseURL: 'http://localhost:5000/eth/',
        timeout: 5000,
        headers: {'provider': 'http://localhost:8545'}
  }).get('/')
    .then((response) => {   
        setGethInfo(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export const loadAdminInfo = () => {
    axios.create({
        baseURL: 'http://localhost:5000/admin/',
        timeout: 5000,
        headers: {'provider': 'http://localhost:8545'}
    }).get('nodeInfo')
    .then((response) => {   
        setAdminInfo(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
}

export const loadAccounts = () => {
    axios.create({
        baseURL: 'http://localhost:5000/api/',
        timeout: 5000,
        headers: {'provider': 'http://localhost:8545'}
    }).get('accounts')
    .then((response) => {   
        setAccounts(response.data);
    })
    .catch((err) => {
        console.log(err);
    });
}


export const setGethInfo = (gethInfo) => {
    return {
        type: LOAD_GETH_INFO,
        payload: gethInfo
    }
}

export const setAdminInfo = (adminInfo) => {
    return {
        type: LOAD_ADMIN_INFO,
        payload: adminInfo
    }
}

export const setAccounts = (accounts) => {
    return {
        type: LOAD_ACCOUNTS,
        payload: accounts
    }
}