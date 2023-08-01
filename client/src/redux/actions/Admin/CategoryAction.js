import axios from 'axios'
import {
    CATEGORY_REQUEST,
    CATEGORY_SUCCESS,
    CATEGORY_FAIL,

    SINGLE_CATEGORY_REQUEST,
    SINGLE_CATEGORY_SUCCESS,
    SINGLE_CATEGORY_FAIL,

    CREATE_CATEGORY_REQUEST,
    CREATE_CATEGORY_SUCCESS,
    CREATE_CATEGORY_FAIL,

    UPDATE_CATEGORY_REQUEST,
    UPDATE_CATEGORY_SUCCESS,
    UPDATE_CATEGORY_FAIL,

    DELETE_CATEGORY_REQUEST,
    DELETE_CATEGORY_SUCCESS,
    DELETE_CATEGORY_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/CategroyConstant'

export const getAdminCategories = () => async (dispatch) => {
    try {
        dispatch({ type: CATEGORY_REQUEST });

        const { data } = await axios.get('/api/admin/category');
        dispatch({
            type: CATEGORY_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: CATEGORY_FAIL,
            payload: error.response.data.message
        })
    }
};

export const singleAdminCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_CATEGORY_REQUEST });

        const { data } = await axios.get(`/api/admin/category/${id}`);
        dispatch({
            type: SINGLE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}


export const createAdminCategory = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_CATEGORY_REQUEST });

        const { data } = await axios.post("/api/admin/category/store", form);
        dispatch({
            type: CREATE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}


export const updateAdminCategory = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_CATEGORY_REQUEST });

        const { data } = await axios.patch(`/api/admin/category/update/${id}`, form);
        dispatch({
            type: UPDATE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminCategory = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_CATEGORY_REQUEST });

        const { data } = await axios.delete(`/api/admin/category/delete/${id}`);
        dispatch({
            type: DELETE_CATEGORY_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_CATEGORY_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}