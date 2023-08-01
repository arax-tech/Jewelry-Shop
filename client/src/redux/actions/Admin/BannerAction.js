import axios from 'axios'
import {
    BANNER_REQUEST,
    BANNER_SUCCESS,
    BANNER_FAIL,

    SINGLE_BANNER_REQUEST,
    SINGLE_BANNER_SUCCESS,
    SINGLE_BANNER_FAIL,

    CREATE_BANNER_REQUEST,
    CREATE_BANNER_SUCCESS,
    CREATE_BANNER_FAIL,

    UPDATE_BANNER_REQUEST,
    UPDATE_BANNER_SUCCESS,
    UPDATE_BANNER_FAIL,

    DELETE_BANNER_REQUEST,
    DELETE_BANNER_SUCCESS,
    DELETE_BANNER_FAIL,

    CLEAR_ERRORS
} from '../../constants/Admin/BannerConstant'

export const getAdminBanners = () => async (dispatch) => {
    try {
        dispatch({ type: BANNER_REQUEST });

        const { data } = await axios.get('/api/admin/banner');
        dispatch({
            type: BANNER_SUCCESS,
            payload: data
        })
    }
    catch (error) {
        dispatch({
            type: BANNER_FAIL,
            payload: error.response.data.message
        })
    }
};

export const singleAdminBanner = (id) => async (dispatch) => {
    try {
        dispatch({ type: SINGLE_BANNER_REQUEST });

        const { data } = await axios.get(`/api/admin/banner/${id}`);
        dispatch({
            type: SINGLE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SINGLE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const createAdminBanner = (form) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_BANNER_REQUEST });

        const { data } = await axios.post("/api/admin/banner/store", form);
        dispatch({
            type: CREATE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: CREATE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const updateAdminBanner = (id, form) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_BANNER_REQUEST });

        const { data } = await axios.patch(`/api/admin/banner/update/${id}`, form);
        dispatch({
            type: UPDATE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: UPDATE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}


export const deleteAdminBanner = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_BANNER_REQUEST });

        const { data } = await axios.delete(`/api/admin/banner/delete/${id}`);
        dispatch({
            type: DELETE_BANNER_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: DELETE_BANNER_FAIL,
            payload: error.response.data
        })
    }
}

export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}