import { SET_PROVIDER, ADD_ACCOUNT } from './setTypes';

export const setProvider = (provider) => {
    localStorage.setItem("web3_provider", provider);
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