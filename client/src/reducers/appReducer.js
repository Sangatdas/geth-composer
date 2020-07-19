import { LOAD_GETH_INFO, LOAD_ADMIN_INFO, LOAD_ACCOUNTS, LOAD_PEERS } from '../actions/loadTypes'; 
import { SET_PROVIDER, ADD_ACCOUNT} from '../actions/setTypes';

const initialState = {
    gethInfo: {},
    nodeInfo: {},
    ports: {},
    eth: {},
    config: {},
    accounts: [],
    peers: [],
    provider: localStorage.getItem("web3_provider")
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
                gethInfo: action.payload
            };
        case LOAD_ADMIN_INFO:
            return {
                ...state,
                nodeInfo: action.payload,
                ports: action.payload.ports,
                eth: action.payload.protocols.eth,
                config: action.payload.protocols.eth.config
            }
        case LOAD_ACCOUNTS:
            return {
                ...state,
                accounts: action.payload
            }
        case LOAD_PEERS:
            return {
                ...state,
                peers: action.payload
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