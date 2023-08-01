import axios from 'axios'
import {
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    MY_ORDERS_FAIL,

    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL,

    CLEAR_ERRORS,
} from '../../constants/User/OrderConstant'



export const getMyOrders = () => async (dispatch) => {
    try {
        dispatch({ type: MY_ORDERS_REQUEST });

        const { data } = await axios.get('/api/user/order');

        dispatch({
            type: MY_ORDERS_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: MY_ORDERS_FAIL,
            payload: error.response.data.message
        })
    }
};





export const getOrderDetail = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAIL_REQUEST });
        console.log(id);

        const { data } = await axios.get(`/api/user/order/${id}`);

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response.data.message
        })
    }
};

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}