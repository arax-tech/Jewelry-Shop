import axios from 'axios'
import {
    USER_REQUEST,
    USER_SUCCESS,
    USER_FAIL,


    UPDATE_USER_REQUEST,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAIL,

    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,



    CLEAR_ERRORS
} from '../../constants/Admin/UserConstant'

export const getAdminUsers = () => async (dispatch) => {
    try {
        dispatch({ type: USER_REQUEST });

        const { data } = await axios.get('/api/admin/user');
        dispatch({
            type: USER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: USER_FAIL,
            payload: error.response.data.message
        })
    }
};


export const updateAdminUser = (id, role) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_USER_REQUEST });


        const { data } = await axios.patch(`/api/admin/user/update/${id}`, {
            role,
            headers: {
                "Content-Type": "application/json",
            }
        });
        dispatch({
            type: UPDATE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_USER_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminUser = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_USER_REQUEST });

        const { data } = await axios.delete(`/api/admin/user/delete/${id}`);
        dispatch({
            type: DELETE_USER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_USER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}