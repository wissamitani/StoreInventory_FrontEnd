import {createStore, applyMiddleware, combineReducers} from 'redux';
import thunk from 'redux-thunk';
import deviceReducer from './DevicesItems';

const rootReducer = combineReducers({deviceReducer});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
