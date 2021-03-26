import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch(action.type) {

        case CART_ADD_ITEM:
            const item = action.payload;
            const existingItem = state.cartItems.find(itm => itm.product === item.product);
            if(existingItem) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(itm => itm.product === existingItem.product ? item : itm),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(itm => itm.product !== action.payload),
            };

        
        default:
            return state;
    }
}