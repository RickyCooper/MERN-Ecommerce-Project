import { applyMiddleware, combineReducers, createStore } from 'redux';
import {userLoginReducer, userRegisterReducer, userDetailsReducer, updateProfileReducer} from '../reducers/userReducers';
import {cartReducer} from '../reducers/cartReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import {productDetailsReducer} from '../reducers/productListReducers';
import {productListReducer} from '../reducers/productListReducers';
import thunk from 'redux-thunk';

const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: updateProfileReducer
});

// If cartItems exist parse cartItems into cartItemsFromStorage, else cartItemsFromStorage equals an empty array. 
const cartItemsFromStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;



const initialState = {
    cart: {cartItems: cartItemsFromStorage},
    userLogin: {userInfo: userInfoFromStorage},
};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store;