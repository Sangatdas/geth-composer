import { SET_PROVIDER, LOAD_GETH_INFO, LOAD_ADMIN_INFO, LOAD_ACCOUNTS } from '../actions/types'; 

const initialState = {
    gethInfo: {},
    nodeInfo: {},
    ports: {},
    eth: {},
    config: {},
    accounts: [],
    provider: ''
}

export default function(state = initialState, action) {
    switch(action.type) {
        case SET_PROVIDER:
            return {
                ...state,
                provider: action.payload
            };
        case LOAD_GETH_INFO:
            return {
                ...state,
                gethInfo: payload
            };
        case LOAD_ADMIN_INFO:
            return {
                ...state,
                nodeInfo: payload,
                ports: payload.ports,
                eth: payload.protocols.eth,
                config: payload.protocols.eth.config
            }
        case LOAD_ACCOUNTS:
            return {
                ...state,
                accounts: payload
            }
        case ADD_ACCOUNT:
            state.accounts.push(action.payload);
            return {
                ...state
            }
        default:
            return state;
    }
}