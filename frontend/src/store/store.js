import { appleMiddleware, applyMiddleware, combineReducers, createStore } from 'redux';

import {cartReducer} from '../reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer} from '../reducers/productListReducers';
import {productListReducer} from '../reducers/productListReducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
});

// If cartItems exist parse cartItems into cartItemsFromStorage, else cartItemsFromStorage equals an empty array. 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];


const initialState = {
    cart: {cartItems: cartItemsFromStorage}
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;