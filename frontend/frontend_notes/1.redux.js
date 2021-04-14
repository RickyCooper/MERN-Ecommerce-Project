// [ STEP ONE ] - Importing all the packages you will need to

// redux
// react-redux
// redux-thunk
// redux-devtools-extension

/* // [ STEP TWO ] - Create a folder in src name it store, and create a store.js file.

import { applyMiddleware, combineReducers, createStore } from 'redux';

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const reducer = combineReducers({ 
});

const initialState = {};

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware))) */

/* // [ STEP THREE ] - Go into your index.js file wrap your app component with the Provider and pass store as a prop.

    import {Provider} from 'react-redux';
    import store from './store/store';

    ReactDOM.render(
        <Provider store={store}>
        <App />
        </Provider>,
        document.getElementById('root')
    );

  // NOW WE CAN START BUILDING REDUCERS */ 

/* // [ STEP FOUR ] - Create a contants folder 

    // [ EXAMPLE OF SOME CONSTANTS ]

    export const PRODUCT_DETAILS_REQUEST = `PRODUCT_DETAILS_REQUEST`;
    export const PRODUCT_DETAILS_SUCCESS = `PRODUCT_DETAILS_SUCCESS`;
    export const PRODUCT_DETAILS_FAIL = `PRODUCT_DETAILS_FAIL`;
*/

/* // [ STEP FIVE ] - Create a reducers folder in src, this folder is going to home all your reducers. 
    
    // [ EXAMPLE REDUCER ]

    import { // [ <---- DONT FORGET TO IMPORT YOUR CONSTANTS ]
        PRODUCT_DETAILS_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS
    } from '../constants/productConstants';

    export const productDetailsReducer = (state = {product: { reviews: []}}, action) => {
        switch (action.type) {
            case PRODUCT_DETAILS_REQUEST:
                return {loading: true, ...state}
            case PRODUCT_DETAILS_SUCCESS:
                return {loading: false, product: action.payload}
            case PRODUCT_DETAILS_FAIL: 
                return {loading: false, error: action.payload}
            default:
                return state; 
        }
    }
*/

/* // [ STEP SIX ] - Create an actions folder for your actions 

    // [ EXAMPLE ACTION ]

        import { // [ <---- DONT FORGET TO IMPORT YOUR CONSTANTS ]
        PRODUCT_DETAILS_FAIL,
        PRODUCT_DETAILS_REQUEST,
        PRODUCT_DETAILS_SUCCESS
    } from '../constants/productConstants';

    export const listProductDetails = (id) => async (dispatch) => {
        try {
            dispatch({type: PRODUCT_DETAILS_REQUEST})

            const {data} = await axios.get(`/api/products/${id}`);
            dispatch({type: PRODUCT_DETAILS_SUCCESS, payload: data})
        } catch (error) {
            dispatch({type: PRODUCT_DETAILS_FAIL, 
                payload: error.response 
                && error.response.data.message 
                ? error.response.data.message 
                : error.message})
        }
    }
*/

/* // [ STEP SEVEN ]

    // [ add the new reducer to your store file - don't forget to import it first ]

    const reducer = combineReducers({
        productDetails: productDetailsReducer
    });
*/

/* // [ STEP EIGHT ]

    // [ EXAMPLE OF A COMPONENT DISPATCHING AN ACTION ]

    import {useDispatch, useSelector} from 'react-redux'; 
    import { listProductDetails } from '../../actions/productActions'

    const ProductScreen = ({match}) => {
        const dispatch = useDispatch(); // <- useDispatch(); 
        const productDetails = useSelector(state => state.productDetails); // <- useSelector()
        const {loading, error, product} = productDetails;
        
        useEffect(() => {
            dispatch(listProductDetails(match.params.id));

        },[dispatch, match]);
*/ 