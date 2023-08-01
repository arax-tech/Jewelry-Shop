import axios from 'axios'
import {
    ADMIN_ORDER_REQUEST,
    ADMIN_ORDER_SUCCESS,
    ADMIN_ORDER_FAIL,

    ADMIN_SINGLE_ORDER_REQUEST,
    ADMIN_SINGLE_ORDER_SUCCESS,
    ADMIN_SINGLE_ORDER_FAIL,


    ADMIN_UPDATE_ORDER_REQUEST,
    ADMIN_UPDATE_ORDER_SUCCESS,
    ADMIN_UPDATE_ORDER_FAIL,

    ADMIN_DELETE_ORDER_REQUEST,
    ADMIN_DELETE_ORDER_SUCCESS,
    ADMIN_DELETE_ORDER_FAIL,



    CLEAR_ERRORS
} from '../../constants/Admin/OrderConstant'

export const getAdminOrders = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_ORDER_REQUEST });

        const { data } = await axios.get('/api/admin/order');
        dispatch({
            type: ADMIN_ORDER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: ADMIN_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const singleAdminOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_SINGLE_ORDER_REQUEST });

        const { data } = await axios.get(`/api/admin/order/${id}`);
        dispatch({
            type: ADMIN_SINGLE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_SINGLE_ORDER_FAIL,
            payload: error.response.data
        })
    }
}



export const updateAdminOrder = (id, status) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_UPDATE_ORDER_REQUEST });

        const { data } = await axios.patch(`/api/admin/order/update/${id}`, {
            status,

            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: ADMIN_UPDATE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_UPDATE_ORDER_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_DELETE_ORDER_REQUEST });

        const { data } = await axios.delete(`/api/admin/order/delete/${id}`);
        dispatch({
            type: ADMIN_DELETE_ORDER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ADMIN_DELETE_ORDER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}