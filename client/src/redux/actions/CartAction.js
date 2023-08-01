import axios from 'axios'

import {
    ADD_TO_CART,
    DELETE_CART_ITEM,
} from "../constants/CartConstant";


export const AddToCart = (id, quantity, color, size) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/product/${id}`);
    dispatch({
        type: ADD_TO_CART,
        payload: {
            product_id: data.product._id,
            product_name: data.product.name,
            product_price: data.product.price,
            product_stock: data.product.stock,
            product_color: color,
            product_size: size,
            product_quantity: quantity,
            product_image: data.product.images[0].image,
        }
    })


    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}


export const deleteCartItem = (product_id) => async (dispatch, getState) => {
    dispatch({
        type: DELETE_CART_ITEM,
        payload: product_id
    })
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
}