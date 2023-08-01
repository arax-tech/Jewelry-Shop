import { ADD_TO_CART, DELETE_CART_ITEM } from '../constants/CartConstant'

export const CartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;

            const ifItemExist = state.cartItems.find((i) => i.product_id === item.product_id);

            if (ifItemExist) {
                return {
                    ...state,
                    cartItems: state.cartItems.map((i) => i.product_id === ifItemExist.product_id ? item : i),
                }
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            };


        case DELETE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((i) => i.product_id !== action.payload),
            }




        default:
            return state;
    }
}
