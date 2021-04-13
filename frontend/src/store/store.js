import { appleMiddleware, applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer} from '../reducers/productListReducers';
import {productListReducer} from '../reducers/productListReducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer

});

const initialState = {};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;