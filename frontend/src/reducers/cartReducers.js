import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_PAYMENT_METHOD, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstants'

export const cartReducer = (state = {cartItems: [], shippingAddress: {}}, action) => {
    switch(action.type) {
        case CART_ADD_ITEM:
            
            const item = action.payload 

            // Checks if the item aalready exists in the cart by searching through state.cartItems for a match. 
            const existItem = state.cartItems.find(x => x.product === item.product)

            if(existItem) { 
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            } else {
                // Else just add the new item. 
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }
        case CART_SAVE_SHIPPING_ADDRESS:
                return {
                    ...state,
                    shippingAddress: action.payload,
                }
        case CART_SAVE_PAYMENT_METHOD:
                return {
                    ...state,
                    paymentMethod: action.payload,
                }
        default:
            return state;
    }
}



// [ NOTES ]
// action.payload is the data that your reducer will use to update the state.  